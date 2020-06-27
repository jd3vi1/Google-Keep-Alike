import React, { Component } from 'react'
import { TodoForm } from './TodoForm'
import { TodoItem } from './TodoItem'


export class Note extends Component {
	constructor(props){
		super(props);
		this.state = {
			todos: [
			]
		}
		this.addTodo = this.addTodo.bind(this);
	}

	componentDidMount(){
		this.setState({
			todos: [
				<TodoForm addTodo={this.addTodo} />
			]
		})
	}

	addTodo(todo){
		let newTodo = <TodoItem title={todo.title}/>
		this.setState(() => ({
			todos: [...this.state.todos].slice(0, this.state.todos.length - 1).concat(newTodo,<TodoForm addTodo={this.addTodo} />)
		}));
	}

	render() {
		return (
			<div>
				{this.state.todos}			
			</div>
		)
	}
}

export default Note
