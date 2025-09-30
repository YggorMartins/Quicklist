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

    // Adiciona a estrutura interna do item da lista
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

// --- Funcionalidade Principal (Delegação de Eventos para Exclusão e Seleção) ---
listaElement.addEventListener("click", (event) => {
  const clickedElement = event.target;
  
  // -----------------------------------------------------
  // LÓGICA DE EXCLUSÃO
  // -----------------------------------------------------
  let trashButton = null;
  
  // Verifica se o clique foi na <img> ou no <span> da lixeira
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
      return; // Sai da função para evitar processar como clique no checkbox
    }
  }

  // -----------------------------------------------------
  // LÓGICA DE SELEÇÃO (CHECKBOX)
  // -----------------------------------------------------
  
  // 1. Verifica se o elemento clicado é o checkbox ou se é o <li> pai
  const listItem = clickedElement.closest(".shopping-items");

  // Se o clique ocorreu em qualquer parte do <li>, e não foi na lixeira (já tratada acima)
  if (listItem) {
    // 2. Encontra o elemento .checkbox dentro do item da lista
    const checkbox = listItem.querySelector(".checkbox");
    
    if (checkbox) {
      // 3. Alterna a classe 'checked' no checkbox
      // O método .toggle() adiciona a classe se ela não estiver presente, e a remove se estiver.
      checkbox.classList.toggle("checked");
      
      console.log(`Item "${listItem.querySelector('p').textContent}" selecionado: ${checkbox.classList.contains("checked")}`);
    }
  }
});