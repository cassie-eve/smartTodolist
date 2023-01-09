// Client facing scripts here
const taskInput = document.querySelector(".task-input input"),
dateInput = document.querySelector(".due-date input"),
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
function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                
                            <label for="${id}">
                                <div id="duedate">${todo.date} </div>
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu test"> 
                                    <li onclick='editTask(${id}, "${todo.name}", "${todo.date}")'><i class="fa-solid fa-pen-to-square"></i>Edit</li>
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
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
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
    showTodo()
});
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    let date = dateInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, date: date, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
            todos[editId].date = date;
        }
        taskInput.value = "";
        dateInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

let tiny = require('tiny-json-http');

// categorize a string as 'To Watch', 'To Eat', 'To Read', or 'To Buy'
const categorize = function(string) {
  let url = 'https://api.uclassify.com/v1/cassandraeve/smarttodolist/classify';
  let data = {"texts":[string]};
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token YDEFqA9byG5i'
  };

  tiny.post({url, data, headers}, function _posted(err, result) {
    if (err) {
      console.log('Error:', err);
    } else {
      let category = '';
      let score = 0;
      for (let name of result.body[0].classification) {
        if (name.p > score) {
          category = name.className;
          score = name.p;
        }
      }
      return category;
    }
  });
};

module.exports = { categorize };
