    // Declarando variaveis
let nome;
let contato ="Todos";
let visibilidade="";


    // Função de esconder o menu ao preencher o nome
function entrar(){
    const loginScreen=document.querySelector(".loginScreen");
    nome=document.querySelector(".nome").value
    //verificação para caso n tenha sido digitado nada
    if(nome!==""){
        loginScreen.classList.add("hide")
    }else{
        alert("Você precisa digitar seu nome primeiro!")
    }
}



