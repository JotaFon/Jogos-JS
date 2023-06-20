// Selecionando elementos HTML usando seus IDs
const grade = document.getElementById("grade");
const pontuacao = document.getElementById("pontuacao");

// Criando os quadrados dentro da grade
for(let i = 0; i <225; i++){
    let quadrado = document.createElement("div");
    grade.appendChild(quadrado);
}

// Selecionando todos os quadrados dentro da grade
const quadrados = document.querySelectorAll("#grade div");

// Definindo a posição inicial dos invasores
const invasores = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
];

// Variáveis de controle do jogo
let posicaoJogador = 202;
let tamanho = 15; //grade 15x15
let direcao = 1;
let descer = false;
let invasoresId;
let atingidos = [];
let pontos = 0;

// Adicionando a classe "jogador" ao quadrado correspondente à posição inicial do jogador
quadrados[posicaoJogador].classList.add("jogador");

// Adicionando a classe "invasor" aos quadrados correspondentes às posições dos invasores
invasores.forEach(invasor=>{
    quadrados[invasor].classList.add("invasor")

});

// Evento de escuta para a movimentação do jogador
document.addEventListener("keydown", moverJogador);

invasoresId = setInterval(moverinvasores, 300);


// Evento de escuta para atirar
document.addEventListener("keyup",atirar);


//===================== funcao ==========
// Definindo a função para mover o jogador
function moverJogador(e){
    quadrados[posicaoJogador].classList.remove("jogador");

    if(e.keyCode ==37){ // seta pra esquerda
        if(posicaoJogador % tamanho != 0){
            posicaoJogador--;
        }
    }else if(e.keyCode ==39){ //seta pra direita
        if(posicaoJogador % tamanho != tamanho -1){
            posicaoJogador++;
        } 
    }
    quadrados[posicaoJogador].classList.add("jogador");
}
// Função para mover os invasores
function moverinvasores(){
    const bordaEsquerda = invasores[0] % tamanho == 0;
    const bordaDireita = invasores[invasores.length - 1] % tamanho == tamanho -1;


// Removendo a classe "invasor" de todos os quadrados que contêm invasores
    invasores.forEach(invasor =>{
        quadrados[invasor].classList.remove("invasor");
    });
    // Verificando as bordas e definindo a direção de movimento dos invasores
    if(bordaEsquerda && direcao == -1){
        direcao = 1;
        descer = true;
    }else if(bordaDireita && direcao ==1){
        direcao = -1;
        descer = true;
    }
    // Movendo os invasores
    for(let i = 0; i < invasores.length; i++){
        invasores[i] += descer ? tamanho : direcao;
    }

    descer = false;
    // Adicionando a classe "invasor" aos quadrados que contêm invasores, exceto aos invasores já atingidos
    invasores.forEach((invasor, indice) =>{
        if(!atingidos.includes(indice)){
            quadrados[invasor].classList.add("invasor");
        }    
    });

    // Verificando se os invasores chegaram à parte inferior da grade
    if(invasores[invasores.length -1] > quadrados.length - tamanho){
        alert("REPROVADO!");
        clearInterval(invasoresId);
    }
    // Verificando se o jogador foi atingido por algum invasor
    if(quadrados[posicaoJogador].classList.contains("invasor")){
        alert("REPROVADOO!!")
        quadrados[posicaoJogador].classList.add("kabum")
        clearInterval(invasoresId);
    }
    // Verificando se todos os invasores foram atingidos
    if(atingidos.length == invasores.length){
        alert("Voce venceu!");
        clearInterval(invasoresId);
    }
}
// Função para atirar
function atirar(e){
    let tiroId;
    let posicaoTiro = posicaoJogador;

    if(e.keyCode ==32){ //espaco
        tiroId = setInterval(moverTiro, 100);   
    }
     // Função para mover o tiro
    function moverTiro(){
        quadrados[posicaoTiro].classList.remove("tiro");
        posicaoTiro -= tamanho;
        quadrados[posicaoTiro].classList.add("tiro");

        // Verificando se o tiro atingiu algum invasor
        if(quadrados[posicaoTiro].classList.contains("invasor")){
            quadrados[posicaoTiro].classList.remove("tiro");
            quadrados[posicaoTiro].classList.remove("invasor");
            quadrados[posicaoTiro].classList.add("kabum");


            // Removendo a classe "kabum" após um tempo
            setTimeout(() =>{
                quadrados[posicaoTiro].classList.remove("kabum");



            },300);

            clearInterval(tiroId);  
             // Armazenando o índice do invasor atingido para evitar duplicatas
            atingidos.push(invasores.indexOf(posicaoTiro));
            pontos++;
            pontuacao.innerHTML = pontos;


            
        }
        // Verificando se o tiro chegou ao topo da grade
        if(posicaoTiro < tamanho){
            clearInterval(tiroId);
            quadrados[posicaoTiro].classList.remove("tiro");
        }
        
    }
}

//keyup é um evento que ocorre quando uma tecla é liberada após ser pressionada. Em outras palavras, quando você solta uma tecla do teclado, o evento keyup é acionado.//
//keydown é um evento que ocorre quando uma tecla é pressionada no teclado. Em outras palavras, quando você pressiona uma tecla, o evento keydown é acionado.//
//keyCode é uma propriedade numérica presente no objeto de evento gerado quando ocorre um evento relacionado a uma tecla pressionada no teclado. Ela representa o valor numérico único atribuído a cada tecla do teclado.//