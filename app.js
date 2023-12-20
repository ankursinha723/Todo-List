let addBtn = document.querySelector('#add');
let taskInput = document.querySelector('#task-input');
let deadlineInput = document.querySelector('#deadline');
let allLists = document.querySelector('.all-lists');
let todoArr = [];
let count = document.querySelector('h3');
let message = document.querySelector('#message');
let cancelBtn = document.querySelector('#cancel');

message.classList.add('hide');

addBtn.addEventListener('click', function () {
    if (taskInput.value && deadlineInput.value) {
        let currTodo = { taskId: '', taskCompleted: false, taskName: '', taskTime: '', taskDeadline: '', taskStatus: '' };

        let time = new Date();
        let date = time.getDate();
        let month = time.getMonth();
        let year = time.getFullYear();

        let todayDate = `${year}-${month + 1}-${date}`;
        let taskId = time.getTime();

        currTodo.taskId = taskId;
        if(taskInput.value.length > 30) {
            taskInput.value = taskInput.value.substring(0, 30);
            taskInput.value += '...';

            currTodo.taskName = taskInput.value;
        } else {
            currTodo.taskName = taskInput.value;
        }
        currTodo.taskTime = `Added on : ${todayDate}`;
        currTodo.taskDeadline = `Deadline : ${deadlineInput.value}`;
        currTodo.taskStatus = `STATUS : Pending`;

        todoArr.push(currTodo);
        count.innerText = `Count : ${todoArr.length}`;
        getAllLists();

        message.innerText = 'Task added successfully';
        showMsg();
        taskInput.value = '';
        deadlineInput.value = '';
    } else {
        message.innerText = 'Both fields required';
        showMsg();
    }
})

cancelBtn.addEventListener('click', function () {
    taskInput.value = '';
    deadlineInput.value = '';
})

function showMsg() {
    message.classList.remove('hide');

    setTimeout(function () {
        message.classList.add('hide');
    }, 2000);
}

function getAllLists() {
    allLists.innerText = '';

    todoArr.map(todo => {

        let listData = document.createElement('div');
        listData.classList.add('list-data');

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todo.taskCompleted;

        let listTask = document.createElement('div');
        listTask.classList.add('list-task');

        let taskId = document.createElement('div');
        taskId.classList.add('task-id');
        taskId.innerText = todo.taskId;

        let taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerText = todo.taskName;

        let taskTime = document.createElement('div');
        taskTime.classList.add('task-time');

        let currTime = document.createElement('div');
        currTime.classList.add('curr-time');
        currTime.innerText = todo.taskTime;

        let deadLine = document.createElement('div');
        deadLine.classList.add('deadline');
        deadLine.innerText = todo.taskDeadline;

        let listBtns = document.createElement('div');
        listBtns.classList.add('list-btns');

        let delBtn = document.createElement('button');
        delBtn.classList.add('del-btn');
        delBtn.innerText = 'Delete';

        let status = document.createElement('div');
        status.classList.add('status');
        status.innerText = todo.taskStatus;

        taskTime.appendChild(currTime);
        taskTime.appendChild(deadLine);

        listTask.appendChild(taskId);
        listTask.appendChild(taskName);
        listTask.appendChild(taskTime);

        listBtns.appendChild(delBtn);
        listBtns.appendChild(status);

        listData.appendChild(checkbox);
        listData.appendChild(listTask);
        listData.appendChild(listBtns);

        allLists.appendChild(listData);
    })

    let allListData = document.querySelectorAll('.list-data');

    for (let listData of allListData) {
        listData.addEventListener('click', function (event) {
            let deletingId = this.children[1].children[0].innerText;
            let statusIdx = todoArr.findIndex(x => x.taskId == deletingId);

            if (event.target.nodeName === 'INPUT') {
                if (this.children[0].checked) {
                    todoArr[statusIdx].taskCompleted = true;
                    todoArr[statusIdx].taskStatus = 'STATUS : Completed';
                    console.log(todoArr);
                    getAllLists();
                }
                if (!this.children[0].checked) {
                    todoArr[statusIdx].taskCompleted = false;
                    todoArr[statusIdx].taskStatus = 'STATUS : Pending';
                    console.log(todoArr);
                    getAllLists();
                }
            }

            if (event.target.nodeName === 'BUTTON') {
                let filteredArr = todoArr.filter(todoData => {
                    return todoData.taskId != deletingId;
                })

                todoArr = filteredArr;
                count.innerText = `Count : ${todoArr.length}`;
                message.innerText = 'Task deleted successfully';
                showMsg();
                getAllLists();
            }
        })
    }
}

if(todoArr.length == 0) {
    allLists.innerHTML = '<img src="https://img.lovepik.com/element/45004/1309.png_860.png" alt="Empty Logo" id="empty-logo" /> <br/> <h1>List is empty!</h1>'
} else {
    getAllLists();
}