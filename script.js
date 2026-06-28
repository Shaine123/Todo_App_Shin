const currDate = document.getElementById("date");
const addTodo = document.getElementById("add-todo");
const todoItem = document.getElementById("todo-item");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const itemLeft = document.getElementById("item-left");
const todoList = document.querySelector(".todo-list");

const todosTemp = [];

addTodo.addEventListener("submit", addNewTodo);

function addNewTodo(e) {
  e.preventDefault();
  const todoValue = todoItem.value;

  const todos = getListofTodos();

  const todo = {
    id: Math.floor(Date.now() / 1000),
    todoVal: todoValue,
    completed: false,
  };

  todosTemp.push(todo);

  saveTodoToStorage();
  updateTodoListUI();
}

function getListofTodos() {
  return JSON.parse(localStorage.getItem("todos"))
    ? JSON.parse(localStorage.getItem("todos"))
    : todosTemp;
}

function updateTodoListUI() {
  let todos = getListofTodos();

  console.log(todos, "tes");

  const todosElement = todoList.firstElementChild;

  todosElement.innerHTML = "";

  todos.map((item) => {
    todosElement.appendChild(createNewTodo(item.id, item.todoVal));
  });
}

function createNewTodo(todoId, todoVal) {
  const todoTemplate = `
      <li>
          <input type="checkbox" checked id="${todoId}" />
          <span>${todoVal}</span>
      </li>
  `;

  const li = document.createElement("li");
  li.innerHTML = todoTemplate;

  return li;
}

function saveTodoToStorage() {
  localStorage.setItem("todos", JSON.stringify(todosTemp));
}
