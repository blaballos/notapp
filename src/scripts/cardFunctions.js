document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");
    const addCardButton = document.getElementById("add-card-button");

    const createCard = () => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <article class="w-full">
                <div class="w-full bg-[#14202E] py-2 rounded-xl max-w-[272px] flex flex-col items-start px-2">
                    <div class="w-full flex items-center justify-between mb-2">
                        <textarea name="titleCard" id="titleCard" class="bg-transparent text-white text-md font-semibold rounded-lg px-2">Nombre de la lista...</textarea>
                    </div>
                    <div class="w-full">
                        <form class="flex justify-between items-center">
                            <input type="text" placeholder="Agregar tarea..." class="input-item bg-[#14202E] text-gray-400 outline-none px-2">
                            <button class="add-item-button w-8 h-8 flex items-center justify-center bg-[#14202E] text-white text-md p-2 rounded-xl hover:bg-gray-400/50 transition duration-200">+</button>
                        </form>
                    </div>
                    <div class="w-full">
                        <ul class="items-list w-full">

                        </ul>
                    </div>
                </div>
            </article>
        `;

        const input = card.querySelector(".input-item");
        const addItemButton = card.querySelector(".add-item-button");
        const itemsList = card.querySelector(".items-list");

        addItemButton.addEventListener("click", (e) => {
            e.preventDefault();
            const text = input.value;

            if (text !== "") {
                addItem(itemsList, text);
                input.value = "";
            }
        });

        card.addEventListener("dragover", (event) => event.preventDefault());

        card.addEventListener("drop", (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData("elemento");
            const item = document.getElementById(data);
            itemsList.appendChild(item);
        });

        container.appendChild(card);
    };

    const addItem = (list, text, id = null) => {
        const li = document.createElement("li");
        li.className = "item";
        li.className = 'w-full bg-[#88A9C3] flex justify-between items-center rounded-lg mt-2 border-2 border-transparent hover:cursor-pointer hover:border-white text-gray-950 text-md font-medium px-2'
        
        const p = document.createElement("p");
        p.textContent = text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.className = "delete-item-button w-8 h-8 flex items-center justify-center text-white text-md p-2 rounded-xl hover:text-[#14202E] transition duration-200";
        deleteButton.addEventListener("click", () => {
            list.removeChild(li);
        });

        if (!id) {
            const uniqueId = `item-${Date.now()}`;
            li.setAttribute("id", uniqueId);
        } else {
            li.setAttribute("id", id);
        }

        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("elemento", event.target.id);
        });

        li.appendChild(p);
        li.appendChild(deleteButton);
        list.appendChild(li);
    };

    addCardButton.addEventListener("click", () => createCard());
});