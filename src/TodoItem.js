import React, { Component } from "react";
import "./TodoItem.css";

export class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data,
		};
		this.handleRemove = this.handleRemove.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.props.checkTodo(this);
	}

	handleKeyUp(evt) {
		if (evt.keyCode === 13 && !this.props.isChecked) {
			this.props.addTodo();
			evt.preventDefault();
			return false;
		} else if (evt.keyCode === 8 && this.state.title.length === 0) {
			this.props.removeTodo(this);
		}
		this.setState({
			title: evt.target.value,
		});
		console.log(evt.key);
	}

	handleRemove(evt) {
		this.props.removeTodo(this);
	}

	render() {
		return (
			<div className="Todo-Item-container">
				<input
					type="checkbox"
					name="chx"
					className="checkbox"
					defaultChecked={this.props.isChecked}
					onChange={this.handleChange}
				/>
				{/* <div
					className="Todo-Item"
					contentEditable="true"
					onKeyDown={this.handleKeyUp}
					placeholder="Add Item"

				></div> */}
				<input
					type="text"
					autoFocus
					className={
						this.props.isChecked ? "Todo-Item-checked Todo-Item" : "Todo-Item"
					}
					onKeyUp={this.handleKeyUp}
					placeholder="Add Item..."
					defaultValue={this.state.title}
				/>
				{this.state.title.length}
				<button className="Remove-btn" onClick={this.handleRemove}>
					x
				</button>
			</div>
		);
	}
}

export default TodoItem;
