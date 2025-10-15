export const createUserInEventModel = async (sequelize) => {
  const User = sequelize.define("users", {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
