function handleSubmit(event) {
  event.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  if (!startDate || !endDate) {
    alert("Start Date or End Date is required");
    return;
  }
  if (startDate > endDate) {
    alert("Start Date cannot be after End Date");
    return;
  }

  const stored = localStorage.getItem("tasks");
  let taskList = stored ? JSON.parse(stored) : [];

  const newTask = {
    startDate,
    endDate,
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  alert("task Added");

  document.getElementById("dateForm").reset();
  renderTable();
}

function renderTable() {
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

function displayTable(taskList) {
  const section = document.getElementById("pastTasks");
  section.innerHTML = "";

  const table = document.createElement("table");

  table.classList.add(
    "w-full", // Full width
    "border-collapse", // Collapse borders into single lines
      "border",
    "border-gray-300", // Lighter gray border
    "shadow-md", // Add a subtle shadow
    "rounded-lg", // Rounded corners
    "overflow-hidden", // Ensures rounded corners show up
    "bg-white", // White background
    "text-left", // Align text left
    "mb-6", // Margin bottom
  );

  const thead = document.createElement("thead");
  thead.classList.add("bg-gray-200", "border-b", "border-gray-300");
    const headerRow = document.createElement("tr");

  const thStart = document.createElement("th");
    thStart.innerText = "Start Date";
    thStart.classList.add("p-2");

  const thEnd = document.createElement("th");
    thEnd.innerText = "End Date";
    thEnd.classList.add("p-2");
    

  headerRow.appendChild(thStart);
  headerRow.appendChild(thEnd);

  thead.appendChild(headerRow);

  table.appendChild(thead);

  //add body

  const tbody = document.createElement("tbody");

  for (const item of taskList) {
    const rowItem = document.createElement("tr");
    rowItem.classList.add(
      "border-b",
      "border-gray-200",
      "hover:bg-gray-50",
      "transition-colors"
    );

      const startDateTd = document.createElement("td");
      const endDateTd = document.createElement("td");
      startDateTd.className = "p-2 text-gray-600";
      endDateTd.className ="p-2 text-gray-600";
      startDateTd.innerText = item.startDate;
      endDateTd.innerText = item.endDate;

      rowItem.appendChild(startDateTd);
      rowItem.appendChild(endDateTd);

      tbody.appendChild(rowItem);
  }

    table.appendChild(tbody);
    section.appendChild(table);

}

document.getElementById("dateForm").addEventListener("submit", handleSubmit);

document.addEventListener("DOMContentLoaded", renderTable);