const cakes = require('../controllers/cakes.js');
module.exports = (app) => {
	// Get all cakes
    app.get('/cakes', (req, res) => {
        cakes.all(req, res);
    });
    // Get one cake by ID
    app.get('/cakes/:id', (req, res) => {
        cakes.one(req, res);
    });
    // Create a new cake
    app.post('/cakes/create', (req, res) => {
        cakes.create(req, res);
    });
    // Update a cake by ID, passing in data
    app.put('/cakes/:id', cakes.update);
    // Delete a cake by ID
    app.delete('/cakes/:id', cakes.delete);
}
