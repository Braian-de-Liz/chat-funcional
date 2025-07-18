const login = document.getElementById("Login");
const form_login = login.querySelector("#login__form");
const form_input = login.querySelector(".login_input");

const chat = document.getElementById("chat");
const chatFormu = chat.querySelector(".chat_form");
const chatinput = chat.querySelector(".chat-input");

let ws;

const cores = ['blueviolet', 'cadetblue', 'brown', 'coral', 'cornflowerblue'];

function corAleatoria() {
    const sorteio = Math.floor(Math.random() * cores.length);
    return cores[sorteio];
}

const Usuario = {
    id: "",
    nome: "",
    corUser: ""
};

function mensagemEnvia(event) {
    console.log("Mensagem do servidor:", event.data);
}

const submitFunc = (e) => {
    e.preventDefault();

    Usuario.id = crypto.randomUUID();
    Usuario.nome = form_input.value;
    Usuario.corUser = corAleatoria();

    login.style.display = "none";
    chat.style.display = "flex";

    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
        console.log("WebSocket conectado.");
        ws.send(`Usuário ${Usuario.nome} entrou no chat.`);
    };

    ws.onmessage = mensagemEnvia;
};

function escreveMens(e) {
    e.preventDefault();

    const texto = chatinput.value.trim();
    if (!texto || ws.readyState !== 1) return;

    ws.send(`${Usuario.nome}: ${texto}`);
    chatinput.value = "";
}

form_login.addEventListener("submit", submitFunc);
chatFormu.addEventListener("submit", escreveMens);
