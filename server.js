const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Visit = require('./models/visitor'); // Cambiamos el nombre para más claridad

const app = express();
const PORT = 80;

// --- Conexión a MongoDB ---
// ¡Recuerda! Esta URL te la debe dar tu compañero de Base de Datos
// y debe usar el dominio que configuró tu compañero de DNS.
// Ejemplo: 'mongodb://mongo.grupo3.com/tallerdb'
const MONGO_URI = 'mongodb://db.judas.lab:21017/Redes';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Middleware para servir archivos estáticos (el frontend)
app.use(express.static('public'));

// --- Ruta de API para obtener los datos ---
// Esta es la única ruta que necesitamos ahora
app.get('/api/data', async (req, res) => {
    try {
        // Obtenemos la IP del cliente. req.ip puede devolver '::ffff:192.168.0.x'
        let clientIp = req.ip;

        // Limpiamos la IP para quedarnos solo con el formato IPv4
        // Esto soluciona tu duda de las 'ffff'
        if (clientIp.substr(0, 7) === "::ffff:") {
            clientIp = clientIp.substr(7);
        }

        // Buscamos un documento con esa IP y le incrementamos el contador en 1.
        // Si no existe, lo crea gracias a la opción { upsert: true }.
        const visit = await Visit.findOneAndUpdate(
            { ipAddress: clientIp },      // Filtro: encuentra por IP
            { $inc: { visitCount: 1 } },  // Update: incrementa el contador
            { new: true, upsert: true }   // Opciones: si no existe, créalo (upsert)
                                          // y devuelve el documento actualizado (new)
        );

        // Respondemos con los datos específicos de este visitante
        res.json({
            clientIp: visit.ipAddress,
            visitCount: visit.visitCount
        });

    } catch (error) {
        console.error("Error en la ruta de API:", error);
        res.status(500).json({ message: "Error al procesar la visita" });
    }
});

// Inicia el servidor
app.listen(PORT, '::', () => {
    console.log(`🚀 Servidor HTTP del Grupo 3 corriendo en el puerto ${PORT}`);
});