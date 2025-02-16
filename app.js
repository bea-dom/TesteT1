let numerosScretos=[];



function alteraTexto(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    qddChute++;
    console.log(`o chute ${qddChute} foi o valor ${chute}`);
    
    if (chute == numeroSecreto){
        alteraTexto('h1','Voce Acertou!');
        let tentativa= qddChute == 1? 'tentativa':'tentativas';
        alteraTexto('p',`parabens, com ${qddChute} ${tentativa} voce encontrou o numero secreto`);
        console.log(`o usario acertou o numero secreto na ${tentativa} ${qddChute}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute<1, chute>valormaximo){
            alteraTexto('p', `ATENCAO: voce inseriu um valor fora do intervalo, por favor digite um numero entre 1 e ${valormaximo}`);
            console.log(`chute ${qddChute} foi desconsiderado pois o usuario inseriu um valor invalido`);
        } else {
            let dica = chute > numeroSecreto ? 'menor':'maior';
            alteraTexto('p', `o numero secreto e ${dica}`);
        }
        limparCampo();
    }
}

function limparCampo(){
    campo = document.querySelector('input');
    campo.value = '';
}

function gerarNumeroAleatorio(max){
    return parseInt(Math.random()*max+1);
}


function iniciarJogo(){
    limparCampo();
    alteraTexto('h1','Jogo do numero Secreto');
    alteraTexto('p', 'Escolha um numero entre 1 e 10');
    
    qddChute = 0;
    numeroSecreto = gerarNumeroAleatorio(valormaximo);
    console.log(`Numero Secreto eh ${numeroSecreto}`);
    
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function reiniciarjogo(){
    iniciarJogo();
    console.log('usuario reiniciou o jogo');
}

let qddChute;
let valormaximo = 30;
let numeroSecreto;
iniciarJogo();
