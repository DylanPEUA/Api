# Projet Node.js API de gestion Catways, Réservations et Utilisateurs

## Description
Ce projet est une API Node.js permettant de gérer des utilisateurs, des catways (pontons), et des réservations. Il inclut une authentification, des contrôleurs pour chaque ressource, une gestion des accès via middleware, et une documentation générée avec JSDoc.

## Structure du projet

```
├── src/
│   ├── server.js                # Point d'entrée du serveur Express
│   ├── config/
│   │   └── db.js                # Configuration de la base de données
│   ├── controllers/             # Logique métier pour chaque ressource
│   │   ├── authController.js
│   │   ├── catwayController.js
│   │   └── reservationController.js
│   ├── middleware/
│   │   └── authMiddleware.js    # Middleware d'authentification
│   ├── models/                  # Modèles de données
│   │   ├── catwayModel.js
│   │   ├── reservationModel.js
│   │   └── userModel.js
│   ├── public/                  # Fichiers statiques (HTML, CSS, JS)
│   │   ├── catways.html, ...
│   │   ├── css/
│   │   └── js/
│   └── routes/
│       └── index.js             # Définition des routes
├── docs/                        # Documentation générée par JSDoc
├── package.json                 # Dépendances et scripts npm
├── jsdoc.json                   # Configuration JSDoc
```

## Installation

1. **Cloner le dépôt**
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer la base de données dans `src/config/db.js` si besoin.
4. Lancer le serveur :
   ```bash
   node src/server.js
   ```

## Scripts npm
- `start` : Démarre le serveur
- `jsdoc` : Génère la documentation dans le dossier `docs/`

## Fonctionnalités principales
- Authentification des utilisateurs (login, inscription)
- Gestion des utilisateurs (CRUD)
- Gestion des catways (CRUD)
- Gestion des réservations (CRUD)
- Middleware de protection des routes (authentification et rôle admin)
- Tableau de bord accessible uniquement à l'utilisateur connecté (protégé par middleware)
- Utilisation d'un moteur de templates (EJS) pour le rendu côté serveur
- Vérification et validation des champs de formulaires côté serveur (express-validator)
- Documentation automatique du code avec JSDoc
- Documentation de l'API accessible via `/docs` (générée par JSDoc)


## Documentation
La documentation technique et de l'API est générée dans le dossier `docs/` via JSDoc. Pour la régénérer :
```bash
npm run jsdoc
```
La documentation de l'API est accessible via la page `/docs` sur le serveur.

## Sécurité et validation
- Toutes les routes sensibles sont protégées par des middlewares d'authentification.
- Les champs des formulaires sont validés côté serveur (voir `src/middleware/validationMiddleware.js`).

## Moteur de templates
L'application utilise EJS pour le rendu des vues côté serveur (voir dossier `src/views`).

## Auteurs
- Dylan Peua
- Dernière modification : Janvier 2026

