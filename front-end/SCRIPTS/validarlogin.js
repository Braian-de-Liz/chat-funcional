const login = document.getElementById("Login");
const form_login = login.querySelector("#login__form");
const form_input = login.querySelector(".login_input");

const chat = document.getElementById("chat");
const chatFormu = chat.querySelector(".chat_form");
const chatinput = chat.querySelector(".chat-input");
const chatmensagens = chat.querySelector("#chat-mensagens");
const agora = new Date();
const hora = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
let ws;


function escrevaVisual(contet, hora) {
    const div = document.createElement("div");
    div.classList.add("mensUser");

    div.innerHTML = `
        <p>${contet}</p>
        <span class="hora-mensagem">${hora}</span>
    `;

    console.log("Ele escreveu a mensagem do usuário certa");
    return div;
}

function EscreveOutroVisu(contet, escritor, cor, hora) {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("mensoutro");
    span.classList.add("escritorOU");

    div.appendChild(span);

    span.innerHTML = escritor;
    span.style.color = cor;

    div.innerHTML += contet;
    div.innerHTML += `<span class="hora-mensagem">${hora}</span>`;

    console.log("Ele escreveu a mensagem do outro usuário certa");

    return div;
}




const cores = ['blueviolet', 'cadetblue', 'brown', 'coral', 'cornflowerblue', 'aqua', 'teal', 'deeppink', 'yellow', 'springgreen'];

function corAleatoria() {
    const sorteio = Math.floor(Math.random() * cores.length);
    return cores[sorteio];
}

function scroolChat() {
    setTimeout(() => {
        chatmensagens.scrollTop = chatmensagens.scrollHeight;
    }, 50);
}

function animarEntrada(div) {
    div.style.opacity = 0;
    div.style.transform = "translateY(10px)";

    console.log("fdyhgdsfhgihgushgifudhgidhgiuhdfgrbgiurbgibgibidbgifbvhfbvdrgdgrg");

    requestAnimationFrame(() => {
        div.style.transition = "all 0.3s ease";
        div.style.opacity = 1;
        div.style.transform = "translateY(0)";
    });
}


const Usuario = {
    id: "",
    nome: "",
    corUser: ""
};

function mensagemEnvia({ data }) {
    const { usuarioID, usuarioNome, usuarioCor, contet, hora } = JSON.parse(data);

    const mensagemExibir = usuarioID == Usuario.id ? escrevaVisual(contet, hora) : EscreveOutroVisu(contet, usuarioNome, usuarioCor, hora);
    chatmensagens.appendChild(mensagemExibir);
    animarEntrada(mensagemEnvia)
    scroolChat();

    console.log("funcionou certinho");
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
    //wswswswswswswswswswswswswswswswswswswswswswswswswsw
};

function escreveMens(e) {
    e.preventDefault();

    const agora = new Date();
    const hora = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const mensagem = {
        usuarioID: Usuario.id,
        usuarioNome: Usuario.nome,
        usuarioCor: Usuario.corUser,
        contet: chatinput.value,
        hora: hora
    }

    const texto = chatinput.value.trim();
    if (!texto || ws.readyState !== 1) return;

    ws.send(JSON.stringify(mensagem));

    chatinput.value = "";

    console.log("funcionou certinho");
}



const botaoModo = document.getElementById("botaoMODO");
const iconeModo = document.getElementById("iconModo");

function alteraTema() {
    document.body.classList.toggle("modo-claro");

    const estaClaro = document.body.classList.contains("modo-claro");

    if (estaClaro) {
        iconeModo.src = "CSS/imagens/imagemSol.png";
    }
    else {
        iconeModo.src = "CSS/imagens/imagemLua.svg";
    }
}




form_login.addEventListener("submit", submitFunc);
chatFormu.addEventListener("submit", escreveMens);
botaoModo.addEventListener("click", alteraTema);


const input = document.querySelector(".chat-input");
const placeholderText = "Digite sua mensagem...";
let i = 0;

function escreverPlaceholder() {
    if (i <= placeholderText.length) {
        input.placeholder = placeholderText.slice(0, i++);
        setTimeout(escreverPlaceholder, 20);
    }
}

input.addEventListener("focus", () => input.placeholder = "");
input.addEventListener("blur", () => {
    i = 0;
    escreverPlaceholder();
});

escreverPlaceholder();



