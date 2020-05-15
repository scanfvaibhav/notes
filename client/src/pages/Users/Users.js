import React, { Component } from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, FormBtn } from '../../components/Form';

class Users extends Component {
	state = {
		Users: [],
		name: '',
		id: ''
	};

	componentDidMount() {
		this.loadUsers();
	}

	loadUsers = () => {
		API.getUsers()
			.then(res => this.loadState(res))
			.catch(err => console.log(err));
	};
	loadState = (res)  =>  {
		this.setState({ Users: res.data, name: '', id: '' });
	};
	deleteUser = id => {
		API.deleteUser(id)
			.then(res => this.loadUsers())
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.name && this.state.id) {
			API.saveUser({
				name: this.state.name,
				id: this.state.id
			})
				.then(res => this.loadUsers())
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>What Users Should?</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.name}
								onChange={this.handleInputChange}
								name="name"
								placeholder="name (required)"
							/>
							<Input
								value={this.state.id}
								onChange={this.handleInputChange}
								name="id"
								placeholder="id (required)"
							/>

							<FormBtn
								disabled={!(this.state.id && this.state.name)}
								onClick={this.handleFormSubmit}
							>
								Submit User
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Users On My List</h1>
						</Jumbotron>
						{this.state.Users.length ? (
							<List>
								{this.state.Users.map(User => (
									<ListItem key={User._id}>
										<Link to={'/Users/' + User._id}>
											<strong>
												{User.name} by {User.id}
											</strong>
										</Link>
										<DeleteBtn onClick={() => this.deleteUser(User._id)} />
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Users;
