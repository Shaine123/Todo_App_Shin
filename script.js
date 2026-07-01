const currDate = document.getElementById("date");
const addTodo = document.getElementById("add-todo");
const todoItem = document.getElementById("todo-item");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const itemLeft = document.getElementById("items-left");
const todoList = document.querySelector(".todo-list");

const todosTemp = getListofTodos();

addTodo.addEventListener("submit", addNewTodo);

document.body.addEventListener("change", (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    markCompletedTodo(event.target.id, event.target.checked);
  }
});

document.addEventListener("DOMContentLoaded", updateTodoListUI());

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
    : [];
}

function updateTodoListUI() {
  let todos = getListofTodos();

  const todosElement = todoList.firstElementChild;

  todosElement.innerHTML = "";

  todos.map((item) => {
    todosElement.appendChild(
      createNewTodo(item.id, item.todoVal, item.completed),
    );
  });

  itemLeft.textContent = todos.length;
}

function createNewTodo(todoId, todoVal, todoStatus) {
  const todoTemplate = `
          <input type="checkbox" id="${todoId}" />
          <span>${todoVal}</span>

          <button class="remove-btn">
              <i class="fa-solid fa-xmark"></i>
          </button>
  `;

  const li = document.createElement("li");
  li.innerHTML = todoTemplate;

  return li;
}

function saveTodoToStorage() {
  localStorage.setItem("todos", JSON.stringify(todosTemp));
}

function markCompletedTodo(id, isChecked) {
  let todos = getListofTodos();

  let updatedTodos = todos.map((item) => {
    if (item.id == id) {
      return { ...item, completed: isChecked };
    }
    return item;
  });

  todosTemp.splice(0, todosTemp.length, ...updatedTodos);

  saveTodoToStorage();
  updateTodoListUI();
}
