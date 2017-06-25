import { store } from "rfx-core";

import AppState from "./AppState";
import TodoStore from "./TodoStore";

export default store.setup({
	appState: AppState,
  todoStore: TodoStore, 
});
