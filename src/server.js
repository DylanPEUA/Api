import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { authRequired } from "./middleware/authMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuration du moteur de templates EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares globaux
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limite à 300 requêtes par IP
  })
);


// Route test
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Route protégée pour le tableau de bord (accessible uniquement à l'utilisateur connecté)
app.get("/dashboard", authRequired, (req, res) => {
  // On peut passer des infos utilisateur à la vue EJS
  res.render("dashboard", { user: req.user });
});


// Servir la documentation JSDoc (tous les fichiers statiques)
app.use("/docs", express.static(path.join(__dirname, "../docs")));


// Routes à ajouter (auth, catways, reservations...)
app.use("/api", router);

const port = process.env.PORT || 4000;

// Connexion à la base MongoDB et démarrage serveur
async function startServer() {
  await connectDB(process.env.MONGODB_URI);

  app.listen(port, () => {
    console.log(`🚀 API en ligne sur http://localhost:${port}`);
  });
}

startServer();