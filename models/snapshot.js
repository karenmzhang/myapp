module.exports = (sequelize, type) => {
    return sequelize.define('snapshot', {
	id: {
	    type: type.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	},
	netid: {
	    type: type.STRING,
	},
	codeState: {
	    type: type.STRING(2000),
	},
	buttonPressed: {
	    type: type.INTEGER,
	},
	level: {
	    type: type.INTEGER,
	},
	customInputs: {
	    type: type.STRING,
	},
	testResults: {
	    type: type.ARRAY(type.BOOLEAN),
	    defaultValue: [false],
	},
	cursorActivity: {
	    type: type.ARRAY(type.INTEGER)
	},
	output: {
	    type: type.STRING,
	},
    })
}
