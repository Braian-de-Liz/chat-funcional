// Seleção de elementos
const login = document.getElementById("Login");
const form_login = login.querySelector("#login__form");
const form_input = login.querySelector(".login_input");

const chat = document.getElementById("chat");
const chatFormu = chat.querySelector(".chat_form");
const chatinput = chat.querySelector(".chat-input");
const chatmensagens = chat.querySelector("#chat-mensagens");

let ws;

// Funções de exibição de mensagens
function escrevaVisual(conteudo, hora) {
    const div = document.createElement("div");
    div.classList.add("mensUser");

    div.innerHTML = `
        <p>${conteudo}</p>
        <span class="hora-mensagem">${hora}</span>
    `;
    console.log("mensagem do usuário redenrizada com sucesso");
    return div;
}

function EscreveOutroVisu(conteudo, escritor, cor, hora) {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("mensoutro");
    span.classList.add("escritorOU");

    span.textContent = escritor;
    span.style.color = cor;

    div.appendChild(span);
    div.innerHTML += `<p>${conteudo}</p>`;
    div.innerHTML += `<span class="hora-mensagem">${hora}</span>`;


    console.log("Mensagem do outro usuário rederizada");
    return div;
}

// Cores aleatórias
const cores = [
    'blueviolet', 'cadetblue', 'brown', 'coral', 'cornflowerblue',
    'aqua', 'teal', 'deeppink', 'yellow', 'springgreen'
];

function corAleatoria() {
    const sorteio = Math.floor(Math.random() * cores.length);
    return cores[sorteio];
}

// Scroll automático
function scroolChat() {
    setTimeout(() => {
        chatmensagens.scrollTop = chatmensagens.scrollHeight;
    }, 50);
}

// Animação de entrada
function animarEntrada(div) {
    div.style.opacity = 0;
    div.style.transform = "translateY(10px)";

    requestAnimationFrame(() => {
        div.style.transition = "all 0.3s ease";
        div.style.opacity = 1;
        div.style.transform = "translateY(0)";
    });

    console.log("menssagem animada com sucesso");
}

// Dados do usuário
const Usuario = {
    id: "",
    nome: "",
    corUser: ""
};

// Função chamada quando uma mensagem é recebida
function mensagemEnvia({ data }) {
    let msg;
    try {
        msg = JSON.parse(data);
    } catch (err) {
        console.error("Falha ao parsear JSON:", data);
        return;
    }

    const { usuarioID, usuarioNome, usuarioCor, contet, hora } = msg;

    const mensagemExibir = usuarioID === Usuario.id
        ? escrevaVisual(contet, hora)
        : EscreveOutroVisu(contet, usuarioNome, usuarioCor, hora);

    chatmensagens.appendChild(mensagemExibir);
    animarEntrada(mensagemExibir);
    scroolChat();
}

// Submissão do login
const submitFunc = (e) => {
    e.preventDefault();

    Usuario.id = crypto.randomUUID();
    Usuario.nome = form_input.value.trim();
    Usuario.corUser = corAleatoria();

    if (!Usuario.nome) return;

    login.style.display = "none";
    chat.style.display = "flex";

    // Conectar WebSocket
    ws = new WebSocket("wss://chat-braian-de-liz.onrender.com");

    // ✅ Definir eventos ANTES do onopen
    ws.onmessage = mensagemEnvia;
    ws.onerror = (error) => console.error("Erro no WebSocket:", error);
    ws.onclose = () => console.log("Conexão fechada. Tente recarregar a página.");

    ws.onopen = () => {
        console.log("WebSocket conectado.");

        const agora = new Date();
        const hora = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const entradaMsg = {
            usuarioID: Usuario.id,
            usuarioNome: Usuario.nome,
            usuarioCor: Usuario.corUser,
            contet: `${Usuario.nome} entrou no chat.`,
            hora: hora
        };

        ws.send(JSON.stringify(entradaMsg));
        console.log("Conectado");
    };
};

// Enviar mensagem no chat
function escreveMens(e) {
    e.preventDefault();

    const texto = chatinput.value.trim();
    if (!texto || ws.readyState !== WebSocket.OPEN) return;

    const agora = new Date();
    const hora = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const mensagem = {
        usuarioID: Usuario.id,
        usuarioNome: Usuario.nome,
        usuarioCor: Usuario.corUser,
        contet: texto,
        hora: hora
    };

    ws.send(JSON.stringify(mensagem));
    chatinput.value = "";

    console.log("enviada");
}

// Alternar tema claro/escuro
const botaoModo = document.getElementById("botaoMODO");
const iconeModo = document.getElementById("iconModo");

function alteraTema() {
    document.body.classList.toggle("modo-claro");
    const estaClaro = document.body.classList.contains("modo-claro");
    iconeModo.src = estaClaro 
        ? "CSS/imagens/imagemSol.png" 
        : "CSS/imagens/imagemLua.svg";
}

// Animação do placeholder
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

// Event Listeners
form_login.addEventListener("submit", submitFunc);
chatFormu.addEventListener("submit", escreveMens);
botaoModo.addEventListener("click", alteraTema);