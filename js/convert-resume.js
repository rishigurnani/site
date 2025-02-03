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
      // Set options for html2pdf
      const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      // Convert the container's HTML to PDF and output as a blob URL.
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

