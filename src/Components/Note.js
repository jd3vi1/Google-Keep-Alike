import React, { Component } from "react";
// import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import "../Styles/Note.css";

export class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			todos: [],
		};
		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.checkTodo = this.checkTodo.bind(this);
		this.updateData = this.updateData.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		const title = localStorage.getItem("title");
		const todos = JSON.parse(localStorage.getItem("todos"));
		if (todos === null || title === null) {
			this.addTodo();
			this.setState({
				title: "",
			});
		} else {
			this.setState({
				title,
				todos,
			});
		}
	}

	componentDidUpdate() {
		if (this.state.todos.filter((todo) => !todo.isChecked).length === 0) {
			this.addTodo();
		}
		const { title, todos } = this.state;
		localStorage.setItem("title", title);
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	handleKeyUp(evt) {
		if (evt.keyCode === 13) {
			evt.preventDefault();
		}
		this.setState({
			title: evt.target.value,
		});
	}

	handleKeyDown(evt) {
		if (evt.keyCode === 8) return;
		if (evt.keyCode === 13 || this.state.title.length > 20) {
			evt.preventDefault();
		}
	}

	addTodo(todo) {
		let unique = uuidv4();
		let newTodoObj = {
			data: "",
			isChecked: false,
			key: unique,
			id: unique,
		};
		this.setState(() => ({
			todos: [...this.state.todos, newTodoObj],
		}));
	}

	removeTodo(todo) {
		this.setState(() => ({
			todos: this.state.todos.filter((t) => t.key !== todo.props.id),
		}));
	}

	checkTodo(todo) {
		this.setState(() => ({
			todos: this.state.todos.map((t) => {
				if (t.key === todo.props.id) {
					t.isChecked = !todo.props.isChecked;
					return t;
				}
				return t;
			}),
		}));
	}

	updateData(todo, val) {
		this.setState(() => ({
			todos: this.state.todos.map((t) => {
				if (t.key === todo.props.id) {
					t.data = val;
					return t;
				}
				return t;
			}),
		}));
	}

	render() {
		let todos = this.state.todos.reduce((result, todo) => {
			if (!todo.isChecked)
				result.push(
					<TodoItem
						addTodo={this.addTodo}
						removeTodo={this.removeTodo}
						checkTodo={this.checkTodo}
						updateData={this.updateData}
						data={todo.data}
						isChecked={todo.isChecked}
						key={todo.key}
						id={todo.id}
					/>
				);
			return result;
		}, []);
		let checked = this.state.todos.reduce((result, todo) => {
			if (todo.isChecked)
				result.push(
					<TodoItem
						addTodo={this.addTodo}
						removeTodo={this.removeTodo}
						checkTodo={this.checkTodo}
						updateData={this.updateData}
						data={todo.data}
						isChecked={todo.isChecked}
						key={todo.key}
						id={todo.id}
					/>
				);
			return result;
		}, []);
		return (
			<div className="Note">
				<input
					type="text"
					className="Note-title"
					placeholder="Title"
					onKeyUp={this.handleKeyUp}
					onKeyDown={this.handleKeyDown}
					defaultValue={this.state.title}
				/>
				{todos}
				<hr />
				{checked}
			</div>
		);
	}
}

export default Note;
