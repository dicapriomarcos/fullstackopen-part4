// Exporta el middleware de morgan para loggear las peticiones HTTP

const morgan = require('morgan')

morgan.token('postData', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    } else {
        return '';
    }
});

module.exports = {
    morgan
}