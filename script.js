// ===========================
// SELECT ELEMENTS
// ===========================

const galleryImages = document.querySelectorAll(".gallery .image");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const searchBox = document.getElementById("searchBox");
const noResults = document.getElementById("noResults");
const preloader = document.getElementById("preloader");
const themeToggle = document.getElementById("themeToggle");
const downloadBtn = document.getElementById("downloadBtn");
const imageCounter = document.getElementById("imageCounter");

let currentIndex = 0;
let slideshow;

// ===========================
// SHOW IMAGE
// ===========================

function showImage() {

    const img = galleryImages[currentIndex].querySelector("img");

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;

    downloadBtn.href = img.src;

    imageCounter.textContent =
        `${currentIndex + 1} / ${galleryImages.length}`;
}

// ===========================
// OPEN LIGHTBOX
// ===========================

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentIndex = index;

        showImage();

        lightbox.style.display = "flex";

        startSlideshow();

    });

});

// ===========================
// NEXT
// ===========================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    }

    showImage();

});

// ===========================
// PREVIOUS
// ===========================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }

    showImage();

});

// ===========================
// CLOSE LIGHTBOX
// ===========================

closeBtn.addEventListener("click", () => {

    stopSlideshow();

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        stopSlideshow();

        lightbox.style.display = "none";

    }

});

// ===========================
// FILTER
// ===========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryImages.forEach(image => {

            if (filter === "all" || image.classList.contains(filter)) {

                image.style.display = "block";

            } else {

                image.style.display = "none";

            }

        });

        // Clear search after filtering
        searchBox.value = "";
        noResults.style.display = "none";

    });

});

// ===========================
// SEARCH
// ===========================

searchBox.addEventListener("keyup", function () {

    const value = this.value.toLowerCase().trim();

    let found = false;

    galleryImages.forEach(image => {

        const caption = image.querySelector(".caption").textContent.toLowerCase();
        const category = [...image.classList].join(" ").toLowerCase();

        if (
            caption.includes(value) ||
            category.includes(value)
        ) {

            image.style.display = "block";
            found = true;

        } else {

            image.style.display = "none";

        }

    });

    noResults.style.display = found ? "none" : "block";

});

// ===========================
// PRELOADER
// ===========================

window.addEventListener("load", () => {

    if (preloader) {
        preloader.style.display = "none";
    }

});

// ===========================
// DARK MODE
// ===========================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

});

// ===========================
// KEYBOARD
// ===========================

document.addEventListener("keydown", (e) => {

    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") nextBtn.click();

    if (e.key === "ArrowLeft") prevBtn.click();

    if (e.key === "Escape") closeBtn.click();

});

// ===========================
// SLIDESHOW
// ===========================

function startSlideshow() {

    stopSlideshow();

    slideshow = setInterval(() => {

        currentIndex++;

        if (currentIndex >= galleryImages.length) {
            currentIndex = 0;
        }

        showImage();

    }, 3000);

}

function stopSlideshow() {

    clearInterval(slideshow);

}