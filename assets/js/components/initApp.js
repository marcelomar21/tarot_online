import { jogarTarot } from '../features/sortearCartas.js';

function inicializarApp() {
    const button = document.getElementById('drawButton');
    if (button) {
        button.addEventListener('click', jogarTarot);
    } else {
        console.log('Botão não encontrado!');
    }
}

document.addEventListener('DOMContentLoaded', inicializarApp);
