// @ts-check

const ITEM_COUNT = 32;
const IMAGE_DIR = "./";
const IMAGE_LIST = [
    { image: "cable.svg", scale: 1.0 },
    { image: "capacitor-c.svg", scale: 0.6 },
    { image: "capacitor-e.svg", scale: 1.0 },
    { image: "memory.svg", scale: 1.0 },
];
const MIN_SIZE = 100;
const MAX_SIZE = 300;
const MIN_SPEED = 1;
const MAX_SPEED= 3;
const MIN_ROTATION_PERIOD = 2;
const MAX_ROTATION_PERIOD = 60;
const DIRECTION_LIST = [
    "clockwize-anim",
    "counterclock-anim",
];

function dropItems(container, header, footer) {
    const headerHeight = header.clientHeight;
    const footerHeight = footer.clientHeight;

    for (let i = 1; i <= ITEM_COUNT; i++) {
        const img = document.createElement("img");
        img.style.position = "absolute";
        img.style.top =  "-" + (MAX_SIZE * 1.5) + "px";
        dropCharacterFromTop(container.appendChild(img));
    }

    function dropCharacterFromTop(img) {
        const containerWidth = container.clientWidth;

        const { image, scale } = chooseAtRandom(IMAGE_LIST);
        const rotationDirection = chooseAtRandom(DIRECTION_LIST);

        const size = randomNum(MIN_SIZE, MAX_SIZE) * scale; 
        const ySpeed = randomFloatNum(MIN_SPEED, MAX_SPEED);
        const xPosition = randomFloatNum(0, containerWidth) - MAX_SIZE / 2;

        img.src = IMAGE_DIR + image;

        img.style.width = size + "px";
        img.style.height = size + "px";
        img.style.left = xPosition + "px";
        img.style.margin = (MAX_SIZE - size) / 2 + "px";
        img.style.animation = rotationDirection + " " + randomNum(MIN_ROTATION_PERIOD, MAX_ROTATION_PERIOD) + "s linear 0s infinite";

        let yPosition = -1 * (MAX_SIZE * 1.5) + headerHeight;
        (function animeLoop() {
            const requestAnim = window.requestAnimationFrame(animeLoop);

            yPosition += ySpeed;
            img.style.top = yPosition + "px";

            const containerHeight = container.clientHeight;
            if (yPosition >= (containerHeight - footerHeight + MAX_SIZE * 0.25)) {
                window.cancelAnimationFrame(requestAnim);
                return dropCharacterFromTop(img);
            }
        })();
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

dropItems(document.querySelector("main"), document.querySelector("header"), document.querySelector("footer"))
