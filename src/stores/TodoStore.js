import { observable, action, computed, extendObservable, map } from "mobx";
import axios from "axios";
import _ from 'lodash'

class TodoStore {

  constructor() {
    this.todos = map({})
  }

  @computed get todosList () {
    console.log(Array.from(this.todos.values()), `Array.from(this.todos.values())---------`)
    return Array.from(this.todos.values())
  }

  getTodoById = (id) => {
    return this.todos.get(id)
  }

  @action addTodo = (content) => {
    const id = `${Date.now()}`
    const todo = observable({
      id,
      content,
      isCompleted: false,
    })
    this.todos.set(id, todo)
  }

  @action removeTodo =  (id) => {
    this.todos.delete(id)
  }

  @action removeAll = (id) => {
    this.todos.clear()
  }

  @action filter = (pred) => {
    return _.filter(this.todos, pred)
  }
}

export default TodoStore
