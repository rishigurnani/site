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

