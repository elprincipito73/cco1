
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let currentStep = 0;

const story = [
    {
        text: "Te encuentras en un **bosque (forest)** oscuro (dark). A tu izquierda hay un **camino (path)** azul y a tu derecha hay un **camino** amarillo. ¿Cuál eliges?",
        options: [
            { color: 'blue', label: 'Camino Azul', nextStep: 1 },
            { color: 'yellow', label: 'Camino Amarillo', nextStep: 2 }
        ]
    },
    {
        text: "Has elegido el **camino** azul y encuentras un **río (river)** tranquilo (calm). ¿Cruzas (cross) el **río** o sigues caminando (walking)?",
        options: [
            { color: 'blue', label: 'Cruzar el Río', nextStep: 3 },
            { color: 'yellow', label: 'Seguir Caminando', nextStep: 4 }
        ]
    },
    {
        text: "Has elegido el **camino** amarillo y encuentras una **cueva (cave)** oscura (dark). ¿Entras (enter) en la **cueva** o sigues caminando?",
        options: [
            { color: 'blue', label: 'Entrar en la Cueva', nextStep: 5 },
            { color: 'yellow', label: 'Seguir Caminando', nextStep: 6 }
        ]
    },
    {
        text: "Cruzas el **río** y encuentras una **aldea (village)** de **pescadores (fishermen)**. ¿Te quedas (stay) en la **aldea** o sigues explorando (exploring)?",
        options: [
            { color: 'blue', label: 'Quedarse en la Aldea', nextStep: 7 },
            { color: 'yellow', label: 'Seguir Explorando', nextStep: 8 }
        ]
    },
    {
        text: "Sigues caminando y encuentras una **pradera (meadow)**. ¿Descansas (rest) en la **pradera** o sigues caminando?",
        options: [
            { color: 'blue', label: 'Descansar en la Pradera', nextStep: 9 },
            { color: 'yellow', label: 'Seguir Caminando', nextStep: 10 }
        ]
    },
    {
        text: "Entras en la **cueva** y encuentras un **tesoro (treasure)**. ¿Te llevas (take) el **tesoro** o sigues explorando la **cueva**?",
        options: [
            { color: 'blue', label: 'Llevarse el Tesoro', nextStep: 11 },
            { color: 'yellow', label: 'Seguir Explorando', nextStep: 12 }
        ]
    },
    {
        text: "Sigues caminando y encuentras un **lago (lake)**. ¿Te detienes (stop) a nadar (swim) o sigues caminando?",
        options: [
            { color: 'blue', label: 'Nadar en el Lago', nextStep: 13 },
            { color: 'yellow', label: 'Seguir Caminando', nextStep: 14 }
        ]
    },
    {
        text: "Te quedas en la **aldea** y vives una vida tranquila (calm). ¡Fin!",
        options: []
    },
    {
        text: "Sigues explorando y encuentras una **montaña (mountain)**. ¡Fin!",
        options: []
    },
    {
        text: "Descansas en la **pradera** y te quedas dormido (fall asleep). ¡Fin!",
        options: []
    },
    {
        text: "Sigues caminando y llegas a una **ciudad (city)**. ¡Fin!",
        options: []
    },
    {
        text: "Te llevas el **tesoro** y te conviertes en rico (rich). ¡Fin!",
        options: []
    },
    {
        text: "Encuentras un **pasaje (passage)** secreto (secret) que te lleva a una **aventura (adventure)** aún mayor. ¡Fin!",
        options: []
    },
    {
        text: "Nadas en el **lago** y te sientes rejuvenecido (rejuvenated). ¡Fin!",
        options: []
    },
    {
        text: "Sigues caminando y encuentras una **cascada (waterfall)**. ¡Fin!",
        options: []
    }
];

function drawStory() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const current = story[currentStep];
    
    context.font = '30px Arial';
    context.fillStyle = 'black';
    const lines = getLines(context, current.text, 700);
    lines.forEach((line, index) => {
        context.fillText(line, 50, 100 + index * 40);
    });
    
    if (current.options.length > 0) {
        const blueOption = current.options.find(option => option.color === 'blue');
        const yellowOption = current.options.find(option => option.color === 'yellow');
        
        drawOption(200, 400, 'lightblue', blueOption.label, blueOption.nextStep);
        drawOption(200, 500, 'lightyellow', yellowOption.label, yellowOption.nextStep);
    }
}

function drawOption(x, y, color, label, nextStep) {
    context.fillStyle = color;
    context.fillRect(x, y, 400, 60);
    context.fillStyle = 'black';
    context.fillText(label, x + 10, y + 40);
    
    canvas.addEventListener('click', function clickHandler(event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (clickX >= x && clickX <= x + 400 && clickY >= y && clickY <= y + 60) {
            currentStep = nextStep;
            drawStory();
            canvas.removeEventListener('click', clickHandler);
        }
    });
}

function getLines(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = context.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

drawStory();
