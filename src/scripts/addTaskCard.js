
import { saveTasks } from "./storage";

function insertTaskIntoColumn(task) {
    const column = document.getElementById(task.column);
    if (!column) return;

    const taskElement = document.createElement("div");
    taskElement.classList.add("task-card", "p-4", "bg-gray-800", "rounded-lg");
    taskElement.setAttribute("draggable", "true");
    taskElement.id = task.id;
    taskElement.innerHTML = `        <article class="bg-transparent border border-gray-700 rounded-xl p-2 hover:cursor-grab">
            <div class="w-full flex flex-col space-y-2">
                <div class="flex justify-start border-b border-gray-700 p-2">
                    <h2 class="text-white text-md font-semibold">${task.title}</h2>
                </div>
                <div class="w-full p-2 space-y-2">
                    <p class="text-white text-sm font-medium mb-2">${task.description}</p>
                    <span class="text-xs font-bold text-${task.priority === "ALTA" ? "red" : task.priority === "MEDIA" ? "yellow" : "green"}-500 p-1 rounded-lg border">${task.priority}</span>
                </div>
            </div>
        </article>
    `;

    taskElement.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", taskElement.id);
    });

    column.querySelector(".container").appendChild(taskElement);

}

// Identificamos las columnas del tablero
const columns = {
    toDo: document.querySelector("#toDo .container"),
    inProgress: document.querySelector("#inProgress .container"),
    inReview: document.querySelector("#inReview .container"),
    completed: document.querySelector("#completed .container"),
};

// Variable para saber en qué columna agregar la tarjeta
let currentColumn = "toDo";

const alertSpanTitle = document.getElementById('alert-span-title')
const alertSpanDescription = document.getElementById('alert-span-description')

// Ocultamos las alertas de validación
alertSpanTitle.style.display = "none";
alertSpanDescription.style.display = "none";

// Capturamos la columna actual cuando se abre el modal
document.querySelectorAll("[data-modal-toggle='crud-modal']").forEach((button) => {
    button.addEventListener("click", function () {
        currentColumn = this.getAttribute("data-column") || "toDo";
    });
});

// Habilitamos el arrastre de las tarjetas
Object.values(columns).forEach((container) => {
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    container.addEventListener("drop", (e) => {
        e.preventDefault();

        const cardId = e.dataTransfer.getData("text/plain");
        const draggedCard = document.getElementById(cardId);

        if (draggedCard) {
            container.appendChild(draggedCard);
            saveTasks(); // Guardamos la nueva ubicación en localStorage
        }
    });
});

const addTaskButton = document.getElementById('addTask')

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("titleTask");
    const descriptionInput = document.getElementById("descriptionTask");

    if (!titleInput || !descriptionInput) {
        console.error("Error: Elementos del formulario no encontrados.");
        return;
    }

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = document.getElementById("priority").value;
    const column = document.querySelector("[data-modal-toggle='crud-modal']").getAttribute("data-column") || "toDo";

    if (title === "") {
        alertSpanTitle.style.display = "inline-flex";
        return;
    } else {
        alertSpanTitle.style.display = "none";
    }
    
    if (description === "") {
        alertSpanDescription.style.display = "inline-flex";
        return;
    } else {
        alertSpanDescription.style.display = "none";
    }

    const newTask = {
        id: `task-${Date.now()}`,
        title,
        description,
        priority,
        column
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    insertTaskIntoColumn(newTask);

    titleInput.value = "";
    descriptionInput.value = "";
});

export { insertTaskIntoColumn };