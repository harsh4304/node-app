module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Demos', [
      {
        firstName: 'Vaidehi',
        lastName: 'Patel',
        email: 'abc@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Demos', null, {});
  },
};