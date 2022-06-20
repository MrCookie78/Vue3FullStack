require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nodejs.lwggm.mongodb.net/NodeJS_API`
  )
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.error("Failed to connect to mongo, ", err));


const chaineSchema = new mongoose.Schema({
	chaine: {
		type: String,
		required: true,
	},
	crééePar: {
		type: String,
		required: true,
	}
});
const Chaine = mongoose.model('Chaine', chaineSchema);

const userShema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
	},
	motdepasse: {
		type: String,
		required: true,
	}
});
const User = mongoose.model('User', userShema);

module.exports.createChaine = async (obj) => {
  const chaine = new Chaine(obj);
  return chaine.save();
};

module.exports.createUser = async (obj) => {
  const user = new User(obj);
  return user.save();
};

module.exports.Chaine = Chaine;
module.exports.User = User;
