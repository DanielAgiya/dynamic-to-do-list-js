const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
    }
  });

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
      }
    }
  });
});

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(taskText => addTask(taskText, false));
}

function addTask(taskText, save = true) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const removeButton = document.createElement('button');
  removeButton.textContent = "Remove";
  removeButton.classList.add('remove-btn');

  removeButton.onclick = function () {
    taskList.removeChild(li);
    removeFromStorage(taskText);
  };

  li.appendChild(removeButton);
  taskList.appendChild(li);
  taskInput.value = "";

  if (save) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }
}

function removeFromStorage(taskText) {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks = storedTasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
