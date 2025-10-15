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

export { connectDB };
