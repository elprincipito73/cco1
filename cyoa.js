
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const stories = {
    start: {
        text: "Estás en un bosque oscuro. Hay dos caminos frente a ti.",
        options: [
            { text: "Tomar el camino de la izquierda", next: "leftPath" },
            { text: "Tomar el camino de la derecha", next: "rightPath" }
        ]
    },
    leftPath: {
        text: "Sigues el camino de la izquierda y encuentras un río. ¿Qué haces?",
        options: [
            { text: "Cruzar el río", next: "crossRiver" },
            { text: "Seguir el río hacia el norte", next: "followRiver" }
        ]
    },
    rightPath: {
        text: "Sigues el camino de la derecha y te encuentras con un lobo. ¿Qué haces?",
        options: [
            { text: "Intentar asustar al lobo", next: "scareWolf" },
            { text: "Retroceder lentamente", next: "goBack" }
        ]
    },
    crossRiver: { text: "Cruzas el río y llegas a un pequeño pueblo. ¡Fin!" },
    followRiver: { text: "Sigues el río y encuentras una cueva escondida. ¡Fin!" },
    scareWolf: { text: "El lobo se asusta y huye. Encuentras un tesoro escondido. ¡Fin!" },
    goBack: { text: "Retrocedes y vuelves al inicio. ¡Fin!" }
};

let currentStory = stories.start;

function drawText(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Arial';
    ctx.fillText(text, 50, 50);
}

function drawOptions(options) {
    options.forEach((option, index) => {
        ctx.fillText(`${index + 1}. ${option.text}`, 50, 100 + index * 30);
    });
}

function renderStory() {
    drawText(currentStory.text);
    if (currentStory.options) {
        drawOptions(currentStory.options);
    } else {
        ctx.fillText('Fin', 50, 100);
    }
}

document.addEventListener('keydown', (event) => {
    if (!currentStory.options) return;

    const optionIndex = parseInt(event.key, 10) - 1;
    if (optionIndex >= 0 && optionIndex < currentStory.options.length) {
        currentStory = stories[currentStory.options[optionIndex].next];
        renderStory();
    }
});

renderStory();
