const { Query, Farmer } = require('../models');
const { AppError } = require('../utills/app-error');
const { StatusCodes } = require('http-status-codes');

async function resolveFarmerNumericId(farmerIdString) {
  if (!farmerIdString) {
    throw new AppError('farmerId is required', StatusCodes.BAD_REQUEST);
  }
  const farmer = await Farmer.findOne({ where: { farmerId: farmerIdString } });
  if (!farmer) {
    throw new AppError('Farmer not found', StatusCodes.NOT_FOUND);
  }
  return { farmerDbId: farmer.id, farmerInstance: farmer };
}

async function createQuery({ title, description, farmerIdString, imagePath, audioPath, videoPath }) {
  const { farmerDbId } = await resolveFarmerNumericId(farmerIdString);
  const created = await Query.create({
    title: title || null,
    description: description || null,
    imagePath: imagePath || null,
    audioPath: audioPath || null,
    videoPath: videoPath || null,
    farmerId: farmerDbId,
    status: 'open',
  });
  return created;
}

async function listAll() {
  return Query.findAll({ order: [['createdAt', 'DESC']], include: [{ model: Farmer, as: 'farmer' }] });
}

async function listByFarmerIdString(farmerIdString) {
  const { farmerDbId } = await resolveFarmerNumericId(farmerIdString);
  return Query.findAll({ where: { farmerId: farmerDbId }, order: [['createdAt', 'DESC']] });
}

async function getOne(id) {
  const item = await Query.findByPk(id, { include: [{ model: Farmer, as: 'farmer' }] });
  if (!item) throw new AppError('Query not found', StatusCodes.NOT_FOUND);
  return item;
}

async function answerQuery(id, { answer, status }) {
  const item = await Query.findByPk(id);
  if (!item) throw new AppError('Query not found', StatusCodes.NOT_FOUND);
  item.answer = answer ?? item.answer;
  if (status && ['open', 'answered', 'closed'].includes(status)) {
    item.status = status;
  } else if (answer && !status) {
    item.status = 'answered';
  }
  await item.save();
  return item;
}

module.exports = {
  createQuery,
  listAll,
  listByFarmerIdString,
  getOne,
  answerQuery,
};
