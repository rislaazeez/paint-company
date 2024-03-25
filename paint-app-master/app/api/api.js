// api.js
const fetchPaintsData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/paint_inventory/view_paint_inventory/`, {
        method: "GET", // Use "GET" method for fetching data
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch paints data'); // Throw an error if response is not OK
      }
  
      const json = await response.json(); // Parse response JSON
      setPaintsData(json); // Set paints data state
    } catch (error) {
      console.error('Error fetching paints data:', error);
    }
  };
  