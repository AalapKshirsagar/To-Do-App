document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText);

    saveTask(taskText);

    input.value = "";
}

function createTaskElement(text) {
    const ul = document.getElementById("taskList");

    const li = document.createElement("li");
    li.textContent = text;

    // Mark task completed on click
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateSavedTasks();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent marking as completed when deleting
        li.remove();
        updateSavedTasks();
    });

    li.appendChild(delBtn);
    ul.appendChild(li);
}

function saveTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateSavedTasks() {
    const items = document.querySelectorAll("li");
    let tasks = [];

    items.forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text);

        const listItems = document.querySelectorAll("li");
        const lastItem = listItems[listItems.length - 1];

        if (task.completed) {
            lastItem.classList.add("completed");
        }
    });
}
