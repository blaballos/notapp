import { loadTasks } from "./storage.js";
import { insertTaskIntoColumn } from "./addTaskCard.js";

document.addEventListener("DOMContentLoaded", () => {
    loadTasks(insertTaskIntoColumn);
});
