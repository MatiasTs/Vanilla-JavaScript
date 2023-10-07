const d = document;

export function saveCheckboxes(modal, taskSchedule, subject, minutes){
    
    const listBoolean = fillListBoolean(modal);

    taskSchedule.push({
        name: subject,
        minutes: minutes,
        checkboxes: listBoolean
    });

    localStorage.setItem("taskSchedule", JSON.stringify(taskSchedule));
}

export function updateCheckboxes(modal, taskSchedule, element, minutes){

    console.log(minutes);

    const listBoolean = fillListBoolean(modal);

    taskSchedule = taskSchedule.map(el => {
        if(el.name === element.getAttribute("data-name")){
            return {...el, minutes : minutes, checkboxes : listBoolean }
        }else{
            return el;
        }
    })

    localStorage.setItem("taskSchedule", JSON.stringify(taskSchedule));

    console.log(taskSchedule);

    return taskSchedule;

}



export function fillListBoolean(modal){
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    let listBoolean = [];
    checkboxes.forEach(box => {
        listBoolean.push(box.checked);
    });
    return listBoolean;
}