let currentSlide = 0;

function updateCarousel() {
  const carousel = document.getElementById("carousel");
  const slideWidth = 1000;
  carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
  const totalSlides = document.querySelectorAll(".slide").length;
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
}
