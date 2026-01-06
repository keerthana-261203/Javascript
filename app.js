import { displayTable, validateForm } from "./table-utils.js";

const startDateError = document.getElementById("startDateError");
const endDateError = document.getElementById("endDateError");
const message = document.getElementById("message");

export function showMessage(text, type = "success") {
    message.innerText = text;
    message.classList.remove("hidden");
    message.classList.remove("text-red-500", "text-green-600");
    message.classList.add(type === "success" ? "text-green-600" : "text-red-500");

    setTimeout(() => {
        message.classList.add("hidden");
    }, 3000);
}


function handleSubmit(event) {
  event.preventDefault();
  // Clear previous messages
 startDateError.classList.add("hidden");
 endDateError.classList.add("hidden");
 message.classList.add("hidden");

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

 if (!validateForm(startDate, endDate)) return; // stop submission if invalid


  const stored = localStorage.getItem("tasks");
  let taskList = stored ? JSON.parse(stored) : [];

  const newTask = {
    id: Date.now(),
    startDate,
    endDate,
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  showMessage("Task successfully added");


  document.getElementById("dateForm").reset();
  renderTable();
}

export function renderTable() {
  const section = document.getElementById("pastTasks");
  const stored = localStorage.getItem("tasks");

  if (stored) {
    const taskList = JSON.parse(stored);
    displayTable(taskList);
  } else {
    taskList = [];
    const noData = document.createElement("div");
    noData.className = "text-center text-gray-400 py-10 text-xl font-medium";
    noData.innerText = "No Tasks Found";
    section.appendChild(noData);
  }
}




document.getElementById("dateForm").addEventListener("submit", handleSubmit);

document.addEventListener("DOMContentLoaded", renderTable);