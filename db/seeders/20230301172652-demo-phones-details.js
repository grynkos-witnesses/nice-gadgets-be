'use strict';

/** @type {import('sequelize-cli').Migration} */
const data = require('../../result.json');
const URL = 'https://raw.githubusercontent.com/grynkos-witnesses/nice-gadgets-img/main/';

const preaperedData = data.map(d => {
  return {
    ...d,
    description: JSON.stringify(d.description),
    images: d.images.map(i => URL + i),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('phonesDetails', preaperedData , {});
  },

  async down (queryInterface, Sequelize) {
     return await queryInterface.bulkDelete('phonesDetails', null, {});
  }
};
