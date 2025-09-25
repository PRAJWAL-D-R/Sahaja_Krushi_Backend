const path = require('path')
const express = require('express')
const cors = require('cors')

// Load environment variables early
try {
  const envPath = path.resolve(__dirname, '../.env')
  require('dotenv').config({ path: envPath })
} catch (_) {
  require('dotenv').config()
}

// Map DB_* env vars to existing Sequelize bootstrap expectations (MYSQL_*)
// This allows deploying on Clever Cloud with DB_HOST/DB_USER/DB_PASS/DB_NAME/DB_PORT
const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
  DATABASE_URL,
  FRONTEND_URL,
  // Clever Cloud addon variables
  MYSQL_ADDON_HOST,
  MYSQL_ADDON_DB,
  MYSQL_ADDON_USER,
  MYSQL_ADDON_PORT,
  MYSQL_ADDON_PASSWORD,
  MYSQL_ADDON_URI,
} = process.env

// Prefer single connection string if provided
if (DATABASE_URL || MYSQL_ADDON_URI) {
  process.env.DATABASE_URL = DATABASE_URL || MYSQL_ADDON_URI
} else if (DB_HOST || DB_USER || DB_NAME) {
  // Map custom DB_* to Sequelize's expected MYSQL_* envs used in this codebase
  process.env.MYSQL_HOST = DB_HOST
  process.env.MYSQL_USER = DB_USER
  process.env.MYSQL_PWD = DB_PASS || ''
  process.env.MYSQL_DB = DB_NAME
  process.env.MYSQL_PORT = DB_PORT || '3306'
} else if (MYSQL_ADDON_HOST || MYSQL_ADDON_USER || MYSQL_ADDON_DB) {
  // Map Clever Cloud addon variables
  process.env.MYSQL_HOST = MYSQL_ADDON_HOST
  process.env.MYSQL_USER = MYSQL_ADDON_USER
  process.env.MYSQL_PWD = MYSQL_ADDON_PASSWORD || ''
  process.env.MYSQL_DB = MYSQL_ADDON_DB
  process.env.MYSQL_PORT = MYSQL_ADDON_PORT || '3306'
}

const app = express()

// CORS: restrict to a single frontend origin provided via FRONTEND_URL
const corsOptions = {
  origin: function (origin, callback) {
    if (!FRONTEND_URL) {
      const allowed = process.env.NODE_ENV !== 'production'
      return allowed ? callback(null, true) : callback(new Error('CORS: FRONTEND_URL not configured'))
    }
    if (!origin || origin === FRONTEND_URL) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files
// NOTE: On Clever Cloud, the filesystem is ephemeral; do NOT rely on local uploads for permanence.
// Prefer a cloud storage provider (e.g., S3, R2, Cloud Storage) for user-uploaded content.
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
const apiRoutes = require('./routes')
app.use('/api', apiRoutes)

// Health endpoints for root and API base
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Sahaja Krushi API', data: { uptime: process.uptime() } })
})
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'OK', data: { uptime: process.uptime() } })
})

// 404 for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found', data: null })
})

// Centralized error handler
const { errorHandler } = require('./middlewares/error-handler')
app.use(errorHandler)

// Bootstrap database via models (uses MYSQL_* or DATABASE_URL envs)
const db = require('./models')

// One-time initialization guard for serverless/Vercel environments
let initialized = false
async function ensureInitialized() {
  if (initialized) return
  // Verify DB connection
  await db.sequelize.authenticate()
  console.log('[DB] Connection established successfully.')
  await db.sequelize.sync({ force: false, alter: false })
  console.log('[DB] Models synchronized (non-destructive). For production, prefer migrations.')
  initialized = true
}

async function startServer() {
  const port = Number(process.env.PORT) || 3000

  try {
    await ensureInitialized()

    app.listen(port, () => {
      console.log(`[Server] Listening on port ${port} (NODE_ENV=${process.env.NODE_ENV || 'development'})`)
      if (FRONTEND_URL) {
        console.log(`[CORS] Allowed origin: ${FRONTEND_URL}`)
      } else {
        console.warn('[CORS] FRONTEND_URL not set. In production, requests may be blocked.')
      }
    })
  } catch (err) {
    console.error('[Startup] Failed to start server:', err.message)
    process.exit(1)
  }
}

// In serverless environments (e.g., Vercel), export the app instead of listening.
if (process.env.VERCEL) {
  // Initialize lazily on first request to reduce cold start
  app.use(async (req, res, next) => {
    try {
      await ensureInitialized()
      next()
    } catch (e) {
      next(e)
    }
  })
  module.exports = app
} else {
  startServer()
}