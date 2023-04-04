const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const {username, password, database } = config;
const sequelize = new Sequelize(database, username, password, config)

const Member = require('./member')(sequelize, Sequelize.DataTypes);

const db = {};
db.Member = Member;

module.exports = db;