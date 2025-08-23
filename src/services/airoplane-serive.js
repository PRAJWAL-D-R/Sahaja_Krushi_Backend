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


module.exports = {
    createAiroplane,
    getAiroplane
};

