import React, { Component } from "react";
import "./TodoItem.css";

export class TodoItem extends Component {
	render() {
		return (
			<div className="TodoItem">
				<p className="Todo-Title">{this.props.title}</p>
				<button className="Edit-btn">Edit</button>
				<button className="Remove-btn">X</button>
			</div>
		);
	}
}

export default TodoItem;
