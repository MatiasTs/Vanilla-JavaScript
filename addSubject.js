import {saveCheckboxes, fillListBoolean} from "./saveCheckboxes.js";

const d = document,
form = d.getElementById("form"),
saveChangesButton = d.getElementById("save-changes");;

export function addSubject(listSubjects, taskSchedule){


    
    const subject = d.getElementById("name"),
    minutes = d.getElementById("minutes");
    const myModal = d.getElementById('myModal');
    let check = true;
    let regex = /^[0-9]*$/;
    
    if ((subject.value === null || subject.value.trim() === "")) {
        
        d.getElementById("nameText").classList.remove("d-none");
        
        setTimeout(()=>{
        d.getElementById("nameText").classList.add("d-none");

        }, 2000)
        
        check = false;
    }
    if ((minutes.value === null || minutes.value.trim() === "")){
        check = false;
        d.getElementById("minutesFill").classList.remove("d-none");
        setTimeout(() => {
        d.getElementById("minutesFill").classList.add("d-none");

        }, 2000)

    }
    if(!regex.test(minutes.value)){
        
        d.getElementById("minutesText").classList.remove("d-none");
        setTimeout(() => {
        d.getElementById("minutesText").classList.add("d-none");

        }, 2000)

        check=false;
    }
    
    if (check){

         const checkboxesValue= fillListBoolean(myModal);

         const date = new Date();
         const day = date.getDay();

         let min;

        

         if(checkboxesValue[day]){
            min=minutes.value
            console.log(min);
         }else{
            min=0;
            console.log("false");
         }


        
        fillBox(subject.value);
        listSubjects.push({
            name: subject.value,
            minutes: min
        })

        saveCheckboxes(myModal, taskSchedule, subject.value, minutes.value);

        minutes.value="";
        subject.value="";

    }
}

export function fillBox(value){
    const myTemplate = d.getElementById("template");
    const clone = d.importNode(myTemplate.content, true);
    clone.querySelector(".update").setAttribute("data-name", value)
    clone.querySelector(".delete").setAttribute("data-delete", value)
    clone.querySelector("label").htmlFor = value.toLowerCase();
    clone.querySelector("input").id = value.toLowerCase();
    form.appendChild(clone);
    $('#myModal').modal('hide');
}