const addTaskInput = document.getElementById('addtask') // ô input

const allStatus = document.querySelector('[name="all"]'); // nút All
const activeStatus = document.querySelector('[name="active"]'); // nút Active
const completedStatus = document.querySelector('[name="completed"]'); // nút Completed


const allBlock = document.querySelector('#all') // list task all
const activeBlock = document.getElementById('active') // list task acvie
const completedBlock = document.getElementById('completed') //list task completed

let allTaskListItems = []; // các task được thêm
let completedTaskListItems = [];
let activeTaskListItems = [];

//hàm handle class 
function handleClass(element, className) {
    if (!element.classList.contains(className))
        element.classList.add(className);
    else element.classList.remove(className);
}

//hàm xoá class 
function removeClass(element, className) {
    if (element.classList.contains(className))
        element.classList.remove(className);
}

// lắng nghe sự kiện enter 
let id = 0;
addTaskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addNewTask(e.target.value, id);
        id++;
        e.target.value = '';
    }
});


// hàm thêm task mới
function addNewTask(newtask, id) {
    if (newtask) {
        let html = ''
        let newTask = document.createElement('li')
        newTask.classList.add('taskMenu')
        html += `
            <div class="taskItem">
                <input type="checkbox" name="newtask" id="${id}" class="checkbox">
                <label for="${id}" class="label">${newtask}</label>
            </div>
            <div class="closeBtn">Xoá</div>
        `
        newTask.innerHTML = html;
        allBlock.appendChild(newTask);
        allTaskListItems.push(newTask);
        activeTaskListItems.push(newTask);
    }
}


// handle sự kiện check
function handleCheck(block) {
    block.onchange = function (e) {
        let checkedBlock = e.target.parentElement.parentElement;
        let index = checkedBlock.querySelector('.checkbox').getAttribute('id');
        if (e.target.closest('[type="checkbox"]').checked == true) {
            completedTaskListItems.push(checkedBlock);
            activeTaskListItems.splice(activeTaskListItems.indexOf(checkedBlock), 1);
        }
        else {
            completedTaskListItems.splice(completedTaskListItems.indexOf(checkedBlock), 1);
            activeTaskListItems.push(checkedBlock);
        }
    }
    // nhận được:
    //  +) all list task : allTaskListItems
    //  +) active list task: activeTaskListItems
    //  +) completed lis task: completedTaskListItems
}

handleCheck(allBlock);
handleCheck(activeBlock);
handleCheck(completedBlock);

//hàm xoá task
function handleRemove(block) {
    block.onclick = function (e) {
        let task = e.target.parentElement;
        if (e.target.closest('.closeBtn')) {
            allTaskListItems.splice(allTaskListItems.indexOf(task), 1);
            removeTask(block, task);
            if (activeTaskListItems.includes(task)) {
                activeTaskListItems.splice(activeTaskListItems.indexOf(task), 1);
            }
            if (completedTaskListItems.includes(task)) {
                completedTaskListItems.splice(completedTaskListItems.indexOf(task), 1);
            }
        }
    }
}
handleRemove(allBlock);

function createNewList(block, arrays) {
    for (var array of arrays) {
        if (array)
            block.appendChild(array);
    }
}
function removeTask(block, task) {
    if (task)
        block.removeChild(task);
}

function hideBlock(block) {
    block.style.display = 'none';
}

function showBlock(block) {
    block.style.display = 'block';
}

// function removeSelectorChildElement(element, classSelector) {
//     let childElements = element.querySelectorAll(classSelector)
//     for (let childElement of childElements) {
//         element.remove(childElement);
//     }
// }

// function disableClick(block) {
//     removeSelectorChildElement (block)
// }
//click vào all
allStatus.onclick = function (e) {
    handleClass(allStatus, 'actived');
    removeClass(activeStatus, 'actived');
    removeClass(completedStatus, 'actived');
    hideBlock(completedBlock);
    hideBlock(activeBlock);
    showBlock(allBlock);
    createNewList(allBlock, allTaskListItems);
}


//click vào active
activeStatus.onclick = function (e) {
    handleClass(activeStatus, 'actived');
    removeClass(allStatus, 'actived');
    removeClass(completedStatus, 'actived');
    hideBlock(completedBlock);
    hideBlock(allBlock);
    showBlock(activeBlock);
    createNewList(activeBlock, activeTaskListItems);
}


//click vào completed
completedStatus.onclick = function (e) {
    handleClass(completedStatus, 'actived');
    removeClass(allStatus, 'actived');
    removeClass(activeStatus, 'actived');
    hideBlock(allBlock);
    hideBlock(activeBlock);
    showBlock(completedBlock);
    createNewList(completedBlock, completedTaskListItems);
}












