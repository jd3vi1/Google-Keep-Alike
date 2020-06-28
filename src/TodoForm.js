import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

export class TodoForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
            title: "",
            id: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({
            [evt.target.name]: evt.target.value,
            id: uuidv4()
		});
	}

	handleSubmit(evt) {
        evt.preventDefault();
		this.props.addTodo(this.state);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Start typing..."
						onChange={this.handleChange}
					/>
					<button>Add</button>
				</form>
			</div>
		);
	}
}

export default TodoForm;
