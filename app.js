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

  const table = document.createElement('table');
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

  output.appendChild(table);
}

// Main click handler
document.getElementById('generate').addEventListener('click', async () => {
  const data = await loadVenues();
  const results = filterVenues(data);
  generateTable(results);
});

