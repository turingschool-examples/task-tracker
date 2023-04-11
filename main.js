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

addTaskButton.addEventListener('click', addTask);
taskDisplay.addEventListener('click', function(event) {
  if(event.target.classList.contains('toggle-task-button')) {
    toggleTaskStatus(event);
  }
});

// FUNCTIONS

function addTask() {
  var newTask = createTask(daySelection.value, taskInput.value);
  tasks.push(newTask);
  console.log(tasks)
  displayTask(newTask);
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

function displayTask(newTask) {
  dayContainers[newTask.day].innerHTML += `
    <section class="task-card" id="${newTask.id}">
      <p>${taskInput.value}</p>
      <div class="button-container">
        <button type="button" class="toggle-task-button" name="complete-task-button">✔️</button>
      </div>
    </section>
  `
}

function clearForm() {
  taskInput.value = '';
}

function toggleTaskStatus(e) {
  var selectedCard = e.target.closest('section')

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == selectedCard.id) {
      tasks[i].completed = !tasks[i].completed;
      selectedCard.classList.toggle('completed');
    }
  }
}