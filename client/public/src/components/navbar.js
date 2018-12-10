import React, { Component } from 'react';

export default class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<a class="navbar-brand" href="#">
					Daniel's Project
				</a>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item">
							<a class="nav-link" href="/">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/register">
								Register
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/login">
								Login
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
