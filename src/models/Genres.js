const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genres', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true 
        }, // Si no especifico el id sequelize lo asigna perro corro riesgo que sep isen con el de la api
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        background_image: {
            type: DataTypes.STRING,
            allowNull: false
          },
    });
}