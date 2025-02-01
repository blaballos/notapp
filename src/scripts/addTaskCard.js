document.addEventListener("DOMContentLoaded", () => {
    const columns = {
        toDo: document.querySelector('#toDo .container'),
        inProgress: document.querySelector('#inProgress .container'),
        inReview: document.querySelector('#inReview .container'),
        completed: document.querySelector('#completed .container')
    };

    const input_title = document.querySelector('#titleTask');
    const input_description = document.querySelector('#descriptionTask');
    const addTaskButton = document.querySelector('#addTask');
    const alertSpanTitle = document.getElementById('alert-span-title');
    const alertSpanDescription = document.getElementById('alert-span-description');

    let currentColumn = "toDo"; 
    
    alertSpanTitle.style.display = 'none';
    alertSpanDescription.style.display = 'none';

    document.querySelectorAll("[data-modal-toggle='crud-modal']").forEach(button => {
        button.addEventListener("click", function () {
            currentColumn = this.getAttribute("data-colum") || "toDo";
        });
    });
    
    const createCard = (title, description) => {
        const card = document.createElement('div');
        card.classList.add('task-card', "mb-4");
        card.setAttribute('draggable', 'true');
        card.id = `task-${Date.now()}`;

        card.innerHTML = `
            <article class="bg-transparent border border-gray-700 rounded-xl p-2 hover:cursor-grab">
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
        
        card.addEventListener('dragstart', e => {
            e.dataTransfer.setData("text/plain", card.id);
            console.log('drag start', card.id);
        });

        return card;
    };
    
    Object.values(columns).forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            console.log('drag over');
        });

        container.addEventListener('drop', e => {
            e.preventDefault();
            console.log('drop');

            const cardId = e.dataTransfer.getData("text/plain");
            const draggedCard = document.getElementById(cardId);

            if (draggedCard) {
                container.appendChild(draggedCard);
            }
        });
    });

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

        if (columns[currentColumn]) {
            columns[currentColumn].appendChild(cardCreate);
        } else {
            columns["toDo"].appendChild(cardCreate);
        }

        input_title.value = "";
        input_description.value = "";
    });
});
