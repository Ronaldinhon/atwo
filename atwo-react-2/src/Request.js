import React, { Component } from 'react';
import axios from 'axios';

class Request extends Component {
	state = {
		value: ''
	};

	componentDidMount () {
		this.fetchValue();
	}

	async fetchValue () {
		const value = await axios.get('/api/v1/examples');
		this.setState({value: value.data});
	}

	render () {
		return (
			<div>
				{this.state.value}
			</div>
		);
	}
}

export default Request;