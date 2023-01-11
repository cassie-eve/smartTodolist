// Client facing scripts here

const taskInput = document.querySelector(".task-input input"),
  dateInput = document.querySelector(".due-date input"),
  priorityRanking = document.querySelector("priority"),
  priorityInput = $(".priority :selected").val(),
  categoryInput = $(".category :selected").val(),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");
let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list")); //fetch data from localStorage
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

// Icon color for indicating priorities
const iconColor = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'white'
};

const showTodo = function(filter) {
  let liTag = "";
  //console.log('Test Test', $(".priority :selected").val());
  console.log('Test category in ShowTodo, ', $(".category :selected").val());
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status === "completed" ? "checked" : "";
      if (filter === todo.status || filter === "all") {
        liTag += `<li class="task">
          <label for="${id}">
            <div id="priority">${todo.priority} </div}
            <div id="duedate">${todo.date} </div>
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
            <div id="category">${todo.category}</div>
            <p class="${completed}">${todo.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="task-menu test">
                <li onclick='editTask(${id}, "${todo.name}", "${todo.date}", "${todo.priority}", "${todo.category}")'><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                <li onclick='deleteTask(${id}, "${filter}")'><i class="fa-solid fa-trash"></i>Delete</li>
            </ul>
          </div>
        </li>`;
      }
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
};

//hide category input box by default
document.querySelectorAll('.category').forEach(el => el.hidden = true);

// Show all activities when refreshing page
showTodo("all");
const showMenu = function(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName !== "I" || e.target !== selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
};

const updateStatus = function(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
};

//notes: needs to add priority and categorys
const editTask = function(taskId, textName, date, priority) {
  document.querySelectorAll('.category').forEach(el => el.hidden = false);
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  dateInput.value = date;
  priorityInput.value = priority;
  categoryInput.value = category;
  console.log('Test edit, priority', priority, ' .Test edit, category, ', category);
  taskInput.focus();
  taskInput.classList.add("active");
};

const deleteTask = function(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
};

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    let date = dateInput.value.trim();
    let priority = $(".priority :selected").val();
    let category = $(".category :selected").val();
    if(e.key == "Enter" && userTask) {
      //console.log('test priority', priority);
      console.log('test category', category);
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, date: date, priority: priority, category: category,status: "pending"};
            todos.push(taskInfo);
            //console.log(priorityInput) => default
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
            todos[editId].date = date;
            todos[editId].priority = priority;
            todos[editId].category = category;
        }
        //Clear up the input boxes after submission
        // taskInput.value = "";
        // dateInput.value = "";
        //priorityInput.value = "";
        // priority.selectedIndex = 0;
        // category.selectedIndex = 0;
        //$(".priority :selected").val('');
        // localStorage.setItem("todo-list", JSON.stringify(todos));
        // showTodo(document.querySelector("span.active").id);
    }

    //Clear up the input boxes after submission
    taskInput.value = "";
    dateInput.value = "";
    priorityInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    $.ajax({
      type: 'POST',
      url: '/api/tasks',
      data: taskInfo,
      success: function() {
        showTodo(document.querySelector("span.active").id);
      }
    });
});
