document.addEventListener("DOMContentLoaded", (e) => {
  // e.preventDefault()
  carregaNoticias();
});

function openDialog() {
  document.querySelector("#dialogFiltro").showModal();
}

function closeDialog() {
  document.querySelector("#dialogFiltro").close();
}

function generateItens(data) {
  const main = document.querySelector("main");
  const ul = document.createElement("ul");
  main.appendChild(ul);

  data.items.forEach((e) => {
    console.log(e);
    const li = document.createElement("li");
    li.textContent = e.titulo;

    ul.appendChild(li);
  });
}

function closeDialogApply() {
  const form = document.querySelector("#filtro");

  // location.assign("?data");
  Array.from(form.elements).forEach((input) => {
    console.log(input.value);
  });
}

function getSearchParams() {
  // Early return -> Caso location search, não faz nada.
  if (!location.search) {
    return;
  }

  // URLSearchParams é uma classe que facilita a manipulação de query strings
  const urlSearchParams = new URLSearchParams(location.search);
}

async function carregaNoticias() {
  try {
    const data = await fetch(
      `http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10`
    );

    const jsonData = await data.json();
    console.log(jsonData);
    generateItens(jsonData);
  } catch (error) {
    console.error(error);
  }
}
