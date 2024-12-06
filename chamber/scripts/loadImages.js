document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('.lazy-load');
  
    const loadImage = (image) => {
      const src = image.getAttribute('data-src');
      if (src) {
        image.src = src;
        image.classList.add('lazy-loaded');
        image.removeAttribute('data-src');
      }
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px 200px 0px", 
    });
  
    lazyImages.forEach(image => {
      observer.observe(image);
    });
  });
  