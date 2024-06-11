// @ts-check

const ITEM_COUNT = 32;
const IMAGE_LIST = [
    { image: "./cable.svg", scale: 1.0 },
    { image: "./capacitor-c.svg", scale: 0.6 },
    { image: "./capacitor-e.svg", scale: 1.0 },
    { image: "./memory.svg", scale: 1.0 },
];
const MIN_SIZE = 100;
const MAX_SIZE = 300;
const MIN_SPEED = 100;
const MAX_SPEED= 300;
const MIN_ROTATION_PERIOD = 2;
const MAX_ROTATION_PERIOD = 60;

let latestDocumentVisible = performance.now();
addEventListener("visibilitychange", () => {
    if (document.visibilityState == "visible") {
        latestDocumentVisible = performance.now();
    }
});

function dropItems(container) {
    for (let i = 0; i < ITEM_COUNT; i++) {
        const img = document.createElement("img");
        img.style.position = "absolute";
        img.style.top = `-${MAX_SIZE * 1.5}px`;
        dropCharacterFromTop(container.appendChild(img));
    }

    function dropCharacterFromTop(img) {
        const containerWidth = container.clientWidth;

        const { image, scale } = chooseAtRandom(IMAGE_LIST);
        const rotationDirection = chooseAtRandom(["", "reverse"]);

        const size = randomNum(MIN_SIZE, MAX_SIZE) * scale; 
        const ySpeed = randomFloatNum(MIN_SPEED, MAX_SPEED);
        const xPosition = randomFloatNum(0, containerWidth) - MAX_SIZE / 2;
        const rotationPeriod = randomNum(MIN_ROTATION_PERIOD, MAX_ROTATION_PERIOD)

        img.src = image;

        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        img.style.left = `${xPosition}px`;
        img.style.margin = `${(MAX_SIZE - size) / 2}px`;
        img.style.animation = `rotation-anim ${rotationDirection} ${rotationPeriod}s linear 0s infinite`;

        let yPosition = -1 * (MAX_SIZE * 1.5);
        let prevTimestamp = performance.now();
        (function animeLoop(timestamp) {
            if (prevTimestamp < latestDocumentVisible) {
                prevTimestamp = latestDocumentVisible;
            }
            const elapsed = timestamp - prevTimestamp;
            prevTimestamp = timestamp;

            yPosition += ySpeed * elapsed / 1000;
            img.style.top = `${yPosition}px`;

            const containerHeight = container.clientHeight;
            if (yPosition >= (containerHeight + MAX_SIZE * 0.25)) {
                dropCharacterFromTop(img);
            } else {
                window.requestAnimationFrame(animeLoop);
            }
        })(prevTimestamp);
    }
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function randomFloatNum(min, max) {
    return Math.random() * (max - min) + min;
}

function chooseAtRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

dropItems(document.querySelector("main"))