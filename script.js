document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from LocalStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    // Add task to DOM
    function addTaskToDOM(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (isCompleted) {
            li.classList.add('completed');
        }
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'completeBtn';
        completeBtn.onclick = () => {
            li.classList.toggle('completed');
            updateTaskInStorage(taskText, li.classList.contains('completed'));
        };

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'removeBtn';
        removeBtn.onclick = () => {
            li.remove();
            removeTaskFromStorage(taskText);
        };

        li.appendChild(taskSpan);
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Save task to LocalStorage
    function saveTaskToStorage(taskText, isCompleted) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: isCompleted });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task in LocalStorage
    function updateTaskInStorage(taskText, isCompleted) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => 
            task.text === taskText ? { ...task, completed: isCompleted } : task
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from LocalStorage
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            saveTaskToStorage(taskText, false);
            taskInput.value = '';
        }
    });

    // Initial load
    loadTasks();
});
