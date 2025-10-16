const sequelize = new Sequelize("event_db", "postgres", "event_password", {
  host: "localhost",
  dialect: "postgres",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection is establised ✅ ");
  } catch (error) {
    console.log("ERROR ❌ : ", error.message);
  }
};

// Initialize models for the table
const User = userModel(sequelize);
const Event = eventModel(sequelize);
const UserInEvent = userInEventModel(sequelize);

Event.hasMany(UserInEvent, { foreignKey: "eventId", onDelete: "CASCADE" });
UserInEvent.belongsTo(Event, { foreignKey: "eventId" });

export { connectDB, User, Event, UserInEvent };
