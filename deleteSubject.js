const d = document;

export default function deleteSubject(deleteElement, listSubjects, taskSchedule){
    const boxes = d.querySelectorAll(".box");
    const updates = d.querySelectorAll("[data-name]");
    const dataToDelete = deleteElement.getAttribute("data-delete");
    for(let i=(boxes.length) - 1; i>=0; i--){
        if(updates[i].getAttribute("data-name") === dataToDelete){
            boxes[i].parentNode.removeChild(boxes[i]);
            listSubjects = listSubjects.filter( subject => subject.name !== dataToDelete);
            taskSchedule = taskSchedule.filter( check => check.name !== dataToDelete);
            
        }

    }
    
    return [listSubjects, taskSchedule];

    
}