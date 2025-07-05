// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

document.getElementById('getImagesBtn').addEventListener('click', () => {
  fetch (`https://api.nasa.gov/planetary/apod?start_date=${startInput.value}&end_date=${endInput.value}&api_key=eVzMWNWcPnJnJQuAl1h9CYnoXqeRrjY2RMM13h8V`)
    .then(response => response.json())
    .then(data => {
      gallery.innerHTML = ''; // Clear previous images
      data.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.title;
        imgElement.title = image.title;
        galleryItem.appendChild(imgElement);

        // Create a container for title and date
        const infoRow = document.createElement('div');
        infoRow.classList.add('info-row'); // Add a class for styling

        // Create a paragraph element for the image title (left)
        const titleElement = document.createElement('p');
        titleElement.textContent = image.title;
        titleElement.classList.add('image-title'); // Add a class for styling

        // Create a paragraph element for the image date (right)
        const dateElement = document.createElement('p');
        dateElement.textContent = image.date;
        dateElement.classList.add('image-date'); // Add a class for styling

        // Add title and date to the info row
        infoRow.appendChild(titleElement);
        infoRow.appendChild(dateElement);

        // Add the info row under the image
        galleryItem.appendChild(infoRow);

        // When the user clicks a gallery item, show the modal
        galleryItem.addEventListener('click', () => {
          showModal(image);
        });

        gallery.appendChild(galleryItem);
      });
    })
});

// Add a Bootstrap modal to the page if it doesn't exist
function ensureBootstrapModal() {
  if (!document.getElementById('nasaModal')) {
    const modalHtml = `
      <div class="modal fade" id="nasaModal" tabindex="-1" aria-labelledby="nasaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="nasaModalLabel"></h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              <img id="nasaModalImg" src="" alt="" class="img-fluid rounded mb-3" style="max-height:350px;object-fit:contain;">
              <p id="nasaModalDate" class="text-muted mb-2"></p>
              <p id="nasaModalExplanation" class="text-start"></p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
}

// Function to show the Bootstrap modal with image details
function showModal(image) {
  ensureBootstrapModal();

  // Set modal content
  document.getElementById('nasaModalLabel').textContent = image.title;
  const modalImg = document.getElementById('nasaModalImg');
  modalImg.src = image.url;
  modalImg.alt = image.title;
  document.getElementById('nasaModalDate').textContent = image.date;
  document.getElementById('nasaModalExplanation').textContent = image.explanation;

  // Show the modal using Bootstrap's API
  const modal = new bootstrap.Modal(document.getElementById('nasaModal'));
  modal.show();
}
  modalBox.appendChild(modalTitle);
  modalBox.appendChild(modalDate);
  modalBox.appendChild(modalExplanation);
  modalBox.appendChild(closeBtn);

  // Add the modal box to the background
  modalBg.appendChild(modalBox);

  // Add the modal background to the body
  document.body.appendChild(modalBg);

  // Allow closing modal by clicking outside the box
  modalBg.addEventListener('click', (event) => {
    if (event.target === modalBg) {
      document.body.removeChild(modalBg);
    }
  });

  // Allow closing modal with Escape key
  document.addEventListener('keydown', function escListener(e) {
    if (e.key === 'Escape') {
      if (document.body.contains(modalBg)) {
        document.body.removeChild(modalBg);
        document.removeEventListener('keydown', escListener);
      }
    }
  });
