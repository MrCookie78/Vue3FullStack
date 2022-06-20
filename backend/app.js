// Validation
const joi = require("joi");
const bcrypt = require("bcrypt");
const ObjectID = require("mongoose").Types.ObjectId;

// Express + async errors
const express = require("express");
require("express-async-errors"); // bcrypt est asynchrone
const app = express();

// JWT + dotenv + vérification de la présence d'une variable d'environnement
const jwt = require("jsonwebtoken");
require("dotenv").config();
if (!process.env.JWT_PRIVATE_KEY) {
  console.log(
    "Vous devez créer un fichier .env qui contient la variable JWT_PRIVATE_KEY"
  );
  process.exit(1);
}

// Cors
const cors = require('cors');
const corsOptions = {
  exposedHeaders: 'x-auth-token',
};
app.use(cors(corsOptions));

// Base de données
const {createChaine, createUser, Chaine, User} = require("./mongo");

// On va avoir besoin de parser le json entrant dans req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de vérification d'id chaine
const verifyId = async (req, res, next) => {
  const params = req.params;
  let id = params.id;

  // Vérification
  if (ObjectID.isValid(id)) {
    const chaine = await Chaine.findById(id);

    if (chaine) next();
    else res.status(404).json({ error: "L'id n'existe pas." });
  }

  // Sinon
  else {
    res.status(404).json({ error: "L'id n'existe pas." });
  }
};

// Middleware de vérification de connexion
const authGuard = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "Vous devez vous connecter" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({ error: "Token invalide" });
  }
};



// Route retournant toutes les chaines
app.get("/chaines", async (req, res) => {
	res.status(200).json(await Chaine.find({}));
})

// Route retournant une chaine par ID
app.get("/chaine/:id", [verifyId], async (req, res) => {
  const chaine = await Chaine.findById(req.params.id);
  res.status(200).json(chaine);
});

// Route permettant d'ajouter une chaine
app.post("/chaine", [authGuard], async (req, res) => {
  const payload = req.body;

  // validation
  const schema = joi.object({
    chaine: joi.string().required(),
  });
  const { value, error } = schema.validate(payload);

  // Erreur => Renvoie erreur
  if (error) res.status(400).json({ erreur: error.details[0].message });
  else {
    // Ajout valeur dans base de données
		value.crééePar = req.user.id;
    const chaine = await createChaine(value);

    // Renvoie objet créé
    res.status(201).json(chaine);
  }
});

// Route permettant de modifier une chaine
app.put("/chaine/:id", [verifyId], async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // validation
  const schema = joi.object({
    chaine: joi.string(),
  });
  const { value, error } = schema.validate(payload);

  if (error) res.status(400).json({ error: error.details[0].message });
  else {
    // Modification
    await Chaine.findByIdAndUpdate(id, value);
		const chaine = await Chaine.findById(id);
    res.status(200).json(chaine);
  }
});

// Route pour supprimer une chaine
app.delete("/chaine/:id", [authGuard, verifyId], async (req, res) => {
  const id = req.params.id;
  const chaine = await Chaine.findById(id);
	if(chaine.crééePar === req.user.id){
		await Chaine.findByIdAndDelete(id);
		res.status(200).json(chaine);
	}
	res.status(403).json({error: "Vous n'êtes pas le créateur de la chaine"});
});

// INSCRIPTION
app.post("/signup", async (req, res) => {
  const payload = req.body;
  const schema = joi.object({
    email: joi.string().max(255).required().email(),
    username: joi.string().min(3).max(50).required(),
    motdepasse: joi.string().min(3).max(50).required(),
  });

  const { value: user, error } = schema.validate(payload);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Avant d'inscrire on vérifie que le compte est unique
  const found = await User.findOne({ email: user.email });
  if (found) return res.status(400).send("Please login instead of signup");

  // Hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(user.motdepasse, salt);
  user.motdepasse = passwordHashed;

  const newUser = await createUser(user);
	res.status(201).json({id: newUser._id, username: newUser.username, email: newUser.email });
});

// CONNEXION
app.post("/login", async (req, res) => {
  const payload = req.body;
  const schema = joi.object({
    email: joi.string().max(255).required().email(),
    motdepasse: joi.string().min(3).max(50).required(),
  });

  const { value: connexion, error } = schema.validate(payload);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // On cherche dans la DB
  const user = await User.findOne({ email: connexion.email });
  if (!user) return res.status(400).json({ error: "Email Invalide" });

  // On doit comparer les hash
  const passwordHashed = await bcrypt.compare(
    connexion.motdepasse,
    user.motdepasse
  );
  if (!passwordHashed)
    return res.status(400).json({ error: "Mot de passe invalide" });

  // On retourne un JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
  res.header("x-auth-token", token).status(200).json({ username: user.username });
});

// Route compte utilisateur
app.get("/me", [authGuard], async (req, res) => {
  const find = await User.findById(req.user.id);
  res.status(200).json(find);
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
});

module.exports = app;