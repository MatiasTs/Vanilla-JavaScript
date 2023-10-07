import {updateCheckboxes} from "./saveCheckboxes.js";

const d = document,
 form = d.getElementById("form"),
 saveChangesButton = d.getElementById("save-changes");

 export default function updateChanges(listSubjects, element, taskSchedule){
    const minutesTime = d.getElementById("minutesTime");

    const updateModal = d.getElementById("updateModal");

    let regex = /^[0-9]*$/;
    let check = true;

    if ((minutesTime.value === null || minutesTime.value.trim() === "")){
        check = false;
        d.getElementById("updateFill").classList.remove("d-none");
        setTimeout(() => {
        d.getElementById("updateFill").classList.add("d-none");

        }, 2000)

    }
    if(!regex.test(minutesTime.value)){
        
        d.getElementById("updateText").classList.remove("d-none");
        setTimeout(() => {
        d.getElementById("updateText").classList.add("d-none");

        }, 2000)

        check=false;
    }

    if (check){
        $('#updateModal').modal('hide');
        const dataName = d.querySelectorAll('[data-name]');
        

        const minutes = minutesTime.value;

        minutesTime.value = "";
        d.getElementById("message").classList.remove("d-none");

        setTimeout(() => {
            d.getElementById("message").classList.add("d-none");
        }, 2000);

        return updateCheckboxes(updateModal, taskSchedule, element, minutes);

        
    }
}