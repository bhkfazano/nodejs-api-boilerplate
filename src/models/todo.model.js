module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        due_date: {
            type: Sequelize.DATE
        },
        done: {
            type: Sequelize.BOOLEAN
        }

    });

    return Todo;
};