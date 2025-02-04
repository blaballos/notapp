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

    console.log("Saving tasks:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
};

const loadTasks = (insertTaskIntoColumn) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
        insertTaskIntoColumn(task);
    });
};

export { saveTasks, loadTasks };
