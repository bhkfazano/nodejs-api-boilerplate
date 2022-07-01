const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    User.prototype.validatePassword = (password) => {
        return bcrypt.compare(password, this.password);
    };

    User.prototype.isEmailTaken = async (email) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        return user !== null;
    }

    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.addHook("beforeUpdate", function(user) {
        if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
        return User;
    });

    return User;
};