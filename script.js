document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText = null, save = true) {
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            tasks.push(taskText);
            saveTasksToLocalStorage();
        }

        if (taskText === taskInput.value.trim()) {
            taskInput.value = "";
        }
    }
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        tasks = storedTasks.slice();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
