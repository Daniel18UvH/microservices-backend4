const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Página de inicio
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Game Service Gateway</title>
                <style>
                    body {
                        font-family: 'Times New Roman', serif;
                        margin: 0;
                        padding: 0;
                        background-color: #121212;
                        color: #ffffff;
                    }
                    header {
                        background-color: #1e1e1e;
                        padding: 20px;
                        text-align: center;
                    }
                    .menu {
                        margin: 20px 0;
                        display: flex;
                        justify-content: center;
                        background-color: #000000; /* Fondo negro */
                        padding: 10px;
                        border-radius: 5px;
                    }
                    .menu a {
                        color: #ffffff; /* Letras blancas */
                        margin: 0 15px;
                        text-decoration: none;
                        padding: 10px 15px;
                        border-radius: 4px;
                        transition: background-color 0.3s;
                    }
                    .menu a:hover {
                        background-color: #333333; /* Color de fondo al pasar el ratón */
                    }
                    h1 {
                        margin: 0;
                    }
                    table {
                        width: 80%;
                        border-collapse: collapse;
                        margin: 20px auto;
                        background-color: #2a2a2a;
                    }
                    th, td {
                        border: 1px solid #444;
                        padding: 10px;
                        text-align: center;
                    }
                    th {
                        background-color: #007bff;
                        color: white;
                    }
                    td {
                        background-color: #3a3a3a;
                        color: #ffffff;
                    }
                    .action-cell {
                        background-color: #e7f1ff;
                    }
                    footer {
                        text-align: center;
                        padding: 10px;
                        background-color: #1e1e1e;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                    }
                    img {
                        width: 80px; /* Tamaño de las imágenes */
                        height: auto;
                        margin: 10px;
                    }
                    .game-logos {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>Game Service Gateway</h1>
                    <div class="menu">
                        <a href="/">Inicio</a>
                        <a href="/games">Ver Juegos</a>
                        <a href="/games/new">Registrar Juego</a>
                        <a href="/games/delete">Eliminar Juego</a>
                    </div>
                </header>
                <main>
                    <h2>Opciones de Juego</h2>
                    <table>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Ruta</th>
                            <th>Acción</th>
                        </tr>
                        <tr>
                            <td class="action-cell"><img src="https://upload.wikimedia.org/wikipedia/en/9/99/Super_Mario_Bros._3.png" alt="Super Mario Bros"></td>
                            <td class="action-cell">Super Mario Bros</td>
                            <td class="action-cell">Muestra la lista de juegos registrados.</td>
                            <td class="action-cell">/games</td>
                            <td class="action-cell"><a href="/games">Ver Juegos</a></td>
                        </tr>
                        <tr>
                            <td class="action-cell"><img src="https://upload.wikimedia.org/wikipedia/en/9/9f/The_Legend_of_Zelda_%28video_game%29_cover.png" alt="The Legend of Zelda"></td>
                            <td class="action-cell">The Legend of Zelda</td>
                            <td class="action-cell">Permite registrar un nuevo juego.</td>
                            <td class="action-cell">/games/new</td>
                            <td class="action-cell"><a href="/games/new">Registrar Juego</a></td>
                        </tr>
                        <tr>
                            <td class="action-cell"><img src="https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_logo.png" alt="Minecraft"></td>
                            <td class="action-cell">Minecraft</td>
                            <td class="action-cell">Permite eliminar un juego existente.</td>
                            <td class="action-cell">/games/delete</td>
                            <td class="action-cell"><a href="/games/delete">Eliminar Juego</a></td>
                        </tr>
                    </table>
                    <h2>Juegos Populares</h2>
                    <div class="game-logos">
                        <img src="https://upload.wikimedia.org/wikipedia/en/9/99/Super_Mario_Bros._3.png" alt="Super Mario Bros">
                        <img src="https://upload.wikimedia.org/wikipedia/en/9/9f/The_Legend_of_Zelda_%28video_game%29_cover.png" alt="The Legend of Zelda">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_logo.png" alt="Minecraft">
                    </div>
                </main>
                <footer>
                    <p>&copy; 2024 Game Service. Todos los derechos reservados.</p>
                </footer>
            </body>
        </html>
    `);
});

// Redirige las peticiones de /games al Game Service
app.use('/games', createProxyMiddleware({
    target: 'http://localhost:3001', // Puerto donde corre el Game Service
    changeOrigin: true,
}));

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Gateway corriendo en http://localhost:3000');
});
