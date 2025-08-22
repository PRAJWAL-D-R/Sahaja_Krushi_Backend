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

module.exports = {
    createAiroplane
};
