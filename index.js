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
  main.innerHTML = "";
  const ul = document.createElement("ul");
  main.appendChild(ul);

  data.items.forEach((e) => {
    console.log(JSON.parse(e.imagens));
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    img.src =
      "https://agenciadenoticias.ibge.gov.br/" +
      JSON.parse(e.imagens).image_intro;
    h2.textContent = e.titulo;
    li.appendChild(img);
    li.appendChild(h2);
    ul.appendChild(li);
  });
}

function closeDialogApply() {
  const qtd = document.querySelector("#quantidade");
  const tipo = document.querySelector("#tipo");
  const de = document.querySelector("#de");
  const ate = document.querySelector("#ate");

  const url = new URL(window.location);
  url.searchParams.set("qtd", qtd.value);
  url.searchParams.set("tipo", tipo.value);
  url.searchParams.set("de", de.value);
  url.searchParams.set("ate", ate.value);
  window.history.pushState({}, "", url);

  closeDialog();
  carregaNoticias();
}

function getSearchParams() {
  if (!location.search) {
    return;
  }

  const urlSearchParams = new URLSearchParams(location.search);
  var params = {};
  params.qtd = urlSearchParams.get("qtd");
  params.tipo = urlSearchParams.get("tipo");
  params.de = urlSearchParams.get("de");
  params.ate = urlSearchParams.get("ate");

  return params;
}

async function carregaNoticias() {
  try {
    var params = getSearchParams();
    console.log(params);
    var linkParam = `?qtd=${params.qtd}`;
    if (params.tipo) {
      linkParam += `&tipo=${params.tipo}`;
    }
    if (params.de) {
      linkParam += `&de=${params.de}`;
    }
    if (params.ate) {
      linkParam += `&ate=${params.ate}`;
    }

    const data = await fetch(
      `http://servicodados.ibge.gov.br/api/v3/noticias/${linkParam}`
    );

    const jsonData = await data.json();

    generateItens(jsonData);
  } catch (error) {
    console.error(error);
  }
}
