module.exports = (sequelize, type) => {
    return sequelize.define('user', {
	id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	},
	name: {
	   Sequelize.STRING,
	},
    })
}
