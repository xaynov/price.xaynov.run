let startX = 0;
let index = 0;
const images = document.querySelectorAll(".gallery img");
const dots = document.querySelectorAll(".dot");
const screenContainer = document.querySelector(".screen-container");

function updateBackground(imageSrc) {
    screenContainer.style.backgroundImage = `url(${imageSrc})`;
}

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active-dot", i === index);
    });
}

function showImage(newIndex) {
    if (newIndex < 0 || newIndex >= images.length) return;

    images.forEach(img => img.classList.remove("active"));
    index = newIndex;
    images[index].classList.add("active");

    updateDots();
    updateBackground(images[index].src);
}

document.querySelector(".gallery").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".gallery").addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) showImage(index + 1);
    else if (startX - endX < -50) showImage(index - 1);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showImage(index + 1);
    else if (e.key === "ArrowLeft") showImage(index - 1);
});

document.querySelector(".gallery").addEventListener("click", (e) => {
    const mid = e.currentTarget.clientWidth / 2;
    if (e.clientX > e.currentTarget.getBoundingClientRect().left + mid) {
        showImage(index + 1);
    } else {
        showImage(index - 1);
    }
});

// Обработка кликов по точкам
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showImage(i));
});

updateBackground(images[index].src);
updateDots();
