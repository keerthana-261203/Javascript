import { renderTable, showMessage } from "./app.js";
export function displayTable(taskList) {
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
    thStart.innerHTML = `Start Date <button id=sortStart style="border:none; background:transparent">
                         <img src="temp/arrow.png">   </button>`;
    thStart.classList.add("p-2");

  const thEnd = document.createElement("th");
    thEnd.innerHTML = `End Date <button id=sortEnd style="border:none; background:transparent">
                      <img src="temp/arrow.png">      </button>`;
    thEnd.classList.add("p-2");

  const thAction = document.createElement("th");
  thAction.innerText="Actions";
  thAction.classList.add("p-2");
    
  headerRow.appendChild(thAction);
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

      //action body
      const actionTd = document.createElement("td");   

    //edit button

      const editBtn = document.createElement("button");  
      editBtn.innerHTML = `<img src="temp/edit.png" width="16">`;
      editBtn.className = "p-2 text-blue-600";
      editBtn.dataset.id = item.id  
      
      //delete button

      const deleteBtn = document.createElement("button");  
      deleteBtn.innerHTML = `<img src="temp/delete.png" width="16">`;
      deleteBtn.className = "p-2 text-blue-600";
      deleteBtn.dataset.id = item.id;

      actionTd.appendChild(editBtn);
      actionTd.appendChild(deleteBtn);

      rowItem.appendChild(actionTd);

      rowItem.appendChild(startDateTd);
      rowItem.appendChild(endDateTd);

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

     // Re-render table
     renderTable();
     // Alert success
     showMessage("Task deleted successfully");
    });

    
//Edit operation

    editBtn.addEventListener("click", () => {
    // Ask for new values directly
    const newStart = prompt("Enter new Start Date:", item.startDate);
    if (!newStart) return; // cancel if empty

    const newEnd = prompt("Enter new End Date:", item.endDate);
    if (!newEnd) return;

    if (newStart > newEnd) {
    showMessage("Start Date cannot be after End Date");
    return;
    }

    // Update task immediately
    const stored = localStorage.getItem("tasks");
    let taskList = stored ? JSON.parse(stored) : [];

    taskList = taskList.map(task =>
    task.id == item.id ? { ...task, startDate: newStart, endDate: newEnd } : task);

    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    // Refresh table
    renderTable();
    showMessage("Task edited");
    });

      
  }

    table.appendChild(tbody);
    section.appendChild(table);

    const sortStartBtn = document.getElementById("sortStart");
    const sortEndBtn = document.getElementById("sortEnd");

    sortStartBtn.addEventListener("click", () => sortTasks("startDate"));
    sortEndBtn.addEventListener("click", () => sortTasks("endDate"));


  }

  function sortTasks(key) {
  // 1. Get original data from localStorage
  const stored = localStorage.getItem("tasks");
  const taskList = stored ? JSON.parse(stored) : [];

  // 2. Create a COPY (very important)
  const sortableTasks = [...taskList];

  // 3. Sort the COPY
  sortableTasks.sort((a, b) => {
    return new Date(a[key]) - new Date(b[key]);
  });

  // 4. Show sorted data in table
  displayTable(sortableTasks);
}


  export function validateForm(start, end) {
    let isValid = true;

    // Clear previous errors
    startDateError.classList.add("hidden");
    endDateError.classList.add("hidden");

    if (!start) {
        startDateError.innerText = "Start Date is required";
        startDateError.classList.remove("hidden");
        isValid = false;
    }

    if (!end) {
        endDateError.innerText = "End Date is required";
        endDateError.classList.remove("hidden");
        isValid = false;
    }

    if (start && end && start > end) {
        endDateError.innerText = "End Date cannot be before Start Date";
        endDateError.classList.remove("hidden");
        isValid = false;
    }

    return isValid;
}