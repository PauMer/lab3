const controller = {};

//ruta raiz
controller.getRutaRaiz = (req, res) => {
    res.send('¡Bienvenido a la ruta raíz!');
};

module.exports = controller;