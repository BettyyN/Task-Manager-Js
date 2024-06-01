// handleEditTodo
// handleDeleteTodo
// handleAddTodo
const todos = [
  {
    id: "1",
    todoli: "washing dish",
  },
  {
    id: "2",
    todoli: "washing dish",
  },
  {
    id: "3",
    todoli: "washing dish",
  },
];

let text="";
todos.forEach(function (todo, index) {
  text +=
    "Todo " + (index + 1) + ": " + todo.todoli + "<br>";
});

document.getElementById("demo").innerHTML = text;
