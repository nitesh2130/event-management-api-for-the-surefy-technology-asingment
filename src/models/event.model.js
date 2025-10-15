export const createEventModel = async (sequelize) => {
  const Event = sequelize.define("events", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
      validate: {
        max: 1000,
        min: 1,
      },
    },
  });
};
