// js/load-partials.js

const partials = [
  { selector: '#navbar-placeholder', url: 'partials/navbar.html' },
  { selector: '#hero-placeholder', url: 'partials/hero.html' },
  { selector: '#main-content-placeholder', url: 'partials/main-content.html' },
  { selector: '#footer-placeholder', url: 'partials/footer.html' }
];

document.addEventListener("DOMContentLoaded", function() {
  let loadedCount = 0;
  const totalPartials = partials.length;

  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount === totalPartials) {
      // Once all partials are loaded, initialize features:
      if (typeof initAnimation === "function") {
        initAnimation();
      }
      if (typeof initCharts === "function") {
        initCharts();
      }
      
      // Initialize Slick slider if the slider element exists
      if ($('.dissertation-slider').length > 0) {
        $('.dissertation-slider').slick({
          autoplay: true,
          autoplaySpeed: 5000, // slide changes every 5 seconds
          dots: true,
          arrows: true,
          adaptiveHeight: true,
          fade: false,
          pauseOnHover: true
        });
      }
      
      // Check if a hash is present in the URL and scroll to it.
      if (window.location.hash) {
        const hashElement = document.querySelector(window.location.hash);
        if (hashElement) {
          // Scroll into view with smooth behavior.
          hashElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }  

  partials.forEach(partial => {
    fetch(partial.url)
      .then(response => response.text())
      .then(html => {
        document.querySelector(partial.selector).innerHTML = html;
        checkAllLoaded();
      })
      .catch(error => console.error("Error loading " + partial.url + ":", error));
  });
});
