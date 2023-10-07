const d = document;

export function selectAll(modal){
    const checkboxes =modal.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(element => {
        element.checked = true;
    });
}

export function selectNone(modal){
    const checkboxes =modal.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(element => {
        element.checked = false;
    });
}