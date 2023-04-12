// BUG FIX BRANCH

// QUERY SELECTORS

// Filter Form
var filterSelection = document.querySelector('#filter-selection');

// Add Task Form
var daySelection = document.querySelector('#day-selection');
var taskInput = document.querySelector('#task-input');
var addTaskButton = document.querySelector('#add-task-button');

// Day Containers
var taskDisplay = document.querySelector('main');
var dayContainers = {
  monday: document.querySelector('#monday-task-container'),
  tuesday: document.querySelector('#tuesday-task-container'),
  wednesday: document.querySelector('#wednesday-task-container'),
  thursday: document.querySelector('#thursday-task-container'),
  friday: document.querySelector('#friday-task-container')
}

// GLOBAL VARIABLES

var tasks = [];

// EVENT LISTENERS

window.addEventListener('load', displayTasks);

addTaskButton.addEventListener('click', addTask);

taskDisplay.addEventListener('click', function(event) {
  if(event.target.classList.contains('toggle-task-button')) {
    toggleTaskStatus(event);
  }
});

filterSelection.addEventListener('change', displayTasks);

// FUNCTIONS

// Create a new task:

function addTask() {
  var newTask = createTask(daySelection.value, taskInput.value);
  tasks.push(newTask);
  displayTasks();
  clearForm();
}

function createTask(day, description) {
  return {
    day,
    description,
    completed: false,
    id: Date.now()
  }
}

function clearForm() {
  taskInput.value = '';
}

// Complete a task:

function toggleTaskStatus(e) {
  var selectedCard = e.target.closest('section')

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == selectedCard.id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }

  displayTasks();
}

// View tasks:

function displayTasks() {
  clearTasks();
  renderTasks();
  renderNoTasksMessage();
}

function clearTasks() {
  dayContainers.monday.innerHTML = '';
  dayContainers.tuesday.innerHTML = '';
  dayContainers.wednesday.innerHTML = '';
  dayContainers.thursday.innerHTML = '';
  dayContainers.friday.innerHTML = '';
}

function renderTasks() {
  for (var i = 0; i < tasks.length; i++) {
    dayContainers[tasks[i].day].innerHTML += `
    <section class="task-card ${tasks[i].completed ? 'completed' : ''}" id="${tasks[i].id}">
      <p>${tasks[i].description}</p>
      <div class="button-container">
        <button type="button" class="toggle-task-button" name="complete-task-button">✔️</button>
      </div>
    </section>
  `
  }
}

// No Tasks Message

function renderNoTasksMessage() {
  var noTasksMessage = '<p class="no-tasks-message">No tasks today!</p>';
  var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  for (var i = 0; i < days.length; i++) {
    if (!checkForTasks(days[i])) {
      dayContainers[days[i]].innerHTML = noTasksMessage;
    }
  }
}

function checkForTasks(day) {
  var hasTasks = false;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].day === day) {
      hasTasks = true;
    }
  }
}