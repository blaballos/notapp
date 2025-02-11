document.addEventListener("DOMContentLoaded", () => {
    // Funciones de almacenamiento
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll(".task-card").forEach(card => {
            tasks.push({
                id: card.id,
                title: card.querySelector("h2").innerText,
                description: card.querySelector("p").innerText,
                priority: card.querySelector("span").innerText,
                column: card.closest(".container")?.id || "toDo"
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach(insertTaskIntoColumn);
    };

    // Función para insertar una tarea en una columna
    function insertTaskIntoColumn(task) {
        const column = document.getElementById(task.column);
        if (!column) return;

        const taskElement = document.createElement("div");
        taskElement.classList.add("task-card", "rounded-lg", "bg-transparent", "border", "border-gray-700", "rounded-xl", "hover:cursor-grab");
        taskElement.setAttribute("draggable", "true");
        taskElement.id = task.id;

        const priorityColors = {
            'ALTA': 'text-red-500 border-red-500',
            'MEDIA': 'text-yellow-500 border-yellow-500',
            'BAJA': 'text-green-500 border-green-500',
        }

        const priorityClass = priorityColors[task.priority] || 'text-blue-500 border-blue-500';

        taskElement.innerHTML = `
            <div class="w-full flex flex-col space-y-2">
                <div class="flex justify-between items-center border-b border-gray-700 p-2">
                    <h2 class="text-white text-md font-semibold">${task.title}</h2>
                    <button class="delete-card text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-lg font-bold w-8 h-8 ms-auto inline-flex justify-center items-center transition duration-200">x</button>
                </div>
                <div class="w-full p-2 space-y-2">
                    <p class="text-white text-sm font-medium mb-2">${task.description}</p>
                    <span class="${priorityClass} p-1 rounded-lg border text-xs font-bold">${task.priority}</span>
                </div>
            </div>
        `;

        taskElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", taskElement.id);
        });

        taskElement.querySelector(".delete-card").addEventListener("click", () => {
            taskElement.remove();
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        column.querySelector(".container").appendChild(taskElement);
    }

    // Manejo de columnas y drag and drop
    const columns = document.querySelectorAll(".container");
    columns.forEach(container => {
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

    // Manejo del formulario para agregar tareas
    const addTaskButton = document.getElementById('addTask');
    addTaskButton.addEventListener("click", (e) => {
        e.preventDefault();
        const title = document.getElementById("titleTask").value.trim();
        const description = document.getElementById("descriptionTask").value.trim();
        const priority = document.getElementById("priority").value;
        if (!title || !description) {
            document.getElementById('alert-span').style.display = 'inline-flex';
            return;
        }
        const newTask = {
            id: `task-${Date.now()}`,
            title,
            description,
            priority,
            column: "toDo"
        };
        insertTaskIntoColumn(newTask);
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("titleTask").value = "";
        document.getElementById("descriptionTask").value = "";
    });

    loadTasks();
});