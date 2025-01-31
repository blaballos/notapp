document.addEventListener("DOMContentLoaded", () => {
    // Selección de columnas
    const columns = {
        toDo: document.querySelector('#toDo .div-card'),
        inProgress: document.querySelector('#inProgress .div-card'),
        inReview: document.querySelector('#inReview .div-card'),
        completed: document.querySelector('#completed .div-card')
    };

    const input_title = document.querySelector('#titleTask');
    const input_description = document.querySelector('#descriptionTask');
    const addTaskButton = document.querySelector('#addTask');
    const alertSpanTitle = document.getElementById('alert-span-title');
    const alertSpanDescription = document.getElementById('alert-span-description');

    let currentColumn = "toDo"; // Variable para almacenar la columna actual

    // Ocultar alertas iniciales
    alertSpanTitle.style.display = 'none';
    alertSpanDescription.style.display = 'none';

    // Capturar el dataColum cuando se abre el modal
    document.querySelectorAll("[data-modal-toggle='crud-modal']").forEach(button => {
        button.addEventListener("click", function () {
            currentColumn = this.getAttribute("data-colum") || "toDo"; // Capturar la columna actual
        });
    });

    // Función para crear una tarjeta
    const createCard = (title, description) => {
        const card = document.createElement('div');
        card.classList.add("mb-4"); // Margen entre tareas (opcional)
        card.innerHTML = `
            <article class="bg-transparent border border-gray-700 rounded-xl p-2">
                <div class="w-full flex flex-col space-y-2">
                    <div class="flex justify-start border-b border-gray-700 p-2">
                        <h2 class="text-white text-md font-semibold">${title}</h2>
                    </div>
                    <div class="w-full p-2 space-y-2">
                        <p class="text-white text-sm font-medium mb-2">${description}</p>
                    </div>
                </div>
            </article>
        `;
        return card;
    };

    // Evento de clic para agregar una tarea
    addTaskButton.addEventListener('click', (e) => {
        e.preventDefault();

        const title = input_title.value.trim();
        const description = input_description.value.trim();

        if (title === "") {
            alertSpanTitle.style.display = 'inline-flex';
            return;
        } else {
            alertSpanTitle.style.display = 'none';
        }

        if (description === "") {
            alertSpanDescription.style.display = 'inline-flex';
            return;
        } else {
            alertSpanDescription.style.display = 'none';
        }

        const cardCreate = createCard(title, description);

        // Agregar la tarjeta a la columna correspondiente
        if (columns[currentColumn]) {
            columns[currentColumn].appendChild(cardCreate);
        } else {
            columns["toDo"].appendChild(cardCreate); // Fallback si algo sale mal
        }

        // Limpiar los campos después de agregar la tarea
        input_title.value = "";
        input_description.value = "";
    });
});
