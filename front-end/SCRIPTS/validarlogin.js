const login = document.getElementById("Login");
const form_login = login.querySelector("#login__form");
const form_input = login.querySelector(".login_input");

const chat = document.getElementById("chat");
const chatFormu = chat.querySelector(".chat_form");
const chatinput = chat.querySelector(".chat-input");
const chatmensagens = chat.querySelector("#chat-mensagens");

let ws;


function escrevaVisual(contet) {
    const div = document.createElement("div");

    div.classList.add("mensUser");
    div.innerHTML = contet;

    return div
}

function EscreveOutroVisu(contet, escritor, cor) {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("mensoutro");
    span.classList.add("escritorOU");

    div.appendChild(span);

    span.innerHTML = escritor;
    span.style.color = cor;
    div.innerHTML += contet;


    return div;
}




const cores = ['blueviolet', 'cadetblue', 'brown', 'coral', 'cornflowerblue'];

function corAleatoria() {
    const sorteio = Math.floor(Math.random() * cores.length);
    return cores[sorteio];
}

function scroolChat() {
    setTimeout(() => {
        chatmensagens.scrollTop = chatmensagens.scrollHeight;
    }, 50);
}


const Usuario = {
    id: "",
    nome: "",
    corUser: ""
};

function mensagemEnvia({ data }) {
    const { usuarioID, usuarioNome, usuarioCor, contet } = JSON.parse(data);
    const mensagemExibir = usuarioID == Usuario.id ? escrevaVisual(contet) : EscreveOutroVisu(contet, usuarioNome, usuarioCor);


    chatmensagens.appendChild(mensagemExibir);
    scroolChat();

}


const submitFunc = (e) => {
    e.preventDefault();

    Usuario.id = crypto.randomUUID();
    Usuario.nome = form_input.value;
    Usuario.corUser = corAleatoria();

    login.style.display = "none";
    chat.style.display = "flex";

    ws = new WebSocket("wss://chat-braian-de-liz.onrender.com");

    ws.onopen = () => {
        console.log("WebSocket conectado.");
        ws.send(`Usuário ${Usuario.nome} entrou no chat.`);
    };

    ws.onmessage = mensagemEnvia;
    //wswswswswswswswswswswswswswswswswswswsws
};

function escreveMens(e) {
    e.preventDefault();

    const mensagem = {
        usuarioID: Usuario.id,
        usuarioNome: Usuario.nome,
        usuarioCor: Usuario.corUser,
        contet: chatinput.value

    }

    const texto = chatinput.value.trim();
    if (!texto || ws.readyState !== 1) return;

    ws.send(JSON.stringify(mensagem));


    chatinput.value = "";
}

form_login.addEventListener("submit", submitFunc);
chatFormu.addEventListener("submit", escreveMens);
