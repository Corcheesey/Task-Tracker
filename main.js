const inputField = document.getElementById("input-text");
const inputBtn = document.getElementById("input-btn");
const taskContainer = document.getElementById("task-container");

const taskArray = [];

function createTask() {
    const input = inputField.value.trim();
    // If input is not blank, assign unique taskID, push new task element to taskArray, and re-render tasks
    if (input != "") {
        taskArray.push({
            name: input, 
            completed: false
        }); 
    } else { // If input is blank, alert the user
        alert("Invalid Input: Text field cannot be black");
    }
    // Reset input field value
    inputField.value = "";
    renderTasks();
}

// Click input button when ENTER key is pressed
inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        inputBtn.click();
    }
});

// Delete a task
function deleteTask(index) {
    taskArray.splice(index, 1);
    renderTasks();
}

// Toggle task completion status
function toggleTaskStatus(index) {
    taskArray[index].completed = !taskArray[index].completed;
    renderTasks();
}

function renderTasks() {
    // Clear the DOM of all existing tasks
    taskContainer.innerHTML = "";

    // Sorting tasks from incomplete to complete
    const sortedTasks = taskArray.slice().sort((a, b) => a.completed - b.completed);

    // Loop through taskArray and re-create each task
    sortedTasks.forEach((task) => {
        // Create task item div where the checkbox, task text, and button will be placed
        const taskItem = document.createElement("div");
        taskItem.setAttribute("class", "task-item");

        // Create checkbox and set type and id attributes
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "checkbox");
        checkbox.setAttribute("class", "checkbox");
        checkbox.checked = task.completed;
        // Checkbox logic
        checkbox.addEventListener("change", () => {
            toggleTaskStatus(taskArray.indexOf(task));
            // Change task text style to strikethrough, grey, and status to complete
            if (task.completed) {
                taskText.classList.add("completed");          
            } else { // Reset task text style to default and status back to incomplete
                taskText.classList.remove("completed");
            }           
        });
        
        // Create task text and set id attribute, assign user input to task text.
        const taskText = document.createElement("p");
        taskText.setAttribute("class", "task-description");
        taskText.textContent = task.name;
        if (task.completed) {
            taskText.classList.add("completed");
        } else {
            taskText.classList.remove("completed");
        }
        
        // Create button, span inside of button, and set id and class attributes, respectively
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete-btn");
        const span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-trash");
        // Delete button logic
        deleteBtn.addEventListener("click", () => {
            deleteTask(taskArray.indexOf(task));      
        });

        // Append items
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        deleteBtn.appendChild(span);
        taskItem.appendChild(deleteBtn);

        taskContainer.appendChild(taskItem);      
    });
}