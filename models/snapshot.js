module.exports = (sequelize, type) => {
    return sequelize.define('snapshot', {
	id: {
	    type: type.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	},
	codeState: {
	    type: type.STRING,
	},
	buttonPressed: {
	    type: type.INTEGER,
	},
	level: {
	    type: type.INTEGER,
	},
	testResults: {
	    type: type.ARRAY(type.BOOLEAN),
	},
	cursorActivity: {
	    type: type.ARRAY(type.INTEGER)
	},
	output: {
	    type: type.STRING,
	},
    })
}
