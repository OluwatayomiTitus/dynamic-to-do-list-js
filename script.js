// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array of tasks (strings)
    let tasks = [];

    // Save current tasks array to Local Storage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task list item in the DOM for a given taskText
    // If save === true, the task will be appended to tasks[] and saved to localStorage
    function addTask(taskText = null, save = true) {
        // If no taskText provided, read from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty task
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create li and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button and add required class using classList.add()
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // When remove button clicked:
        removeBtn.onclick = function () {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }
            // Remove the first matching occurrence from tasks array and update localStorage
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
            }
        };

        // Append the remove button to the li and append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If instructed to save, update in-memory array and Local Storage
        if (save) {
            tasks.push(taskText);
            saveTasksToLocalStorage();
        }

        // Clear input if it came from the input field
        if (taskText === taskInput.value.trim()) {
            taskInput.value = "";
        }
    }

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Initialize in-memory tasks array
        tasks = storedTasks.slice();
        // Render each stored task without re-saving
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Event listeners
    addButton.addEventListener('click', function () {
        addTask(); // reads input and saves
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize on load
    loadTasks();
});
