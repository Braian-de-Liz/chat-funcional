# 💬 Chat Funcional

> **Uma aplicação de chat em tempo real construída do zero — sem frameworks, sem atalhos.**

Este projeto é uma implementação prática de um **sistema de chat em tempo real**, desenvolvido com tecnologias web puras:  
**HTML, CSS e JavaScript** no front-end, e **Node.js** com a biblioteca [`ws`](https://github.com/websockets/ws) no back-end.

O objetivo foi **entender profundamente como funciona a comunicação bidirecional** entre cliente e servidor, usando o protocolo **WebSocket**, sem depender de soluções prontas como Socket.IO.

> 🔗 **Acesse o projeto online:** [chat-funcional-braian-de-liz.onrender.com](https://chat-funcional-braian-de-liz.onrender.com)

---

## 🖼️ Visão Geral da Interface

A interface é minimalista, funcional e focada na experiência do usuário. Com base no que está no ar, a estrutura é a seguinte:

### 📱 Tela de Login


Após clicar em "Entrar", o usuário é direcionado à sala de chat.

### 💬 Sala de Chat


Elementos visíveis:
- Campo de entrada de nome (tela inicial)
- Botão "Entrar" para iniciar a sessão
- Área de exibição de mensagens
- Campo de texto para digitar nova mensagem
- Botão "Enviar" funcional

Apesar da simplicidade visual, o sistema é **totalmente funcional em tempo real**, com:
- Conexão persistente via WebSocket
- Envio e recepção instantânea de mensagens
- Diferenciação visual entre o usuário atual e os demais
- Exibição de horário nas mensagens

---

## 📦 Arquitetura do Sistema

O projeto segue uma arquitetura **full-stack com separação clara entre front-end e back-end**:



### 🧩 Componentes Principais

| Componente | Localização | Função |
|----------|-------------|--------|
| `index.html` | front-end | Estrutura da página |
| `style.css` | front-end | Estilização da interface |
| `validaLogin.js` | front-end | Lógica de interface, eventos, conexão WebSocket |
| `server.js` | back-end | Servidor WebSocket, gerenciamento de conexões |
| `package.json` | back-end | Dependências e scripts |

---

## 🚀 Funcionalidades Implementadas

### ✅ 1. **Login com nome personalizado**
- O usuário insere seu nome antes de entrar.
- O nome é usado para identificar mensagens no chat.

### ✅ 2. **Conexão em tempo real via WebSocket**
- Após o login, o front-end se conecta ao servidor com:
  ```js
  const ws = new WebSocket('wss://chat-funcional-braian-de-liz.onrender.com');


## 🌐 Tecnologias Utilizadas

| Camada | Tecnologia | Descrição |
|-------|-----------|-----------|
| **Front-end** | HTML5 | Estrutura da página (telas de login e chat) |
| | CSS3 | Estilização da interface (cores, layout, botões) |
| | JavaScript | Lógica do cliente: eventos, manipulação do DOM, conexão WebSocket |
| **Back-end** | Node.js | Ambiente de execução para o servidor WebSocket |
| | `ws` | Biblioteca leve e eficiente para WebSockets em Node.js |
| **Deploy** | Render | Plataforma utilizada para hospedar o front-end (Site Estático) e o back-end (Web Service) |
| **Controle de Versão** | Git / GitHub | Gerenciamento de código, histórico de alterações e colaboração |
