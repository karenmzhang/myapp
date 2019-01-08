const Sequelize = require('sequelize');
const UserModel = require('./user');
const SnapshotModel = require('./snapshot');
const {Client} = require('pg');

if (process.env.DATABASE_URL) {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
    });
} else {
    const sequelize = new Sequelize('testdb', 'karenzhang', '', {
	host: 'localhost',
	dialect: 'postgres',
    });
}

const User = UserModel(sequelize, Sequelize);
const Snapshot = SnapshotModel(sequelize, Sequelize);

User.hasMany(Snapshot);

// Removes tables on every startup and create new ones.
sequelize.sync({force: true})
    .then(() => {
	console.log(`Database and tables created`);
    })

module.exports = {
    User,
    Snapshot
}
