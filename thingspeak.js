// ThingSpeak Channel Settings
const THINGSPEAK_CHANNEL_ID = "YOUR_CHANNEL_ID";  // Replace with your ThingSpeak Channel ID
const THINGSPEAK_FIELD = 1;  // Assuming Field 1 stores fill level data

// Function to fetch bin data from ThingSpeak
async function fetchBinData() {
  const url = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?results=1`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.feeds.length > 0) {
      const fillLevel = parseInt(data.feeds[0][`field${THINGSPEAK_FIELD}`]);  // Get latest fill level
      return fillLevel;
    }
  } catch (error) {
    console.error("Error fetching data from ThingSpeak:", error);
  }
  return null;
}
