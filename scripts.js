const inputElement = document.getElementById("add-item");
const formElement = document.querySelector(".form");
const listaElement = document.querySelector(".items-list"); 
const dangerAlert = document.querySelector(".danger"); 

const regexSemNumeros = /^[^0-9]+$/;


function showAlert() {

  dangerAlert.style.display = 'flex'; 
  

  setTimeout(() => {
    dangerAlert.style.display = 'none';
  }, 3000); 
}


formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemValue = inputElement.value.trim();

  if (itemValue !== "" && regexSemNumeros.test(itemValue)) {
    const newItem = document.createElement("li");
    newItem.classList.add("shopping-items");


    newItem.innerHTML = `
      <div class="checkbox"></div>
      <p>${itemValue}</p>
      <span>
        <img src="./assets/icons/trashbox.svg" alt="ícone de lixeira">
      </span>
    `;

    listaElement.appendChild(newItem);

    inputElement.value = "";
    
  } else {
    alert("Por favor, digite um item válido sem números.");
  }
});


listaElement.addEventListener("click", (event) => {
  const clickedElement = event.target;
  

  let trashButton = null;
  

  if (clickedElement.tagName === 'IMG' && clickedElement.closest('span')) {
    trashButton = clickedElement.closest('span');
  } else if (clickedElement.tagName === 'SPAN' && clickedElement.querySelector('img[src*="trashbox.svg"]')) {
    trashButton = clickedElement;
  }
  
  if (trashButton) {
    const listItem = trashButton.closest(".shopping-items");

    if (listItem) {
      listItem.remove();
      showAlert();
      return; 
    }
  }

  const listItem = clickedElement.closest(".shopping-items");


  if (listItem) {

    const checkbox = listItem.querySelector(".checkbox");
    
    if (checkbox) {

      checkbox.classList.toggle("checked");
      
      console.log(`Item "${listItem.querySelector('p').textContent}" selecionado: ${checkbox.classList.contains("checked")}`);
    }
  }
});