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
            <i class="fas fa-edit" id="edit" onclick="handleEditTask('${task.id}')"></i>
            <i class="fas fa-trash" id="delete" data-id="${task.id}" onclick="handleDeleteTask(this)"></i>
          </div>
          <div id="textField">
            <h4>Due Date: <span>${task.dueDate}</span></h4>
            <p>${task.description}</p>
          </div>
  `;
  };

  window.renderTasks = function (filter = "all") {
    var taskContainer = document.getElementById("taskcontainer");
    taskContainer.innerHTML = "";

    const now = new Date();
    const tasksToDisplay = window.tasks.filter((task) => {
      const taskDueDate = new Date(task.dueDate);

      if (filter === "today") {
        return taskDueDate.toDateString() === now.toDateString();
      }

      if (filter === "week") {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(
          now.setDate(now.getDate() - now.getDay() + 6)
        );
        return taskDueDate >= startOfWeek && taskDueDate <= endOfWeek;
      }

      return true; // 'all' filter
    });

    tasksToDisplay.forEach(function (task) {
      var taskMarkup = displayTask(task);
      taskContainer.insertAdjacentHTML("beforeend", taskMarkup);
    });
  };

  renderTasks();
  document.getElementById("filter-all").addEventListener("click", function () {
    renderTasks("all");
  });

  document
    .getElementById("filter-today")
    .addEventListener("click", function () {
      renderTasks("today");
    });

  document.getElementById("filter-week").addEventListener("click", function () {
    renderTasks("week");
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


function showModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function showModala() {
  document.getElementById("modal-add").style.display = "block";
}

function closeModala() {
  document.getElementById("modal-add").style.display = "none";
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
    <button type="button" id="cancelTask">Cancel</button>
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

      window.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(window.tasks));

      var taskContainer = document.getElementById("taskcontainer");
      var taskMarkup = displayTask(newTask);
      taskContainer.insertAdjacentHTML("beforeend", taskMarkup);

      document.getElementById("taskForm").reset();
      closeModala();
    } else {
      alert("Please fill in all fields.");
    }
  });

   document.getElementById("cancelTask").addEventListener("click", closeModala);
  showModala();
}

function handleDeleteTask(tobedeleted) {
  const taskId = tobedeleted.getAttribute("data-id");
  window.tasks = window.tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(window.tasks));
  renderTasks();
}

function handleEditTask(id) {
  const taskToEdit = window.tasks.find((task) => task.id === id);
  if (!taskToEdit) return;

  const addtodo = document.getElementById("modal-content");
  const items = `    
    <h2>Edit Task</h2>
    <form id="editTaskForm">
      <label for="editTaskTitle">Title</label>
      <input type="text" id="editTaskTitle" value="${taskToEdit.title}">
      <label for="editTaskDescription">Description</label>
      <input type="text" id="editTaskDescription" value="${taskToEdit.description}">
      <label for="editTaskDueDate">Due date</label>
      <input type="date" id="editTaskDueDate" value="${taskToEdit.dueDate}">
      <button type="button" id="submitEditTask">Save Changes</button>  
    <button type="button" id="cancelEditTask">Cancel</button>
    </form>`;
  addtodo.innerHTML = items;

  document
    .getElementById("submitEditTask")
    .addEventListener("click", function () {
      var title = document.getElementById("editTaskTitle").value;
      var description = document.getElementById("editTaskDescription").value;
      var dueDate = document.getElementById("editTaskDueDate").value;

      if (title && description && dueDate) {
        window.tasks = window.tasks.map((task) =>
          task.id === id ? { ...task, title, description, dueDate } : task
        );
        localStorage.setItem("tasks", JSON.stringify(window.tasks));
        renderTasks();
        closeModal();
      } else {
        alert("Please fill in all fields.");
      }
    });
    document
      .getElementById("cancelEditTask")
      .addEventListener("click", closeModal);
    showModal();
}


