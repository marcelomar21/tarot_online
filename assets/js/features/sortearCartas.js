import { cartas } from './cartas.js';

export function sortearCartas() {
    const cartasSorteadas = [];
    while (cartasSorteadas.length < 3) {
        const cartaAleatoria = cartas[Math.floor(Math.random() * cartas.length)];
        if (!cartasSorteadas.includes(cartaAleatoria)) {
            cartasSorteadas.push(cartaAleatoria);
        }
    }
    return cartasSorteadas;
}

export function jogarTarot() {
    const cartasSorteadas = sortearCartas();

    document.getElementById('img1').src = cartasSorteadas[0].imagem; 
    document.getElementById('img2').src = cartasSorteadas[1].imagem;
    document.getElementById('img3').src = cartasSorteadas[2].imagem;

    const interpretacao = cartasSorteadas.map(carta => `${carta.nome}: ${carta.interpretacao}`).join('\n');
    document.getElementById('interpretation').innerText = interpretacao;

    setTimeout(() => window.exibirFogos(), 100);
}