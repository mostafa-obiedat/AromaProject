module.exports = (sequelize, DataTypes) => {
  const ContactMessage = sequelize.define("ContactMessage", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return ContactMessage;
};
