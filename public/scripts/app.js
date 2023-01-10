// Client facing scripts here
const taskInput = document.querySelector(".task-input input"),
  dateInput = document.querySelector(".due-date input"),
  priorityRanking = document.querySelector("priority"),
  //priorityInput = $('.priority option:selected').val(), => only return the first line of dropdown 
  //priorityInput = $(".priority :selected").text()
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");
let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));//fetch data from localStorage
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

//icon color for indicating priorities
const iconColor = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'white'
};

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task">

                            <label for="${id}">
                                <div id="priority">${todo.priority} </div}
                                <div id="duedate">${todo.date} </div>
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu test"> 
                                    <li onclick='editTask(${id}, "${todo.name}", "${todo.date}", "${todo.priority}")'><i class="fa-solid fa-pen-to-square"></i>Edit</li>
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
}
//show all activities when refreshing page
showTodo("all");
function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
function editTask(taskId, textName, date) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    dateInput.value = date;
    taskInput.focus();
    taskInput.classList.add("active");
}
function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}
clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    let date = dateInput.value.trim();
    //let priority = priorityInput.value.trim();
    let priority = priorityInput;
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, date: date, priority: priority,status: "pending"};
            todos.push(taskInfo);
            //console.log(priorityInput) => default
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
            todos[editId].date = date;
            todos[editId].priority = priority;
        }
        taskInput.value = "";
        dateInput.value = "";
        priorityInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});
