const seedUsers = require('./user-seeds');
const seedBlogs = require('./blog-seeds');

const sequelize = require('../config/connection');

// create tables in mySQL via sequelize
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedBlogs();
  console.log('\n----- BLOGS SEEDED -----\n');

//   await seedComments();
//   console.log('\n----- COMMENTS SEEDED -----\n');

//   await seedArticles();
//   console.log('\n----- ARTICLES SEEDED -----\n');

  process.exit(0);
};

seedAll();
