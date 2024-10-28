const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Permitir solicitudes desde el Gateway

// Leer los juegos desde un archivo JSON
const readGames = () => {
    const data = fs.readFileSync('games.json');
    return JSON.parse(data);
};

// Guardar los juegos en un archivo JSON
const saveGames = (games) => {
    fs.writeFileSync('games.json', JSON.stringify(games, null, 2));
};

// Obtener todos los juegos
app.get('/games', (req, res) => {
    const games = readGames();
    res.json(games);
});

// Registrar un nuevo juego
app.post('/games', (req, res) => {
    const games = readGames();
    const newGame = {
        id: Date.now(), // ID único basado en la fecha
        name: req.body.name,
        description: req.body.description,
        image: req.body.image, // URL de la imagen
    };
    games.push(newGame);
    saveGames(games);
    res.status(201).json(newGame);
});

// Eliminar un juego
app.delete('/games/:id', (req, res) => {
    const games = readGames();
    const updatedGames = games.filter(game => game.id !== parseInt(req.params.id));
    saveGames(updatedGames);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Game Service corriendo en http://localhost:${PORT}`);
});
