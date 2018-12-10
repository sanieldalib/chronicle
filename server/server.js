const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwtstrategy = require('./jwtStrategy');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

mongoose
	.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true }
	)
	.then(
		() => {
			console.log('Database is connected');
		},
		err => {
			console.log('Can not connect to the database' + err);
		}
	);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
jwtstrategy(passport);

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.get('/', function(req, res) {
	res.send('hello world');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
