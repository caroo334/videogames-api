const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID, // UUID Es un tipo de dato predeterminado en SQL, no hace falta instalar nada
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // allow null significa que permito que este vacio, por eso lo seteamos en false
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating_top: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reviews_text_count: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDb: { //es mas facil traer de la base de datos algun videojuego creado a traves de esto.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
