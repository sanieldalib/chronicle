const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
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

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_SECRET
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(formData.parse());
app.use(passport.initialize());
jwtstrategy(passport);

app.use('/user', userRoutes);
app.use('/posts', postRoutes);

app.get('/', function(req, res) {
	res.send('hello world');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
