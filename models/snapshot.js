module.exports = (sequelize, type) => {
    return sequelize.define('snapshot'), {
	id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	},
	codeState: {
	    type: Sequelize.STRING,
	},
	buttonPressed: {
	    type: Sequelize.INTEGER,
	},
	level: {
	    type: Sequelize.INTEGER,
	},
	testResults: {
	    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
	},
	cursorActivity: {
	    Sequelize.JSONB,
	},
	startingDisplay: {
	    Sequelize.JSONB,
	},
    }
}
