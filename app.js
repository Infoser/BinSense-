import { fetchBinData } from "./thingspeak.js"; // Import ThingSpeak function

// Initialize the map centered on BIT Durg
const map = L.map('map').setView([21.1909, 81.2849], 16);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Custom dustbin icons based on status
const binIcons = {
  Full: L.icon({
    iconUrl: 'red dustbin.jpg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
  Moderate: L.icon({
    iconUrl: 'yellow dustbin.jpg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
  Empty: L.icon({
    iconUrl: 'green bin.jpg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
};

async function updateBinStatus() {
  const fillLevel = await fetchBinData(); // Get data from ThingSpeak

  let status = "Empty";
  if (fillLevel < 20) status = "Full";
  else if (fillLevel < 50) status = "Moderate";

  // Define bin locations (assuming multiple bins use the same fill level for now)
  const bins = [
    { lat: 21.1909, lng: 81.2849, status: status },
    { lat: 21.1912, lng: 81.2835, status: status },
    { lat: 21.1905, lng: 81.2850, status: status },
  ];

  // Clear old markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add updated markers
  bins.forEach((bin, index) => {
    L.marker([bin.lat, bin.lng], { icon: binIcons[bin.status] })
      .addTo(map)
      .bindPopup(`<b>Bin ${index + 1}</b><br>Status: ${bin.status}`);
  });
}

// Update bin status every 15 seconds (ThingSpeak refresh rate)
setInterval(updateBinStatus, 15000);
updateBinStatus();
