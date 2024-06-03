document.addEventListener("DOMContentLoaded", () => {
  window.todos = [
    { id: "1", todoli: "x" },
    { id: "2", todoli: "y" },
    { id: "3", todoli: "z" },
  ];
  updateTodoLists();
});

function handleAddTodo() {
  const addtodo = document.getElementById("todobox");
  const items = `    <input type="text" id="input1">
       <Button onclick="insertTodo()">ADD</Button>
        <Button onclick="cancelTodo()">CANCEL</Button>`;

  addtodo.innerHTML = items;
}


function insertTodo() {
  const input1 = document.getElementById("input1");
  const value1 = input1.value.trim();
  if (value1 !== "") {
    window.todos.push({ id: (window.todos.length + 1).toString(), todoli: value1 });
    input1.value = "";
    updateTodoLists();
    cancelTodo();
  }
}

function updateTodoLists() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear the current list
  window.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span id="todo">${todo.todoli}</span>
      <button onclick="handleEditTodo('${todo.id}')">Edit</button>
      <button onclick="handleDeleteTodo('${todo.id}')">Delete</button>
    `;
    todoList.appendChild(li);
  });
}
function cancelTodo() {
  const addtodo = document.getElementById("todobox");
  addtodo.innerHTML = "";
}
function handleDeleteTodo(id) {
 window.todos = window.todos.filter((todo) => todo.id !== id);
 updateTodoLists();
}


function handleEditTodo(id) {
  const todoToEdit = window.todos.find((todo) => todo.id === id);
  const newTodo = prompt("Edit todo", todoToEdit.todoli);
  if (newTodo) {
    window.todos = window.todos.map((todo) =>
      todo.id === id ? { ...todo, todoli: newTodo } : todo
    );
    updateTodoLists();
  }
}
