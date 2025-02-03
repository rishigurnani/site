// js/convert-resume.js

function convertResume() {
  // Fetch the resume.md file from the same directory as index.html
  fetch('resume.md')
    .then(response => response.text())
    .then(md => {
      // Convert Markdown to HTML using marked.parse() (for Marked v4+)
      const htmlContent = marked.parse(md);
      // Create a temporary container for the HTML content
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      // Optional: add styling to the container for a nicer PDF appearance
      container.style.padding = '20px';
      container.style.fontFamily = "'Montserrat', sans-serif";

      // Group resume sections so that each major section (starting with <h2>) is kept together.
      groupResumeSections(container);

      // Set options for html2pdf
      const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      // Convert the container's HTML to PDF and output as a Blob URL.
      html2pdf().set(opt).from(container).outputPdf('bloburl')
        .then(url => {
          // Open the generated PDF in a new browser tab.
          window.open(url, '_blank');
        })
        .catch(err => {
          console.error('Error generating PDF:', err);
          alert('Error generating resume PDF.');
        });
    })
    .catch(err => {
      console.error('Error loading resume.md:', err);
      alert('Error loading resume.');
    });
}

/**
 * Groups consecutive elements starting from an <h2> heading into a container
 * with the style "page-break-inside: avoid", so that each major section
 * won't be split across pages in the PDF.
 *
 * This function looks for <h2> elements within the container, then wraps
 * each <h2> and all following siblings (until the next <h2>) into a new div.
 */
function groupResumeSections(container) {
  // Get an array of the container's child elements.
  const children = Array.from(container.children);
  let currentSection = null;

  children.forEach(child => {
    if (child.tagName === 'H2') {
      // When a new H2 is found, start a new section container.
      currentSection = document.createElement('div');
      // Apply inline style to avoid page-break inside the section.
      currentSection.style.pageBreakInside = 'avoid';
      currentSection.classList.add('page-section');
      // Insert the new section container before the current H2.
      container.insertBefore(currentSection, child);
      // Move the H2 into the new section.
      currentSection.appendChild(child);
    } else {
      // If we already started a section, move this element into it.
      if (currentSection) {
        currentSection.appendChild(child);
      }
    }
  });
}

