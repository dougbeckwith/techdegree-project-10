"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            notNull: true,
            msg: "A title is required"
          },
          notEmpty: {
            notEmpty: true,
            msg: "Please provide a title"
          }
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            notNull: true,
            msg: "A description is required"
          },
          notEmpty: {
            notEmpty: true,
            msg: "Please provide a description"
          }
        }
      },
      estimatedTime: {
        type: Sequelize.STRING
      },
      materialsNeeded: {
        type: Sequelize.STRING
      }
    },
    { sequelize }
  );
  Course.associate = function (models) {
    Course.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false
      }
    });
  };

  return Course;
};
