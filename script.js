const ACCESS_KEY = "Z_CCTMuLsnDU2m_YE9kwCs1urrjQY84hNt9MreQTN0M";
const apiUrl = `https://api.unsplash.com/search/photos?query=DIAMOND PENDANTS&client_id=${ACCESS_KEY}&per_page=6`;
const mainImage = document.getElementById("mainImage");
const thumbnails = document.getElementById("thumbnails");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const addToCartButton = document.getElementById("addToCartButton");
const confirmationMessage = document.getElementById("confirmationMessage");

let currentImageIndex = 0;
let imageUrls = [];

async function fetchImages() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const photos = data?.results || data;
    imageUrls = photos.map((item) => item.urls.regular);
    updateCarousel();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function updateCarousel() {
  mainImage.src = imageUrls[currentImageIndex];
  thumbnails.innerHTML = "";

  imageUrls.forEach((url, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = url;
    thumbnail.addEventListener("click", () => {
      mainImage.src = url;
      currentImageIndex = index;
    });
    thumbnails.appendChild(thumbnail);
  });
}

prevButton.addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  updateCarousel();
});

addToCartButton.addEventListener("click", () => {
  confirmationMessage.textContent = "Product added to cart!";
  setTimeout(() => {
    confirmationMessage.textContent = "";
  }, 3000);
});

fetchImages();

mainImage.addEventListener("touchstart", handleTouchStart, false);
mainImage.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
  if (!xDown) return;

  let xUp = evt.touches[0].clientX;
  let xDiff = xDown - xUp;

  if (xDiff > 0) {
    // Swipe left logic
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  } else {
    // Swipe right logic
    currentImageIndex =
      (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
  }
  updateCarousel();
  xDown = null;
}
