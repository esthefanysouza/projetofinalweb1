let palavras = ["MELANCIA", "BANANA", "ABACAXI", "MANGA", "COCO", "UVA", "PESSEGO", "MORANGO", "GOIABA", "JABUTICABA", "TANGERINA", "CEREJA", "FRAMBOESA", "CAQUI", "FIGO", "ACEROLA", "GRAVIOLA", "KIWI", "PITANGA", "MARACUJA", "LARANJA"];
let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
let tentativasRestantes = [6, 6]; 
let jogadorAtual = 1;
let letrasCorretas = [];
let teclasUsadasJogador1 = [];
let teclasUsadasJogador2 = [];

const palavraContainer1 = document.querySelectorAll('.word-container')[0];
const palavraContainer2 = document.querySelectorAll('.word-container')[1];
const statusJogador = document.getElementById('turno-jogador');
const tecladoContainer = document.querySelector('.keyboard');
const forca1 = document.getElementById('forca1');
const forca2 = document.getElementById('forca2');

function criarTeclado() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    tecladoContainer.innerHTML = ''; 

    letras.forEach(function(letra) {
        const botao = document.createElement('button');
        botao.textContent = letra;
        botao.classList.add('key');
        botao.addEventListener('click', teclaClicada);
        tecladoContainer.appendChild(botao);
    });
}

function exibirPalavra() {
    const palavraAtual = palavraSecreta.split('').map(function(letra) {
        return letrasCorretas.includes(letra) ? letra : '_';
    }).join(' ');
    palavraContainer1.textContent = palavraAtual;
    palavraContainer2.textContent = palavraAtual;
}

function atualizarBoneco(jogador) {
    const partes = ["cabeca", "corpo", "braco-direito", "braco-esquerdo", "perna-direita", "perna-esquerda"];
    const forca = jogador === 1 ? forca1 : forca2;
    const erros = 6 - tentativasRestantes[jogador - 1];

    partes.forEach(function(parte, index) {
        const elemento = document.getElementById(parte + jogador);
        if (index < erros) {
            elemento.style.display = 'block';
        } else {
            elemento.style.display = 'none';
        }
    });
}

function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    statusJogador.textContent = 'É a vez do Jogador ' + jogadorAtual;
}

function teclaClicada(event) {
    const tecla = event.target;
    const letra = tecla.textContent.toUpperCase();

    if (tecla.classList.contains('usada')) return;

    if (jogadorAtual === 1 && teclasUsadasJogador1.includes(letra)) return;
    if (jogadorAtual === 2 && teclasUsadasJogador2.includes(letra)) return;

    tecla.classList.add('usada');
    tecla.classList.add('jogador' + jogadorAtual);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        exibirPalavra();

        if (!palavraContainer1.textContent.includes('_')) {
            statusJogador.textContent = 'Jogador ' + jogadorAtual + ' venceu!';
            statusJogador.style.color = 'lightgreen';
            tecladoContainer.querySelectorAll('button').forEach(function(tecla) {
                tecla.disabled = true;
            });
            exibirBotaoReiniciar(); 
            return; 
        }
    } else {
        tentativasRestantes[jogadorAtual - 1]--;
        atualizarBoneco(jogadorAtual);

        if (tentativasRestantes[jogadorAtual - 1] === 0) {
            statusJogador.textContent = 'Jogador ' + jogadorAtual + ' perdeu!';
            statusJogador.style.color = 'red'; 
            palavraContainer1.textContent = palavraSecreta; 
            palavraContainer2.textContent = palavraSecreta;
            exibirBotaoReiniciar();  
        tecladoContainer.querySelectorAll('button').forEach(function(tecla) {
                tecla.disabled = true;
            });
            return;  
        }

        
        trocarJogador();
    }


    if (jogadorAtual === 1) {
        teclasUsadasJogador1.push(letra);
    } else {
        teclasUsadasJogador2.push(letra);
    }
}

function exibirBotaoReiniciar() {
    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.textContent = 'Reiniciar Jogo';
    botaoReiniciar.classList.add('nova-partida');
    botaoReiniciar.addEventListener('click', reiniciarJogo);
    document.body.appendChild(botaoReiniciar);
}

function reiniciarJogo() {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    tentativasRestantes = [6, 6];
    letrasCorretas = [];
    teclasUsadasJogador1 = [];
    teclasUsadasJogador2 = [];
    jogadorAtual = 1;
    statusJogador.textContent = 'É a vez do Jogador 1';
    statusJogador.style.color = 'black'; 

    palavraContainer1.textContent = '';
    palavraContainer2.textContent = '';
    forca1.querySelectorAll('.parte-boneco').forEach(function(parte) {
        parte.style.display = 'none';
    });
    forca2.querySelectorAll('.parte-boneco').forEach(function(parte) {
        parte.style.display = 'none';
    });

    document.querySelector('button.nova-partida').remove();

    criarTeclado();
    exibirPalavra();
}

criarTeclado();
exibirPalavra();
statusJogador.textContent = 'É a vez do Jogador 1';