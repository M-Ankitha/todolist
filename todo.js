// creating all Elements
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('input');
const addButton = document.getElementsByClassName('add');
const taskCounter = document.getElementById('total_task');

// adding task to Dom 
function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <i class="fa-regular fa-trash-can delete" data-id="${task.id}"></i>
    `;
    taskList.append(li);
}
// render the lists
function renderList(){
    taskList.innerHTML="";
    if(tasks.length==0){
        showNotification('All tasks are deleted successfully')
    }
    for(let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    taskCounter.innerHTML = tasks.length;
}
// adding task to  list
function addTask(task){
    
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added Successfully!');
        return;
    } 
    showNotification('Task cannot be added!');
}
// markAsCompleted function
function markAsCompleted(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId
    });
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        return;
    }
}
// show notification function
function showNotification(text){
    alert(text);
}
// delete function
function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })
    tasks = newTasks;
    renderList();
   
}

// on click add function
function clickToAdd(){
    var inputValue = addTaskInput.value;
    if(inputValue==''){
        showNotification("Please enter something!");
        return;
    }
    const task ={
        text:inputValue,
        id: Date.now().toString(),
        done: false
    }
    addTask(task);
    addTaskInput.value='';
    
}
// click event handeler 
function handledClickListener(e){
    const target = e.target;
    if(target.className =='fa-solid fa-circle-plus add'){
        clickToAdd();
    }
    if(target.className === 'fa-regular fa-trash-can delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        showNotification('Task deleted Successfully!');
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        markAsCompleted(taskId);
        return;
    }else if(target.className ==='completedAll'){
        if(tasks.length == 0){
            showNotification('Sorry! no tasks available');
            return;
        }
        for(let i = 0; i < tasks.length; i++){
            tasks[i].done = true
        }
        renderList();
        showNotification('Congratulations! you have succesfully completed all tasks');

    }else if(target.className === 'uncompleted All'){
        if(tasks.length == 0){
            showNotification('Sorry! no tasks available');
            return;
        }
        for(let i = 0; i < tasks.length; i++){
            tasks[i].done = false
        }
        renderList();
        showNotification('All tasks uncompleted')

    }else if(target.className ==='deleteAll'){
        if(tasks.length == 0){
            showNotification('Sorry! no tasks available or you may have deleted.');
            return;
        }
        const newTasks =[]
        tasks= newTasks;
        renderList();
    }
}
// event listener 
document.addEventListener('click',handledClickListener);
