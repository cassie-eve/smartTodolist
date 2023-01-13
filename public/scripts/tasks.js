// Client facing scripts here
const loadTasks = function() {
  $.ajax({
    type: 'GET',
    url: '/api/tasks',
    success: function(res) {
      console.log(res.data);
      renderTasks(res.data);
    }
  });
};

const renderTasks = function(tasks) {
  // $(`.task-box`).empty();
  for (let task of tasks) {
    const $taskElement = createTaskElement(task);
    $(`.task-box`).append($taskElement);
  }
};

const createTaskElement = function(data) {
  let $task = $(`<li class="task">
    <label for="${data.id}">
      <div id="priority">${data.priority} </div}
      <div id="duedate">${formatDate(data.due_date)}</div>
      <input onclick="updateStatus(this)" type="checkbox" id="${data.id}" ${data.completed}>
      <p class="${data.completed}">${data.name}</p>
      <p class="cat">${data.category}</p>
    </label>
    <div class="settings">
      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
      <ul class="task-menu test">
        <li onclick='editTask(${data.id}, "${data.name}", "${formatDate(data.due_date)}", "${data.priority}")'><i class="fa-solid fa-pen-to-square"></i>Edit</li>
        <li onclick='deleteTask(${data.id})'><i class="fa-solid fa-trash"></i>Delete</li>
      </ul>
    </div>
  </li>`);

  return $task;
};

const formatDate = function(due_date) {
  return dateFormat(due_date, "isoDate");
};

$(document).ready(function() {

  loadTasks();

});

// document ready
//on loadup to display exsiting tasks in database
//const fetchTasks() =  wait for document to be ready, then call this function with an ajax request inside
//const renderTasks() = when data comes back , start displaying
//on submission to update tasks table in database
//const addTasks()



