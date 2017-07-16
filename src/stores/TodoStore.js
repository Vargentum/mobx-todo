import { observable, action, computed, extendObservable } from "mobx";
import axios from "axios";
import _ from 'lodash'

class TodoStore {
  @observable todos = [];

  @computed get todosList () {
    return this.todos
  }

  getTodoById = (id) => {
    const todo = this.todos[id]
    if (!this.todo) throw new Error(`no such todo with id ${id}`)
    return this.todo
  }

  @action addTodo = (content) => {
    this.todos.push(content)
    console.log(this.todos, `todos---------`)
  }

  @action removeTodo =  (id) => {
    delete this.getTodoById(id)
  }
  
  @action removeAll = (id) => {
    this.todos = {}
  }

  @action toggleTodoStatus = (id) => {
    const todo = this.getTodoById(id)
    todo.isCompleted = !todo.isCompleted
  }

  @action filter = (pred) => {
    return _.filter(this.todos, pred)
  }
}

export default TodoStore
