const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const placar = document.getElementById("placar");
const botaoReiniciar = document.getElementById("reiniciar");

let pontos = 0;
let x = 100;
let y = 100;
let velocidadeX = 20;
let velocidadeY = 0;
let ultimaVelocidadeX = velocidadeX;
let ultimaVelocidadeY = velocidadeY;
let comidaX = 200;
let comidaY = 200;

const cobra = [
    { x: x, y: y }
];

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";

    for (const segmento of cobra) {
        ctx.fillRect(segmento.x, segmento.y, 20, 20);
    }

    const totalCasas = (canvas.width / 20) * (canvas.height / 20);

    if (cobra.length < totalCasas) {
        ctx.fillStyle = "red";
        ctx.fillRect(comidaX, comidaY, 20, 20);
    }
}

desenhar();

function mover() {
    ultimaVelocidadeX = velocidadeX;
    ultimaVelocidadeY = velocidadeY;
    x = x + velocidadeX;
    y = y + velocidadeY;

    if (x >= canvas.width) {
        x = 0;
    }
    if (x < 0) {
        x = canvas.width - 20;
    }
    if (y >= canvas.height) {
        y = 0;
    }
    if (y < 0) {
        y = canvas.height - 20;
    }

    cobra.unshift({ x: x, y: y });

    if (x === comidaX && y === comidaY) {
        pontos++;
        placar.textContent = `Pontuação: ${pontos}`;
        gerarComida();
    } else {
        cobra.pop();
    }

    desenhar();

    for (const segmento of cobra.slice(1)) {
        if (x === segmento.x && y === segmento.y) {
            clearInterval(intervalo);
            placar.textContent = "Fim de jogo! Pontuação: " + pontos;
            return;
        }
    }
}

const intervalo = setInterval(mover, 200);

function controlar(evento) {
    if (
        (evento.key === "ArrowDown" && ultimaVelocidadeY === -20) ||
        (evento.key === "ArrowUp" && ultimaVelocidadeY === 20) ||
        (evento.key === "ArrowLeft" && ultimaVelocidadeX === 20) ||
        (evento.key === "ArrowRight" && ultimaVelocidadeX === -20)
    ) {
        evento.preventDefault();
        return;
    }

    if (evento.key === "ArrowDown") {
        evento.preventDefault();
        velocidadeX = 0;
        velocidadeY = 20;
    }
    if (evento.key === "ArrowUp") {
        evento.preventDefault();
        velocidadeX = 0;
        velocidadeY = -20;
    }
    if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        velocidadeX = -20;
        velocidadeY = 0;
    }
    if (evento.key === "ArrowRight") {
        evento.preventDefault();
        velocidadeX = 20;
        velocidadeY = 0;
    }
}

function reiniciar() {
    window.location.reload();
}

botaoReiniciar.addEventListener("click", reiniciar);
document.addEventListener("keydown", controlar);

function gerarComida() {
    const totalCasas = (canvas.width / 20) * (canvas.height / 20);

    if (cobra.length === totalCasas) {
        clearInterval(intervalo);
        placar.textContent = "Você venceu! Pontuação: " + pontos;
        return;
    }

    let ocupada;

    do {
        comidaX = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        comidaY = Math.floor(Math.random() * (canvas.height / 20)) * 20;
        ocupada = false;

        for (const segmento of cobra) {
            if (comidaX === segmento.x && comidaY === segmento.y) {
                ocupada = true;
            }
        }
    } while (ocupada);
}
