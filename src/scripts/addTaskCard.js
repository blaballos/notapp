import { saveTasks } from "./storage";

function insertTaskIntoColumn(task) {
    const column = document.getElementById(task.column);
    if (!column) return;

    const taskElement = document.createElement("div");
    taskElement.classList.add("task-card", "rounded-lg", "bg-transparent", "border", "border-gray-700", "rounded-xl", "hover:cursor-grab");
    taskElement.setAttribute("draggable", "true");
    taskElement.id = task.id;

    const priorityColor = task.priority === "ALTA" ? "red" : task.priority === "MEDIA" ? "yellow" : "green";
    taskElement.innerHTML = `
        <div class="w-full flex flex-col space-y-2">
            <div class="flex justify-between items-center border-b border-gray-700 p-2">
                <h2 class="text-white text-md font-semibold">${task.title}</h2>
                <button class="delete-card text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-lg font-bold w-8 h-8 ms-auto inline-flex justify-center items-center transition duration-200">x</button>
            </div>
            <div class="w-full p-2 space-y-2">
                <p class="text-white text-sm font-medium mb-2">${task.description}</p>
                <span class="text-${priorityColor}-500 border-${priorityColor}-500 p-1 rounded-lg border text-xs font-bold">${task.priority}</span>
            </div>
        </div>
    `;

    taskElement.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", taskElement.id);
    });

    // Agregar funcionalidad para eliminar la tarjeta
    taskElement.querySelector(".delete-card").addEventListener("click", () => {
        taskElement.remove();
        
        // Eliminar la tarea de localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    column.querySelector(".container").appendChild(taskElement);
}

const columns = {
    toDo: document.querySelector("#toDo .container"),
    inProgress: document.querySelector("#inProgress .container"),
    inReview: document.querySelector("#inReview .container"),
    completed: document.querySelector("#completed .container"),
};

let currentColumn = "toDo";

const alertSpan = document.getElementById('alert-span');

document.querySelectorAll("[data-modal-toggle='crud-modal']").forEach((button) => {
    button.addEventListener("click", () => {
        currentColumn = button.getAttribute("data-column") || "toDo";
    });
});

Object.values(columns).forEach((container) => {
    container.addEventListener("dragover", (e) => e.preventDefault());

    container.addEventListener("drop", (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("text/plain");
        const draggedCard = document.getElementById(cardId);

        if (draggedCard) {
            container.appendChild(draggedCard);
            saveTasks();
        }
    });
});

const addTaskButton = document.getElementById('addTask');
const titleInput = document.getElementById("titleTask");
const descriptionInput = document.getElementById("descriptionTask");

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();

    alertSpan.style.display = 'none';

    if (!titleInput || !descriptionInput) {
        console.error("Error: Elementos del formulario no encontrados.");
        return;
    }

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = document.getElementById("priority").value;

    if (!title || !description) {
        alertSpan.style.display = 'inline-flex';
        return;
    } else {
        const newTask = {
            id: `task-${Date.now()}`,
            title,
            description,
            priority,
            column: currentColumn
        };
    
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    
        insertTaskIntoColumn(newTask);
    
        titleInput.value = "";
        descriptionInput.value = "";
    }
});

export { insertTaskIntoColumn };
