// Importar el CSS (si usas bundler como Vite o Webpack)
import "./style.css";

window.onload = function () {
  // Elementos del DOM
  const inputCantidad = document.querySelector("#cardCounter");
  const drawBtn = document.querySelector("#drawBtn");
  const sortBtn = document.querySelector("#sortBtn");
  const cardContainer = document.querySelector("#cardContainer");
  const logContainer = document.querySelector("#logContainer");

  // Arrays globales
  let cartasCreadas = [];

  // Valores y palos posibles
  const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const iconos = ["♠", "♣", "♥", "♦"];

  // Clases CSS para cada palo
  const iconoEstilos = {
    "♠": "card-spade",
    "♣": "card-club",
    "♥": "card-heart",
    "♦": "card-diamond"
  };

  // Convertir valor de carta a número para comparar
  function obtenerValorNumerico(valor) {
    if (valor === "A") return 1;
    if (valor === "J") return 11;
    if (valor === "Q") return 12;
    if (valor === "K") return 13;
    return parseInt(valor);
  }

  // Crea una carta con estructura y estilo
  function crearCarta() {
    const valor = valores[Math.floor(Math.random() * valores.length)];
    const icono = iconos[Math.floor(Math.random() * iconos.length)];
    const estilo = iconoEstilos[icono];

    const carta = document.createElement("div");
    carta.classList.add("poker-card", estilo);
    carta.innerHTML = `
      <div class="corner top-left">${icono}</div>
      <div class="number">${valor}</div>
      <div class="corner bottom-right">${icono}</div>
    `;

    return { valor, icono, elemento: carta };
  }

  // Muestra las cartas en el contenedor
  function mostrarCartas(cartas) {
    cardContainer.innerHTML = "";
    cartas.forEach(carta => cardContainer.appendChild(carta.elemento));
  }

  // Mostrar un paso del algoritmo en el log
  function imprimirLog(arreglo, paso) {
    const pasoContainer = document.createElement("div");

    const label = document.createElement("span");
    label.textContent = `${paso}:`;
    label.style.minWidth = "70px";
    label.style.color = "white";
    pasoContainer.appendChild(label);

    arreglo.forEach(carta => {
      const estilo = iconoEstilos[carta.icono];
      const cartaDiv = document.createElement("div");
      cartaDiv.classList.add("poker-card", estilo);
      cartaDiv.innerHTML = `
        <div class="corner top-left">${carta.icono}</div>
        <div class="number">${carta.valor}</div>
        <div class="corner bottom-right">${carta.icono}</div>
      `;
      pasoContainer.appendChild(cartaDiv);
    });

    logContainer.appendChild(pasoContainer);
  }

  // Bubble sort con registro visual de todos los pasos
  function ordenarCartas() {
    let paso = 1;
    let wall = cartasCreadas.length - 1;

    while (wall > 0) {
      for (let i = 0; i < wall; i++) {
        const actual = obtenerValorNumerico(cartasCreadas[i].valor);
        const siguiente = obtenerValorNumerico(cartasCreadas[i + 1].valor);

        // Comparar cartas
        if (actual > siguiente) {
          // Intercambiar si están desordenadas
          let temp = cartasCreadas[i];
          cartasCreadas[i] = cartasCreadas[i + 1];
          cartasCreadas[i + 1] = temp;
        }

        // Mostrar el paso actual (siempre, para visualizar bien)
        imprimirLog([...cartasCreadas], paso);
        paso++;
      }
      wall--;
    }
  }

  // Evento para generar cartas aleatorias
  drawBtn.addEventListener("click", () => {
    const cantidad = parseInt(inputCantidad.value);
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 52) {
      alert("Por favor ingresa una cantidad válida entre 1 y 52.");
      return;
    }

    cartasCreadas = [];
    cardContainer.innerHTML = "";
    logContainer.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
      const nuevaCarta = crearCarta();
      cartasCreadas.push(nuevaCarta);
    }

    mostrarCartas(cartasCreadas);
  });

  // Evento para ordenar las cartas
  sortBtn.addEventListener("click", () => {
    logContainer.innerHTML = "";
    ordenarCartas();
  });
};
