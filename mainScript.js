    // Declarando variaveis
let usuario={name:"guilherme"}
let contato ="Todos";
//tipos das mensagens
let type = "message";
let visibilidade="Público";
let mensagensNaTela = document.querySelector(".mensagens ul");
let participantesNaTela = document.querySelector(".participantes")


    // Função de entrar no chat ao preencher o nome
function entrar () {
    usuario.name = document.querySelector(".nome").value
    if (usuario.name){
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",usuario )
        promise.then(validarUsername).catch(erroLogin);
        }
    else{
        alert("Nome inválido!")
    }
    }
    //Função para verificar se não ocorreu algum erro com a API
function validarUsername(resposta){
    const telaLogin=document.querySelector(".loginScreen")
    telaLogin.classList.add("hide")
    carregarMensagens();
    carregaParticipantes();
    setInterval(recarregarPagina,3000);
}
    //Função quando deu erro
function erroLogin(){
    let nome=document.querySelector(".nome");
    nome.value="";
    document.querySelector(".loginScreen .mensagem p").innerHTML="Nome de usuário já está sendo utilizado!"
}

    //Pegando as mensagens que estão dentro da API
function carregarMensagens(){
    const promise= axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(renderizarMensagens);
}

    //Arquivando as mensagens na variavel
function renderizarMensagens(mensagens){
    mensagensNaTela.innerHTML="";
    mensagens.data.forEach(adicionarMensagem);
}

    //Adicionando os textos com hora e as mensagens
function adicionarMensagem(mensagem){
    switch(mensagem.type) {
        case "status":
            mensagensNaTela.innerHTML+=`<li data-identifier="message" class=${mensagem.type}><p><span>(${mensagem.time})</span><b>${mensagem.from}</b> ${mensagem.text}</p></li>`
            break;
        case "message":
            mensagensNaTela.innerHTML+=`<li data-identifier="message" class=${mensagem.type}><p><span>(${mensagem.time})</span><b>${mensagem.from}</b> para <b>${mensagem.to}</b>: ${mensagem.text}</p></li>`
            break;
        case "private_message":
            if(mensagem.to===usuario.name||mensagem.from===usuario.name){
                mensagensNaTela.innerHTML+=`<li data-identifier="message" class=${mensagem.type}><p><span>(${mensagem.time})</span><b>${mensagem.from}</b> reservadamente para <b>${mensagem.to}</b>: ${mensagem.text}</p></li>`
                break;
            }
        default:
    }
}

    //Selecionando os participantes dentro da API
function carregaParticipantes(){
    const promise= axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promise.then(renderizaParticipantes)
}

    //Renderizando os participantes na variavel
function renderizaParticipantes(participantes){
    participantesNaTela.innerHTML=`<li onclick="escolheDestinatario(this)" data-identifier="participant">
    <ion-icon name="people"></ion-icon><p>Todos</p>
    <ion-icon class="check" name="checkmark-sharp"></ion-icon>
    </li>`
    participantes.data.forEach(adicionaParticipantes)

    let contatoOnline =false;

    for(participantes of participantesNaTela.children){
        if(participantes.querySelector("p").innerHTML==contato){
            participantes.classList.add("selecionado");
            contatoOnline=true;
        }
    }
    if(!contatoOnline){
        contato="Todos"
        participantesNaTela.children[0].classList.add("selecionado")
    }
}

    //Adicionando os participantes no HTML
function adicionaParticipantes(participante){
    if(participante.name!==usuario.name){
        participantesNaTela.innerHTML+=`<li onclick="escolheDestinatario(this)" data-identifier="participant">
        <ion-icon name="person-circle"></ion-icon><p>${participante.name}</p>
        <ion-icon class="check" name="checkmark-sharp"></ion-icon>
    </li>`
    }  
}

 
    //Função para abrir o menu/barra lateral
function abrirMenu(){
    const menu=document.querySelector(".menu")
    document.querySelector(".escurecido").classList.remove("hide");
    menu.style.width="259px";
}

    //Função para fechar o Menu ao clicar fora
function fecharMenu(){
    const menu=document.querySelector(".menu")
    document.querySelector(".escurecido").classList.add("hide")
    menu.style.width="0px"
}

function recarregarPagina(){
    carregarMensagens()
    carregaParticipantes()
    const online = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",usuario)
}

    //FUNÇÃO PARA O USUARIO SOMENTE PRESSIONAR ENTER PARA ENVIAR A MENSAGEM(CHAT)
document.querySelector('footer input[type="text"]').addEventListener('keypress',function(tecla){
    if(tecla.key==="Enter"){
        enviarMensagem();
    }    
});

    //FUNÇÃO PARA O USUARIO SOMENTE PRESSIONAR ENTER PARA ENVIAR A MENSAGEM(LOGIN)
document.querySelector('.nome').addEventListener('keypress',function(tecla){
    if(tecla.key==="Enter"){
        entrar();
    }    
});