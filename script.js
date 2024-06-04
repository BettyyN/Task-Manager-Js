document.addEventListener("DOMContentLoaded", function () {
  window.tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
      id: "1",
      title: "Task 1",
      dueDate: "2024-04-06",
      description: "This is the description for Task 1.",
    },
    {
      id: "2",
      title: "Task 2",
      dueDate: "2024-05-12",
      description: "This is the description for Task 2.",
    },
  ];
 window.displayTask = function (task) {
   return `
          <div class="displayTitle">
            <i class="fas fa-caret-down" onclick="displayText(this)" id="dropdown"></i>
            <h3>${task.title}</h3>
            <i class="fas fa-edit" id="edit"></i>
            <i class="fas fa-trash" id="delete"></i>
          </div>
          <div id="textField">
            <h4>Due Date: <span>${task.dueDate}</span></h4>
            <p>${task.description}</p>
          </div>
  `;
 };

  var taskContainer = document.getElementById("taskcontainer");
  tasks.forEach(function (task) {
    var taskMarkup = displayTask(task);
    taskContainer.insertAdjacentHTML("beforeend", taskMarkup);
  });
});

function displayText(clickedTask) {
  var task = clickedTask.parentElement.nextElementSibling;
  var textField = task;
  textField.style.display =
    textField.style.display === "none" ? "block" : "none";
  task.style.height = textField.style.display === "none" ? "30px" : "auto";
  var dropdown = clickedTask;
  dropdown.className =
    textField.style.display === "none"
      ? "fas fa-caret-down"
      : "fas fa-caret-up";
}

function handleAddTodo() {
  const addtodo = document.getElementById("todobox");
  const items = `    
    <h2>Add New Task</h2>
  <form id="taskForm">
    <label for="taskTitle">Title</label>
    <input type="text" id="taskTitle">
    <label for="taskDescription">Description</label>
    <input type="text" id="taskDescription">
    <label for="taskDueDate">Due date</label>
    <input type="date" id="taskDueDate">
    <button type="button" id="submitTask">Submit</button>
  </form>`;
  addtodo.innerHTML = items;

  document.getElementById("submitTask").addEventListener("click", function () {
    var title = document.getElementById("taskTitle").value;
    var description = document.getElementById("taskDescription").value;
    var dueDate = document.getElementById("taskDueDate").value;

    if (title && description && dueDate) {
      var newTask = {
        id: Date.now().toString(),
        title: title,
        dueDate: dueDate,
        description: description,
      };

      window.tasks.push(newTask); // Add new task to the tasks array
      localStorage.setItem("tasks", JSON.stringify(window.tasks)); 

      var taskContainer = document.getElementById("taskcontainer");
      var taskMarkup = displayTask(newTask);
      taskContainer.insertAdjacentHTML("beforeend", taskMarkup);

      // Clear form fields after submission
      document.getElementById("taskForm").reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// document.addEventListener("DOMContentLoaded", () => {
//   window.todos = [
//     {
//       id: "1",
//       title: "x",
//       description: " X dgibfgegdghk hllkhl ",
//       duedate: "2024-04-06",
//     },
//     {
//       id: "2",
//       title: "y",
//       description: "Y dgibfgegdghk hllkhl ",
//       duedate: "2024-05-06",
//     },
//     {
//       id: "3",
//       title: "z",
//       description: "Z dgibfgegdghk hllkhl ",
//       duedate: "2024-06-06",
//     },
//   ];
//   updateTodoLists();
// });

// function handleAddTodo() {
//   const addtodo = document.getElementById("todobox");
//   const items = `    <input type="text" id="input1">
//        <Button onclick="insertTodo()">ADD</Button>
//         <Button onclick="cancelTodo()">CANCEL</Button>`;

//   addtodo.innerHTML = items;
// }

// function insertTodo() {
//   const input1 = document.getElementById("input1");
//   const value1 = input1.value.trim();
//   if (value1 !== "") {
//     window.todos.push({
//       id: (window.todos.length + 1).toString(),
//       todoli: value1,
//     });
//     input1.value = "";
//     updateTodoLists();
//     cancelTodo();
//   }
// }

// function updateTodoLists() {
//   const todoList = document.getElementById("todo-list");
//   todoList.innerHTML = ""; // Clear the current list
//   window.todos.forEach((todo) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <span id="todo">${todo.todoli}</span>
//       <button onclick="handleEditTodo('${todo.id}')">Edit</button>
//       <button onclick="handleDeleteTodo('${todo.id}')">Delete</button>
//     `;
//     todoList.appendChild(li);
//   });
// }
// function cancelTodo() {
//   const addtodo = document.getElementById("todobox");
//   addtodo.innerHTML = "";
// }
// function handleDeleteTodo(id) {
//   window.todos = window.todos.filter((todo) => todo.id !== id);
//   updateTodoLists();
// }

// function handleEditTodo(id) {
//   const todoToEdit = window.todos.find((todo) => todo.id === id);
//   const newTodo = prompt("Edit todo", todoToEdit.todoli);
//   if (newTodo) {
//     window.todos = window.todos.map((todo) =>
//       todo.id === id ? { ...todo, todoli: newTodo } : todo
//     );
//     updateTodoLists();
//   }
// }
