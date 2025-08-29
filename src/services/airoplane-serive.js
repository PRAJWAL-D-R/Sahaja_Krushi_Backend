const { StatusCodes } = require('http-status-codes');
const { AiroplaneRepository } = require('../repositories');

const airoplaneRepository = new AiroplaneRepository();

async function createAiroplane(data) {
    try {
        const airoplane = await airoplaneRepository.create(data);
        return airoplane;
    } catch (error) {
        throw error;
    }
}

async function getAiroplane() {
    try {
        const airoplane = await airoplaneRepository.getAll();
        return airoplane;
    } catch (error) {
        throw new apierror('Cannot fetch data of airoplane');
    }
}

async function getAiroplaneID(id) {
    try {
        const airoplane = await airoplaneRepository.get(id);
        return airoplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new Apperror('The airoplane you requested is not found', StatusCodes.NOT_FOUND);
        }
        throw new apierror('Cannot fetch data of airoplane');
    }
}

async function destroyAiroplane(id) {
    try {
        const airoplane = await airoplaneRepository.destroy(id);
        return airoplane;
    } catch (error) {
         if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new Apperror('The airoplane you to delete requested is not found', StatusCodes.NOT_FOUND);
        }
        throw new apierror('Cannot fetch data of airoplane');
    }
}


async function updateAiroplane(id, data) {
    try {
        const airoplane = await airoplaneRepository.update(id, data);
        return airoplane;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    createAiroplane,
    getAiroplane,
    getAiroplaneID,
    destroyAiroplane,
    updateAiroplane
};

