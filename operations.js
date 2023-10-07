const d = document,
  form = d.getElementById("form");

export default function operations(e, listSubjects){
    let valor;
    const inputList = form.querySelectorAll(".inputText");
    let inputValue;
    for(let i = 0; i<inputList.length; i++){
      inputValue = inputList[i].value;
        if(inputValue.trim() !== ""){
            valor = listSubjects[i].minutes;
            if(e.target.id==="substract"){
              valor = valor - inputValue;
            }else{
              valor = parseInt(valor) + parseInt(inputValue);
            }
            listSubjects[i].minutes = valor;
            inputList[i].value ="";
        }
    }
}
