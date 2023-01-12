// Client facing scripts here
$(document).ready(function() {

const formatDate = function(due_date) {
    return dateFormat(due_date, "isoDate");
};

let tasks = [];

$( "#read" ).click(function() {
  filterTasksByCategory('read');
});

$( "#buy" ).click(function() {
  filterTasksByCategory('buy');
});

$( "#watch" ).click(function() {
  filterTasksByCategory('watch');
});

$( "#all" ).click(function() {
  $(`.task-box`).html();
  renderTasks(tasks);
});

$( "#pending" ).click(function() {
  filterTasksByCategory(false);
});

$( "#completed" ).click(function() {
  filterTasksByCategory(true);
});


const filterTasksByCategory = (category) => {
  console.log('================', tasks, category);
  const result = tasks.filter(task => task.category == category || task.completed == category);
  console.log("+++++++++++++++", category, result);
  $(`.task-box`).html( )
  renderTasks(result);
}

  const createTaskElement = function(data) {
    let $task = $(`<li class="task">
      <label for="${data.id}">
        <div id="priority">${data.priority} </div}
        <div id="duedate">${formatDate(data.due_date)}</div>
        <input onclick="updateStatus(this)" type="checkbox" id="${data.id}" ${data.completed}>
        <p class="${data.completed}">${data.name}</p>
        <p>${data.category}</p>
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

  const loadTasks = function() {
    $.ajax({
      type: 'GET',
      url: '/api/tasks',
      success: function(res) {
        console.log(res.data, "*************");
        tasks = res.data;
        renderTasks(res.data);
      }
    });
  };

  const renderTasks = function(tasks) {
    // $(`.task-box`).empty();
    for (let task of tasks) {
      const $taskElement = createTaskElement(task);
      $(`.task-box`).prepend($taskElement);
    }
  };
  loadTasks();
});

// document ready
//on loadup to display exsiting tasks in database
//const fetchTasks() =  wait for document to be ready, then call this function with an ajax request inside
//const renderTasks() = when data comes back , start displaying
//on submission to update tasks table in database
//const addTasks()

Object.data;
