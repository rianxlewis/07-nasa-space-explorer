// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Array of fun "Did You Know?" space facts
const spaceFacts = [
  "Did you know? A day on Venus is longer than a year on Venus!",
  "Did you know? Neutron stars can spin at a rate of 600 rotations per second.",
  "Did you know? There are more trees on Earth than stars in the Milky Way.",
  "Did you know? One million Earths could fit inside the Sun.",
  "Did you know? Space is completely silent—there’s no air for sound to travel.",
  "Did you know? The footprints on the Moon will be there for millions of years.",
  "Did you know? Jupiter has the shortest day of all the planets.",
  "Did you know? Saturn could float in water because it’s mostly gas.",
  "Did you know? The hottest planet in our solar system is Venus.",
  "Did you know? A spoonful of a neutron star weighs about a billion tons."
];

// Pick a random fact and show it in the space fact section
const spaceFactDiv = document.getElementById('spaceFact');
const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
spaceFactDiv.textContent = randomFact;

document.getElementById('getImagesBtn').addEventListener('click', () => {
  // Pick and show a new random fact each time photos are loaded
  const newFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  spaceFactDiv.textContent = newFact;

  // Show a loading message before fetching images
  gallery.innerHTML = `
    <div class="loading-message">🔄 Loading space photos…</div>
  `;

  fetch (`https://api.nasa.gov/planetary/apod?start_date=${startInput.value}&end_date=${endInput.value}&api_key=eVzMWNWcPnJnJQuAl1h9CYnoXqeRrjY2RMM13h8V`)
    .then(response => response.json())
    .then(data => {
      gallery.innerHTML = ''; // Clear loading message
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

// Show a custom modal with image details (no Bootstrap)
function showModal(image) {
  // Get modal elements from the page
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalExplanation = document.getElementById('modalExplanation');

  // Set modal content
  modalImg.src = image.url;
  modalImg.alt = image.title;
  modalTitle.textContent = image.title;
  modalDate.textContent = image.date;
  modalExplanation.textContent = image.explanation;

  // Show the modal
  modal.style.display = 'flex';

  // Close modal when close button is clicked
  const closeBtn = document.getElementById('modalClose');
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };

  // Close modal when clicking outside the modal content
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Close modal with Escape key
  document.onkeydown = function(event) {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  };
}
