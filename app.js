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
    id: Date.now(),
    startDate,
    endDate,
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  alert("Task Added");

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

  const thAction = document.createElement("th");
  thAction.innerText=""; //no header text;
  thAction.classList.add("p-2");
    

  headerRow.appendChild(thStart);
  headerRow.appendChild(thEnd);
  headerRow.appendChild(thAction);

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

      //action body
      const actionTd = document.createElement("td");   

    //edit button

      const editBtn = document.createElement("button");  
      editBtn.innerText = "Edit";
      editBtn.className = "p-2 text-blue-600";
      editBtn.dataset.id = item.id  
      
      //delete button

      const deleteBtn = document.createElement("button");  
      deleteBtn.innerText = "Delete";
      deleteBtn.className = "p-2 text-blue-600";
      deleteBtn.dataset.id = item.id;


      rowItem.appendChild(startDateTd);
      rowItem.appendChild(endDateTd);

      actionTd.appendChild(editBtn);
      actionTd.appendChild(deleteBtn);

      rowItem.appendChild(actionTd);

      tbody.appendChild(rowItem);

//Delete operation

      deleteBtn.addEventListener("click", () => {
      const confirmDelete = confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) return; // stop if user cancels

      // Get stored tasks
      const stored = localStorage.getItem("tasks");
      let taskList = stored ? JSON.parse(stored) : [];

      // Remove the task with this ID
      taskList = taskList.filter(task => task.id != item.id);

     // Save updated list
      localStorage.setItem("tasks", JSON.stringify(taskList));

     // Alert success
     alert("Task deleted");

     // Re-render table
     renderTable();
    });

    
//Edit operation

    editBtn.addEventListener("click", () => {
    // Ask for new values directly
    const newStart = prompt("Enter new Start Date:", item.startDate);
    if (!newStart) return; // cancel if empty

    const newEnd = prompt("Enter new End Date:", item.endDate);
    if (!newEnd) return;

    if (newStart > newEnd) {
    alert("Start Date cannot be after End Date");
    return;
    }

    // Update task immediately
    const stored = localStorage.getItem("tasks");
    let taskList = stored ? JSON.parse(stored) : [];

    taskList = taskList.map(task =>
    task.id == item.id ? { ...task, startDate: newStart, endDate: newEnd } : task);

    localStorage.setItem("tasks", JSON.stringify(taskList));
    alert("Task edited");

    // Refresh table
    renderTable();
    });

      
  }

    table.appendChild(tbody);
    section.appendChild(table);

  }


document.getElementById("dateForm").addEventListener("submit", handleSubmit);

document.addEventListener("DOMContentLoaded", renderTable);