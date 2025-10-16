export const userInEventModel = async (sequelize) => {
  const UserInEvent = sequelize.define("userInEvents", {
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
