document.addEventListener("DOMContentLoaded", (e) => {
  // e.preventDefault()
});

function openDialog() {
  console.log(2);
  document.querySelector("#dialogFiltro").showModal();
}

function closeDialog() {
  document.querySelector("#dialogFiltro").close();
}
