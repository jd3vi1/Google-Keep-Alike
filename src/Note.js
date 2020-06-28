import React, { Component } from "react";
// import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import "./Note.css";

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
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentDidMount() {
		this.addTodo();
	}

	componentDidUpdate() {
		if (this.state.todos.filter((todo) => !todo.isChecked).length === 0) {
			this.addTodo();
		}
	}

	handleKeyUp(evt) {
		console.log(evt.keyCode);

		// if (evt.keyCode === 8) return;
		if (evt.keyCode === 13) {
			evt.preventDefault();
		}
		this.setState({
			title: evt.target.innerText,
		});
	}

	addTodo(todo) {
		let unique = uuidv4();
		let newTodoObj = {
			addTodo: this.addTodo,
			removeTodo: this.removeTodo,
			checkTodo: this.checkTodo,
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
					console.log("We the best music", t, todo);

					t.isChecked = !todo.props.isChecked;
					t.data = todo.state.title;
					return t;
				}
				return t;
			}),
		}));
	}

	render() {
		let todos = this.state.todos.map((todo) => {
			if (!todo.isChecked)
				return (
					<TodoItem
						addTodo={todo.addTodo}
						removeTodo={todo.removeTodo}
						checkTodo={todo.checkTodo}
						data={todo.data}
						isChecked={todo.isChecked}
						key={todo.key}
						id={todo.id}
					/>
				);
		});
		let checked = this.state.todos.map((todo) => {
			if (todo.isChecked)
				return (
					<TodoItem
						addTodo={todo.addTodo}
						removeTodo={todo.removeTodo}
						checkTodo={todo.checkTodo}
						data={todo.data}
						isChecked={todo.isChecked}
						key={todo.key}
						id={todo.id}
					/>
				);
		});
		return (
			<div className="Note">
				<div
					className="Note-title"
					placeholder="Title"
					contentEditable="true"
					onKeyUp={this.handleKeyUp}
				></div>
				{todos}
				{/* {console.log(this.state.todos)} */}
				<hr />
				{checked}
			</div>
		);
	}
}

export default Note;
