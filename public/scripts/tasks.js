// Client facing scripts here
$(document).ready(function() {

  const createTaskElement = function(data) {
    let $task = $(`<article class="task-article">
    <ul>
    <li>Task ID ${data.id}</li>
    <li>Task Name ${data.name}</li>
    <li>Task Category ${data.category}</li>
    <li>Task Due Date ${data.due_date}</li>
    <li>Task Completed ${data.completed}</li>
    <li>Task Priority ${data.priority}</li>
    <li>Task Users ID ${data.users_id}</li>
</ul>
  </article>`);

    return $task;
  };

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



  const renderTasks = function (tasks) {
    // $(`.task-box`).empty();
    for (task of tasks) {
      const $taskElement = createTaskElement(task);
      $(`.task-box`).prepend($taskElement)
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


Object.data
