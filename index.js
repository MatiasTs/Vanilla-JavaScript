import {addSubject, fillBox} from "./addSubject.js";
import deleteSubject from "./deleteSubject.js";
import {selectAll, selectNone} from "./select.js";
import operations from "./operations.js";
import updateChanges from "./updateChanges.js";


const d = document,
 form = d.getElementById("form"),
 saveChangesButton = d.getElementById("save-changes");

let listSubjects = JSON.parse(localStorage.getItem("listSubjects")) || [];

let dataName = [];

let dataDelete = [];

let element, deleteElement;

let taskSchedule = JSON.parse(localStorage.getItem("taskSchedule")) || [];

let dayNumber = JSON.parse(localStorage.getItem("dayNumber")) || 0;

let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

const $body = d.querySelector("body");
const $luna = document.getElementById("luna");
const $sol = document.getElementById("sol");




const myModal = d.getElementById("myModal");

const modalUpdate = d.getElementById("updateModal");

const operationsButtons = d.getElementById("operationsButtons");

d.addEventListener("DOMContentLoaded", ()=> {
    

    if(listSubjects.length>0){
        operationsButtons.classList.remove("d-none");

    }
    dataName = d.querySelectorAll('[data-name]');
    dataDelete = d.querySelectorAll('[data-delete]');
    listSubjects.forEach( el => {
        fillBox(el.name);
    });

    updateDaily();

    fillLabels();
    getListUpdateDelete();

    if (darkMode) {
        $body.classList.add("dark");
        $luna.classList.add("d-none");
        $sol.classList.remove("d-none");
      } else {
        $body.classList.remove("dark");
        $luna.classList.remove("d-none");
        $sol.classList.add("d-none");
      }

    
})


d.addEventListener("click", e => {
    
    
    switch (e.target.id) {
        case "save-changes":
            addSubject(listSubjects, taskSchedule);
            
            
            if(operationsButtons.classList.contains("d-none")){
                operationsButtons.classList.remove("d-none");
            }
            
            localStorage.setItem("listSubjects", JSON.stringify(listSubjects));
            fillLabels();
            getListUpdateDelete()
            break;

        case "updateDailyGoal":
            taskSchedule =updateChanges(listSubjects, element, taskSchedule);
            saveListInLocalStorage();
            fillLabels();
            
            

            break;

        case "all":
            selectAll(myModal);
            break;

        case "none":
            selectNone(myModal);
            break;

        case "allUpdate":
            selectAll(modalUpdate);
            break;

        case "noneUpdate":
            selectNone(modalUpdate);
            break;

        case "substract":
        case "sum":
            operations(e, listSubjects);
            saveListInLocalStorage();
            fillLabels();
            break;
    }

    dataName.forEach(item => {
        if (e.target === item) {
            element = e.target;
        }
    });

    dataDelete.forEach(item => {
        if (e.target === item) {
            deleteElement = e.target;
            [listSubjects, taskSchedule] = deleteSubject(deleteElement, listSubjects, taskSchedule);
            localStorage.setItem("taskSchedule", JSON.stringify(taskSchedule));
            localStorage.setItem("listSubjects", JSON.stringify(listSubjects));
            if (listSubjects.length < 1) {
                operationsButtons.classList.add("d-none");
            }
        }
    });

});


function fillLabels(){
    const labels = form.querySelectorAll("label");
    for(let i=0; i<labels.length; i++){
        if(listSubjects[i].minutes>0){

            labels[i].innerHTML = `${listSubjects[i].name} (${listSubjects[i].minutes})`
        }else{
            labels[i].innerHTML = `${listSubjects[i].name} <span id="passwordHelpInline" class="form-text fs-4 completado">
            <i class="bi bi-check-lg"></i>
          </span>`
        }
    }
}

function saveListInLocalStorage(){
    localStorage.setItem("listSubjects", JSON.stringify(listSubjects));
}

function getListUpdateDelete(){
    dataName = d.querySelectorAll('[data-name]');
    dataDelete = d.querySelectorAll('[data-delete]');
}



function updateDaily(){
    const date = new Date();
    const day = date.getDay();
    if (dayNumber !== day){
        dayNumber= day;
        localStorage.setItem("dayNumber", JSON.stringify(dayNumber));
        for(let i=0; i< taskSchedule.length; i++){
            if(taskSchedule[i].checkboxes[day]){
                listSubjects[i].minutes = parseInt(listSubjects[i].minutes) + parseInt(taskSchedule[i].minutes);
            }
        }
        saveListInLocalStorage();
        
    }
    
}

d.getElementById("hamburger").addEventListener("click", () => {
    $body.classList.toggle("dark");
    $luna.classList.toggle("d-none");
    $sol.classList.toggle("d-none");

    localStorage.setItem("darkMode", $body.classList.contains("dark"));

 })