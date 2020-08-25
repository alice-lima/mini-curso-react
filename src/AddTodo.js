import React from 'react';
import { ToDoList } from './ToDoList'
import { FormGroup, Form, Button } from 'react-bootstrap';
import './page.css';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cont: 0,
            todo: {
                id: 0,
                title: '',
                variant: ''
            },
            disable: false,
            textButton: 'Finish',
            todos: []
        }
    }

    addTodo = todo => {
        let newCont = this.state.cont + 1
        this.setState({
            cont: newCont,
            todo: {
                id: newCont,
                title: '',
                variant: '' 
            },
            todos: [...this.state.todos, todo]
        })
    }

    handleClick = async(todo) => {
        const index = this.getTodo(todo);
        await this.handleTodoStatus(todo);

        const newList = this.state.todos;
        newList.splice(index, 1, this.state.todo)
        
        this.setState({
            todos: newList
        })
    }

    getTodo(todo) {
        return this.state.todos.indexOf(todo)
    }

    handleTodoStatus = todo => {
        this.setState({
            todo: {
                id: todo.id,
                title: todo.title,
                variant: todo.variant === '' ? 'success' : ''
            }
        })
    }

    handleTodoTitle = event => {
        this.setState({
            todo: {
                ...this.state.todo,
                title: event.target.value
            }
        })
    }

    handleText = () => {
        this.setState({
            disable: !this.state.disable ? true : false,
            textButton: this.state.textButton === 'Finish' ? 'Start' : 'Finish'
        })
    }

    render() {
        const {todos, todo} = this.state

        console.log(this.state.disable)
        return (
            <div className="list">
                <FormGroup>
                    <Form.Label>To Do:</Form.Label>
                    <Form.Control
                        id = "txtTitle" 
                        value = {todo.title} 
                        onChange = {this.handleTodoTitle} 
                        readOnly = {this.state.disable}>
                    </Form.Control>
                </FormGroup>
                <div className = "buttons">
                    <Button 
                        variant = "secondary" 
                        onClick = {() => this.handleText()}
                    >
                        { this.state.textButton }
                    </Button>
                    <Button 
                        variant = "primary" 
                        onClick = {() => this.addTodo(todo)}
                        disabled = {this.state.disable}
                    >
                        Add To Do
                    </Button>
                </div>
                <ToDoList items = {todos} handleClick = {this.handleClick} />
            </div>
        )
    }
}

export default AddTodo;