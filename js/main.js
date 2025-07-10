const btn = document.querySelector('button');
const input = document.querySelector('input');
const taskArea = document.querySelector('.tasks-area-wrap');
const taskContainer = document.querySelector('.task-container');
const emptyArea = document.querySelector('.whithout-tasks');

const tasksCounter = document.querySelector('.all-tasks-info-count');
const doneTasks = document.querySelector('.done-tasks-info-count');

const allTasksFilter = document.querySelector('.all-tasks-filter')
const activeTasksFilter = document.querySelector('.active-tasks-filter')
const doneTasksFilter = document.querySelector('.done-tasks-filter')


allTasksFilter.addEventListener('click', showAll)
activeTasksFilter.addEventListener('click', isActive)
doneTasksFilter.addEventListener('click', isDone)

function showAll() {
    if (!allTasksFilter.classList.contains('choosen')) {
        allTasksFilter.classList.add('choosen')
    }
    activeTasksFilter.classList.remove('choosen')
    doneTasksFilter.classList.remove('choosen')
    const allTasks = Array.from(taskContainer.querySelectorAll('.task p'))
    allTasks.forEach(el => el.parentElement.style.display = 'block')
}

function isActive() {
    activeTasksFilter.classList.add('choosen')
    allTasksFilter.classList.remove('choosen')
    doneTasksFilter.classList.remove('choosen')

    const allTasks = Array.from(taskContainer.querySelectorAll('.task p'))
    allTasks.forEach(el => {
        if (el.classList.contains('checked')) {
            el.parentElement.style.display = 'none'
        }else{
            el.parentElement.style.display = 'block'
        }
    })
}

function isDone() {
    doneTasksFilter.classList.add('choosen')
    allTasksFilter.classList.remove('choosen')
    activeTasksFilter.classList.remove('choosen')
    const allTasks = Array.from(taskContainer.querySelectorAll('.task p'))
    allTasks.forEach(el => {
        if (!el.classList.contains('checked')) {
            el.parentElement.style.display = 'none'
        }else{
            el.parentElement.style.display = 'block'
        }
    })
}


btn.addEventListener('click', addTask);

function updatedTasksCounter() {
    tasksCounter.textContent = taskContainer.children.length;
}

function updatedDoneTasksCounter() {
    const checkedTasks = taskContainer.querySelectorAll('.checked').length;
    doneTasks.textContent = checkedTasks;
    localStorage.setItem('doneCount', checkedTasks);

    if (taskContainer.children.length === 0) {
        doneTasks.textContent = '0';
        localStorage.setItem('doneCount', 0);
    }
}

function addTask(e) {
    e.preventDefault();
    if (!input.value.trim()) {
        alert('Напишите задачу');
        return;
    }else if(doneTasksFilter.classList.contains('choosen')){
        return
    }

    emptyArea.style.display = 'none';

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
        <p>${input.value}</p>
        <img src="assets/trash.svg" alt="Иконка корзины">
    `;
    taskContainer.appendChild(task);
    input.value = '';
    saveData();
    updatedTasksCounter();
}

taskContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') {
        e.target.classList.toggle('checked');
        saveData();
        updatedDoneTasksCounter();
    } else if (e.target.tagName === 'IMG') {
        if (e.target.parentElement.querySelector('p').classList.contains('checked')) {
            doneTasks.textContent = Math.max(0, doneTasks.textContent - 1);
            localStorage.setItem('doneCount', doneTasks.textContent);
        }
        e.target.parentElement.remove();
        saveData();
        updatedTasksCounter();
        updatedDoneTasksCounter();

        if (taskContainer.children.length === 0) {
            emptyArea.style.display = 'block';
        }
    }
});

function saveData() {
    localStorage.setItem('data', taskContainer.innerHTML);
}

function showData() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        taskContainer.innerHTML = savedData;

        if (taskContainer.children.length > 0) {
            emptyArea.style.display = 'none';
        }
    }
    updatedTasksCounter();

    const savedDoneCount = localStorage.getItem('doneCount');
    doneTasks.textContent = savedDoneCount || 0;
}

showData();



function saveData() {
    localStorage.setItem('data', taskContainer.innerHTML);
}

function showData() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        taskContainer.innerHTML = savedData;

        if (taskContainer.children.length > 0) {
            emptyArea.style.display = 'none';
        }
    }
    updatedTasksCounter()

    const savedDoneCount = localStorage.getItem('doneCount')
    doneTasks.textContent = savedDoneCount || 0
}

showData();
