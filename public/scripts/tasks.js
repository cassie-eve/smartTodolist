// Client facing scripts here

const renderTasks = function(tasks) {
  $(`.task-box`).empty();
  for (let task of tasks) {
    const $taskElement = createTaskElement(task);
    $(`.task-box`).append($taskElement);
  }
};

let tasks = [];

$( "#read" ).click(function() {
  currentCategory = 'To Read';
  $(`.task-box`).empty();
  filterTasksByCategory(currentCategory);
});

$( "#buy" ).click(function() {
  currentCategory = 'To Buy';
  $(`.task-box`).empty();
  filterTasksByCategory(currentCategory);
});

$( "#watch" ).click(function() {
  currentCategory = 'To Watch';
  $(`.task-box`).empty();
  filterTasksByCategory(currentCategory);
});

$( "#eat" ).click(function() {
  currentCategory = 'To Eat';
  $(`.task-box`).empty();
  filterTasksByCategory(currentCategory);
});

$( "#all" ).click(function() {
  currentCategory = 'All';
  $(`.task-box`).empty();
  $(`.task-box`).html();
  renderTasks(tasks);
});

$( "#pending" ).click(function() {
  currentCategory = false;
  $(`.task-box`).empty();
  filterTasksByCategory(currentCategory);
});

$( "#completed" ).click(function() {
  currentCategory = true;
  $(`.task-box`).empty();
  filterTasksByCategory(currentCategory);
});


const filterTasksByCategory = (category) => {
  loadTasks()
  .then( () => {
    const result = tasks.filter(task => task.category == category || task.completed == category);
    $(`.task-box`).html( )
    renderTasks(result);
  } )
}

  const loadTasks = function() {
    return  $.ajax({
      type: 'GET',
      url: '/api/tasks',
      success: function(res) {
        tasks = res.data;
        renderTasks(res.data);
      }
    });
  };

const prioritize = function(num) {
  if (num === '1' || num === 1) {
    return '<i style="color:#14EA38;border-radius:50%;" class="fa-regular fa-circle priority1"></i>';
  }

  if (num === '2' || num === 2) {
    return '<i style="color:#E5D629;border-radius:50%;" class="fa-regular fa-circle priority2"></i>';
  }

  if (num === '3' || num === 3) {
    return '<i style="color:#E78B1C;border-radius:50%;" class="fa-regular fa-circle priority3"></i>';
  }

  if (num === '4' || num === 4) {
    return '<i style="color:#E82D27;border-radius:50%;" class="fa-regular fa-circle priority4"></i>';
  }
};

const cat = function(category) {
  if (category === 'To Read') {
    return '📚';
  }

  if (category === 'To Watch') {
    return '📺';
  }

  if (category === 'To Buy') {
    return '🛒';
  }

  if (category === 'To Eat') {
    return '🍎';
  }
};

const createTaskElement = function(data) {
  let priority = prioritize(data.priority);
  let category = cat(data.category);
  let $task = $(`<li class="task">
    <label for="${data.id}">
      <div id="priority">${priority}    </div}
      <div id="duedate">${formatDate(data.due_date)}   </div>
      <input onclick="updateStatus(this)" type="checkbox" id="${data.id}" ${data.completed}>
      <p class="cat">${category}</p>
      <p class="${data.completed}">${data.name}</p>
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



