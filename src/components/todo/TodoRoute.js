import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import _ from 'lodash'
import MobxReactForm from 'mobx-react-form';

/* -----------------------------
  NEW TODO FORM
----------------------------- */
const fields = [{
  name: 'content',
  label: 'Todo content',
  placeholder: 'What else do you wanna do?',
}]

const NewTodoFormUI = observer(({form}) => 
  <form onSubmit={form.onSubmit}>
    <div>
      <label>
        <h5> {form.$('content').label}</h5>
        <input {...form.$('content').bind()} />
      </label>
    </div>
    <button type="submit" onClick={form.onSubmit}>Submit</button>
  </form>
)


/* -----------------------------
  TODOS
----------------------------- */

@inject("store")
@observer
export default class TodoRoute extends Component {
  constructor(props) {
    super(props);
    this.todoStore = this.props.store.todoStore
    this.newTodoForm = new MobxReactForm({fields}, {
      onSubmit: {
        onSuccess: (form) => {
          this.todoStore.addTodo(form.values().content)
          form.clear()
        },
        onError: _.identity
      }
    })
  }
  render() {
    return (
      <div>
        <TodosList store={this.todoStore} />
        <hr/>
        <NewTodoFormUI form={this.newTodoForm}  />
      </div>
    );
  }
}

const TodosList = observer(({store}) => {
  return <ul>
    {_.map(store.todosList, (todo) => <TodoItem 
      {...todo}
      key={_.uniqueId('todo-')}
      onDelete={store.removeTodo}
      />
    )}
  </ul>
}
) 

const TodoItem = observer(({id, content, isCompleted, onDelete}) => {
  return <div>
    <label>
      <input type="checkbox" value={isCompleted} onChange={() => {isCompleted = !isCompleted}} />
      <span>{content} </span>
    </label>
    <span onClick={_.partial(onDelete, id)}> X </span>
  </div>
})

