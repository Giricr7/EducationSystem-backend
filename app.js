// express and the app
const express = require('express');
const app = express();
// third-party-packages
const helmet = require('helmet');
const cors = require('cors')
// my exports
const initDb = require('./helpers/db').initDb;
const settingsRoutes = require('./routes/schoolSettings');

// enabling CORS
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials:true,     
	optionSuccessStatus:200
}));

app.use(helmet());
// parsing the body properties to accept application/json
app.use(express.json());

app.use('/settings', settingsRoutes);

// error handler middleware
app.use((error, req, res, next) => {
	// when throwing error, the throwed message will be in error.message, and i will add another statusCode property, get them, send back the response
	const errorMessage = error.message ? error.message : 'something went wrong';
	const errorStatusCode = error.statusCode;

	res.status(errorStatusCode).json({ error: errorMessage });
});

// initializing the database using native mongoDB driver
initDb((error, client) => {
	if (error) {
		console.log('Failed To Connect...');
	} else {
		console.log('DB Connected...');
		if (process.env.PORT) {
			app.listen(process.env.PORT);
		} else {
			app.listen(5000);
		}
	}
});
