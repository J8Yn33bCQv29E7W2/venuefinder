// Load venue data
async function loadVenues() {
  const response = await fetch('venues.json');
  const data = await response.json();
  return data;
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
    if (city && !v.city.includes(city)) return false;
    if (type && v.type !== type) return false;
    if (size && v.size !== size) return false;
    if (cost && v.cost !== cost) return false;
    if (tech && v.tech !== tech) return false;
    if (access && v.access !== access) return false;
    if (setup && v.setup !== setup) return false;
    return true;
  });
}

// Generate output table
function generateTable(results) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (results.length === 0) {
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
  table.innerHTML = `
    <tr>
      <th>Cost</th>
      <th>Size</th>
      <th>Tech</th>
      <th>Access</th>
      <th>Type</th>
      <th>Setup</th>
      <th>Contact</th>
    </tr>
  `;

  results.slice(0, 5).forEach(v => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${v.cost || 'Not listed'}</td>
      <td>${v.size || 'Not listed'}</td>
      <td>${v.tech || 'Not listed'}</td>
      <td>${v.access || 'Not listed'}</td>
      <td>${v.type || 'Not listed'}</td>
      <td>${v.setup || 'Not listed'}</td>
      <td>${v.contact || 'Not listed'}</td>
    `;
    table.appendChild(row);
  });

  // Disclaimer
  const disclaimer = document.createElement('p');
  disclaimer.textContent = 'Results are for volunteer planning purposes only. Verify details before scheduling.';

  // Append everything
  output.appendChild(title);
  output.appendChild(timestamp);
  output.appendChild(table);
  output.appendChild(disclaimer);
}

let currentIndex = 0;
let currentResults = [];

function generateTable(results, startIndex = 0) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (results.length === 0) {
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
  table.innerHTML = `
    <tr>
      <th>Cost</th>
      <th>Size</th>
      <th>Tech</th>
      <th>Access</th>
      <th>Type</th>
      <th>Setup</th>
      <th>Contact</th>
    </tr>
  `;

  const slice = results.slice(startIndex, startIndex + 5);
  slice.forEach(v => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${v.cost || 'Not listed'}</td>
      <td>${v.size || 'Not listed'}</td>
      <td>${v.tech || 'Not listed'}</td>
      <td>${v.access || 'Not listed'}</td>
      <td>${v.type || 'Not listed'}</td>
      <td>${v.setup || 'Not listed'}</td>
      <td>${v.contact || 'Not listed'}</td>
    `;
    table.appendChild(row);
  });

  // Disclaimer
  const disclaimer = document.createElement('p');
  disclaimer.textContent = 'Results are for volunteer planning purposes only. Verify details before scheduling.';

  // Next Five button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next Five';
  nextButton.style.marginTop = '15px';
  nextButton.addEventListener('click', () => {
    currentIndex += 5;
    if (currentIndex < currentResults.length) {
      generateTable(currentResults, currentIndex);
    } else {
      output.innerHTML = '<p>End of results.</p>';
    }
  });

  // Append everything
  output.appendChild(title);
  output.appendChild(timestamp);
  output.appendChild(table);
  output.appendChild(disclaimer);
  if (results.length > 5) output.appendChild(nextButton);
}

// Main click handler
document.getElementById('generate').addEventListener('click', async () => {
  const data = await loadVenues();
  currentResults = filterVenues(data);
  currentIndex = 0;
  generateTable(currentResults, currentIndex);
});


