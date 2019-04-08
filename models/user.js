module.exports = (sequelize, type) => {
    return sequelize.define('user', {
	id: {
	    type: type.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	},
	netid: {
	    type: type.STRING,
	},
	levelNumber: {
	    type: type.INTEGER,
	    defaultValue: 0,
	},
    })
}
