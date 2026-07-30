// Load venue data with error handling
async function loadVenues() {
  try {
    const response = await fetch('venues.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading venues:', error);
    return [];
  }
}

// Filter venues based on selections
function filterVenues(data) {
  const city = document.getElementById('city').value;
  const type = document.getElementById('type').value;
  const size = document.getElementById('size').value;
  const cost = document.getElementById('cost').value;
  const tech = document.getElementById('tech').value;
  const access = document.getElementById('access').value;
  const setup = document.getElementById('setup').value;

  return data.filter(v => {
    if (city && (!v.city || !v.city.includes(city))) return false;
    if (type && v.type !== type) return false;
    if (size && v.size !== size) return false;
    if (cost && v.cost !== cost) return false;
    if (tech && v.tech !== tech) return false;
    if (access && v.access !== access) return false;
    if (setup && v.setup !== setup) return false;
    return true;
  });
}

let currentIndex = 0;
let currentResults = [];

// Helper function to safely create text cells (Prevents XSS / Injection)
function createCell(text) {
  const td = document.createElement('td');
  td.textContent = text || 'Not listed';
  return td;
}

// Generate output table safely
function generateTable(results, startIndex = 0) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!results || results.length === 0) {
    output.innerHTML = '<p>No venues found. Try adjusting filters.</p>';
    return;
  }

  // Title and timestamp
  const title = document.createElement('h2');
  title.textContent = 'Venue Finder Results';
  
  const timestamp = document.createElement('p');
  const now = new Date();
  timestamp.textContent = `Generated ${now.toLocaleString('en-US', { timeZone: 'America/Denver' })} (MST)`;

  // Table
  const table = document.createElement('table');
  table.classList.add('results-table');
  
  // Table Header
  const headerRow = document.createElement('tr');
  ['Cost', 'Size', 'Tech', 'Access', 'Type', 'Setup', 'Contact'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Table Data Rows (Safely constructed)
  const slice = results.slice(startIndex, startIndex + 5);
  slice.forEach(v => {
    const row = document.createElement('tr');
    row.appendChild(createCell(v.cost));
    row.appendChild(createCell(v.size));
    row.appendChild(createCell(v.tech));
    row.appendChild(createCell(v.access));
    row.appendChild(createCell(v.type));
    row.appendChild(createCell(v.setup));
    row.appendChild(createCell(v.contact));
    table.appendChild(row);
  });

  // Disclaimer
const disclaimer = document.createElement('p');
disclaimer.textContent =
  'Results are for volunteer planning purposes only. Verify details before scheduling.';

// Pagination Controls
if (results.length > startIndex + 5) {
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Show next five';
  nextButton.style.marginTop = '10px';
  nextButton.onclick = () => {
    generateTable(results, startIndex + 5);
  };
  output.appendChild(nextButton);
}

if (startIndex >= 5) {
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Show previous five';
  prevButton.style.marginTop = '10px';
  prevButton.onclick = () => {
    generateTable(results, startIndex - 5);
  };
  output.appendChild(prevButton);
}

// Append elements
output.appendChild(title);
output.appendChild(timestamp);
output.appendChild(table);
output.appendChild(disclaimer);
}
