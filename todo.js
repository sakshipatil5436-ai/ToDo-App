// const todoInput = document.getElementById("todoInput");
// const todoList = document.getElementById("todoList");
// const count = document.getElementById("count");
// const clearBtn = document.getElementById("clearBtn");

// const filterButtons = document.querySelectorAll(".filter, .active");

// let todos = [];
// let currentFilter = "all";

// todoInput.addEventListener("keypress", function (e) {

//   if (e.key === "Enter" && todoInput.value.trim() !== "") {

//     const todo = {
//       text: todoInput.value,
//       completed: false
//     };

//     todos.push(todo);

//     todoInput.value = "";

//     renderTodos();
//   }
// });

// function renderTodos() {

//   todoList.innerHTML = "";

//   let filteredTodos = todos;

//   if (currentFilter === "active") {
//     filteredTodos = todos.filter(todo => !todo.completed);
//   }

//   if (currentFilter === "completed") {
//     filteredTodos = todos.filter(todo => todo.completed);
//   }

//   filteredTodos.forEach((todo) => {

//     const li = document.createElement("li");

//     if (todo.completed) {
//       li.classList.add("completed");
//     }

//     li.innerHTML = `
//       <input type="checkbox" class="checkbox" ${todo.completed ? "checked" : ""}>
//       ${todo.text}
//     `;

//     const checkbox = li.querySelector(".checkbox");

//     checkbox.addEventListener("change", () => {

//       todo.completed = checkbox.checked;

//       renderTodos();
//     });

//     todoList.appendChild(li);
//   });

//   updateCount();
// }

// function updateCount() {

//   const activeTodos = todos.filter(todo => !todo.completed);

//   count.textContent = `${activeTodos.length} items left!`;
// }

// clearBtn.addEventListener("click", () => {

//   todos = todos.filter(todo => !todo.completed);

//   renderTodos();
// });

// filterButtons.forEach((button) => {

//   button.addEventListener("click", () => {

//     document.querySelector(".filters .active").classList.remove("active");

//     button.classList.add("active");

//     const text = button.textContent.toLowerCase();

//     currentFilter = text;

//     renderTodos();
//   });
// });




const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");
const selectAll = document.getElementById("selectAll");

const filterButtons = document.querySelectorAll(".filter, .active");

// local storage मधून data घे
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

// page load होताना render कर
renderTodos();

todoInput.addEventListener("keypress", function (e) {

  if (e.key === "Enter" && todoInput.value.trim() !== "") {

    const todo = {
      text: todoInput.value,
      completed: false
    };

    todos.push(todo);

    // local storage मध्ये save
    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";

    renderTodos();
  }
});

function renderTodos() {

  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  filteredTodos.forEach((todo) => {

    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${todo.completed ? "checked" : ""}>
      ${todo.text}
    `;

    const checkbox = li.querySelector(".checkbox");

    checkbox.addEventListener("change", () => {

      todo.completed = checkbox.checked;

      // update local storage
      localStorage.setItem("todos", JSON.stringify(todos));

      renderTodos();
    });

    todoList.appendChild(li);
  });

  updateCount();
}

function updateCount() {

  const activeTodos = todos.filter(todo => !todo.completed);

  count.textContent = `${activeTodos.length} items left!`;
}

clearBtn.addEventListener("click", () => {

  todos = todos.filter(todo => !todo.completed);

  // update local storage
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
});

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    document.querySelector(".filters .active").classList.remove("active");

    button.classList.add("active");

    const text = button.textContent.toLowerCase();

    currentFilter = text;

    renderTodos();
  });
});

selectAll.addEventListener("click", () => {

  const allCompleted = todos.every(todo => todo.completed);

  todos.forEach(todo => {
    todo.completed = !allCompleted;
  });

  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
});