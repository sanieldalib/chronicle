const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');

router.post(
	'/new',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const title = req.body.title;
		const text = req.body.text;
		const owner = req.user.id;
		const location = req.body.location;
		const images = req.body.images;
		const ownerName = req.user.name;

		const newPost = Post({
			title: title,
			text: text,
			owner: owner,
			images: images,
			location: location,
			ownerName: ownerName,
			shared: []
		});

		newPost
			.save()
			.then(post => {
				res.send(post);
			})
			.catch(err => {
				res.status(400);
			});
	}
);

router.post(
	'/images',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const values = Object.values(req.files);
		const images = [];

		const promises = values.map(image =>
			cloudinary.uploader.upload(image.path)
		);
		Promise.all(promises).then(results => {
			results.map((result, index) => {
				images.push(result.secure_url);
			});
			res.json({ images: images });
		});
	}
);

router.post(
	'/share',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const id = req.body.id;
		const email = req.body.email;
		const user = req.user.id;

		Post.findOne({ _id: id }, (err, post) => {
			if (err) {
				res.status(400).json(err);
				return;
			}

			if (user !== post.owner) {
				res.status(400).json('You are not authorized');
				return;
			}

			if (post.shared.includes(email)) {
				res.status(400).json('Already shared with this person');
				return;
			}

			post.shared.push(email);

			post
				.save()
				.then(post => {
					res.send(post);
				})
				.catch(err => {
					res.status(400);
				});
		});
	}
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const user = req.user.id;
		Post.find({
			owner: user
		})
			.sort({
				date: -1
			})
			.exec((error, posts) => {
				if (!error) {
					res.json({ posts: posts });
				} else {
					res.status(400).json(error);
				}
			});
	}
);

router.get(
	'/shared',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const user = req.user.email;
		Post.find({
			shared: user
		})
			.sort({
				date: -1
			})
			.exec((error, posts) => {
				if (!error) {
					res.json({ posts: posts });
				} else {
					res.status(400).json(error);
				}
			});
	}
);

module.exports = router;
