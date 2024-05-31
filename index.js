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
    console.log(e);

    const li = document.createElement("li");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const bt = document.createElement("button");

    li.classList.add("parent");

    img.src =
      "https://agenciadenoticias.ibge.gov.br/" +
      JSON.parse(e.imagens).image_intro;
    img.classList.add("div1");

    h2.textContent = e.titulo;
    h2.classList.add("div2");

    p.textContent = e.introducao;
    p.classList.add("div3");

    p2.textContent = "#" + e.editorias;

    p3.textContent = "Publicado " + e.data_publicacao;

    div.classList.add("div4");

    bt.textContent = "Leia Mais";
    bt.addEventListener("click", () => {
      window.open(e.link);
    });

    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(bt);
    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(div);
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
    var linkParam = `?qtd=10`;
    if (params) {
      if (params.qtd) {
        linkParam = `?qtd=${params.qtd}`;
      }

      if (params.tipo) {
        linkParam += `&tipo=${params.tipo}`;
      }

      if (params.de) {
        linkParam += `&de=${params.de}`;
      }

      if (params.ate) {
        linkParam += `&ate=${params.ate}`;
      }
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
