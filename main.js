// NEW FEATURE BRANCH

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

var tasks = {
  all: [],
  filtered: []
}

// EVENT LISTENERS

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
  var newTask = createTask(daySelection.value, taskInput.value, Date.now());
  tasks.all.push(newTask);
  displayTasks();
  clearForm();
}

function createTask(day, description, id) {
  return {
    day,
    description,
    id,
    completed: false,
  }
}

function clearForm() {
  taskInput.value = '';
}

// Complete a task:

function toggleTaskStatus(e) {
  var selectedCard = e.target.closest('section')

  for (var i = 0; i < tasks.all.length; i++) {
    if (tasks.all[i].id == selectedCard.id) {
      tasks.all[i].completed = !tasks.all[i].completed;
    }
  }

  displayTasks();
}

// View tasks:

function displayTasks() {
  clearTasks();
  updateFilteredTasks();
  renderTasks();
}

function clearTasks() {
  dayContainers.monday.innerHTML = '';
  dayContainers.tuesday.innerHTML = '';
  dayContainers.wednesday.innerHTML = '';
  dayContainers.thursday.innerHTML = '';
  dayContainers.friday.innerHTML = '';
}

function renderTasks() {
  for (var i = 0; i < tasks.filtered.length; i++) {
    var currentTask = tasks.filtered[i];

    dayContainers[currentTask.day].innerHTML += `
    <section class="task-card ${currentTask.completed ? 'completed' : ''}" id="${currentTask.id}">
      <p>${currentTask.description}</p>
      <div class="button-container">
        <button type="button" class="delete-task-button" name="delete-task-button">❌</button>
        <button type="button" class="toggle-task-button" name="complete-task-button">✔️</button>
      </div>
    </section>
  `
  }
}

// Filter tasks:

function updateFilteredTasks() {
  if (filterSelection.value === 'all') {
    tasks.filtered = tasks.all;
  } else if (filterSelection.value === 'completed') {
    tasks.filtered = filterTasks(true);
  } else if (filterSelection.value === 'incomplete') {
    tasks.filtered = filterTasks(false);
  }
}

function filterTasks(condition) {
  var filteredTasks = [];
  
  for (var i = 0; i < tasks.all.length; i++) {
    if (tasks.all[i].completed === condition) {
      filteredTasks.push(tasks.all[i]);
    }
  }

  return filteredTasks;
}

// Delete tasks: