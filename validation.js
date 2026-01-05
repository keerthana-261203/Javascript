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