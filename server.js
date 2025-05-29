const express = require('express');
// const mongoose = require('mongoose'); // Comentado - No lo necesitamos ahora
const path = require('path');
// const Visit = require('./models/visitor'); // Comentado - No lo necesitamos ahora

const app = express();
const PORT = 3000;

/* --- Conexión a MongoDB (SECCIÓN DESACTIVADA) ---
const MONGO_URI = 'mongodb+srv://AndresHKMA16:Hakkima2004@cluster0.aqjtsuq.mongodb.net/Redes';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));
*/

// Middleware para servir archivos estáticos (el frontend desde la carpeta 'public')
app.use(express.static('public'));

// --- Ruta de API para obtener los datos (VERSIÓN MODIFICADA SIN DB) ---
app.get('/api/data', async (req, res) => {
    try {
        // Obtenemos la IP del cliente.
        let clientIp = req.ip;

        // Limpiamos la IP para quedarnos solo con el formato IPv4
        if (clientIp.substr(0, 7) === "::ffff:") {
            clientIp = clientIp.substr(7);
        }

        // --- SIMULACIÓN DE RESPUESTA ---
        // En lugar de consultar la base de datos, enviamos datos de prueba.
        res.json({
            clientIp: clientIp,
            visitCount: 1 // Respondemos con un número fijo
        });

    } catch (error) {
        console.error("Error en la ruta de API:", error);
        res.status(500).json({ message: "Error al procesar la visita" });
    }
});

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor HTTP del Grupo 3 (SIN DB) corriendo en el puerto ${PORT}`);
});