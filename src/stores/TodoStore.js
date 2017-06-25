import { observable, action, computed } from "mobx";
import axios from "axios";
import _ from 'lodash'

export default class TodoStore {
  @observable todos;

  constructor() {
    this.todos = {};
  }

  @computed get todosList () {
    return _.values(this.todos)
  }

  getTodoById = (id) => {
    const todo = this.todos[id]
    if (!todo) throw new Error(`no such todo with id ${id}`)
    return todo
  }

  @action addTodo (rawTodo) {
    const todo = {
      ...rawTodo,
      id: Date.now()
    }
    this.todos[todo.id] = todo
    console.log(todo, this.todos, `todo---------`)
  }

  @action removeTodo (id) {
    delete this.getTodoById(id)
  }
  
  @action removeAll (id) {
    this.todos = {}
  }

  @action toggleTodoStatus (id) {
    const todo = this.getTodoById(id)
    todo.isCompleted = !todo.isCompleted
  }

  @action filter (pred) {
    return _.filter(this.todos, pred)
  }
}