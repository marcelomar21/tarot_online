// fireworks.js

let fireworksInstance = null;

function exibirFogos() {
    const container = document.getElementById('fireworks');
    const button = document.getElementById('drawButton');
    
    if (!container || !button) {
        console.error('Elemento fireworks ou botão não encontrado!');
        return;
    }

    if (typeof Fireworks === 'undefined') {
        console.error('Biblioteca Fireworks não carregada!');
        return;
    }

    if (fireworksInstance) {
        fireworksInstance.stop();
        fireworksInstance = null;
    }

    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonBottomY = buttonRect.bottom;

    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';

    fireworksInstance = new Fireworks.default(container, {
        speed: 2,
        particles: 100,
        explosion: 5,
        gravity: 1.5,
        decay: { min: 0.015, max: 0.03 },
        mouse: { click: false, move: false, max: 1 },
        boundaries: {
            x: 50,
            y: 50,
            width: window.innerWidth - 100,
            height: window.innerHeight - 100
        },
        sound: { enabled: false },
        launch: {
            x: buttonCenterX,
            y: buttonBottomY,
            angle: 270,
            range: 10
        }
    });
    
    fireworksInstance.start();
    
    setTimeout(() => {
        if (fireworksInstance) {
            fireworksInstance.stop();
            fireworksInstance = null;
        }
    }, 5000);
}

// Tornar a função disponível globalmente
window.exibirFogos = exibirFogos;