const express = require('express');
const router = express.Router();
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
		const images = req.body.images;

		const newPost = Post({
			title: title,
			text: text,
			owner: owner,
			images: images
		});

		newPost.save().then(post => {
			res.send(post);
		});
	}
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const user = req.user.id;
		console.log('u made it');
		Post.find({
			owner: user
		})
			.sort({
				date: -1
			})
			.exec((error, posts) => {
				if (!error) {
					console.log(posts);
					res.json({ posts: posts });
				} else {
					res.status(400).json(error);
					console.log('u goofed');
				}
			});
	}
);

module.exports = router;
