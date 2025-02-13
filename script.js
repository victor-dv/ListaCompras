let listaCompras = [];

function adicionarItem() {
  let inputItem = document.getElementById("item");
  let inputQtd = document.getElementById("quantidade");

  if (inputItem.value.trim() === "") {
    return; //Funciona como se fosse um brak, impossibilita que o codigo a baixo seja executado
  }

  let item = {
    id: Date.now(),
    nome: inputItem.value,
    quantidade: inputQtd.value || 1,
    comprado: false,
  };

  inputItem.value = "";
  inputQtd.value = "";
  listaCompras.push(item);
  atualizarInterface();
  inputItem.focus();

}

function limpraLista() {
  listaCompras = [];
  atualizarInterface();
}

function atualizarInterface() {
  let lista = document.querySelector(".lista");

  lista.innerHTML = ``;

  for (let i = 0; i < listaCompras.length; i++) {
    let item = document.createElement("li");
    item.innerHTML = `
          <input ${listaCompras[i].comprado ? "checked" : ""} type="checkbox" name="" id="" onchange="toggleItem(${listaCompras[i].id})">
          <p>${listaCompras[i].nome} x ${listaCompras[i].quantidade}</p>
          <button onclick ="excluirItem(${listaCompras[i].id})">X</button>
    `;
    lista.append(item);
  }
}

function excluirItem(id) {
  listaCompras = listaCompras.filter((item) => item.id != id);
  atualizarInterface();
  salvarDados()
}

function limparComprados() {
  listaCompras = listaCompras.filter((item) => item.comprado != true);
  atualizarInterface();
  salvarDados()
}

function toggleItem(id) {
  const item = listaCompras.find((item) => item.id === id);
  item.comprado = !item.comprado;
}

document.getElementById("item").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adicionarItem();
  }
});
document
  .getElementById("quantidade")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      adicionarItem();
    }
  });

function carregarDados() {
  const dados = localStorage.getItem("lista_de_compras");
  if (dados) {
    listaCompras = JSON.parse(dados);
    atualizarInterface();
  }
}

function salvarDados(){
  localStorage.setItem("lista_de_compras", JSON.stringify(listaCompras));

}

carregarDados();
