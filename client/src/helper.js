export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Date.now() / 1000;

  return payload.exp < currentTime;
};

export const getCoordinates = async (place) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      const newCoordinates = [lat, lon];
      
      return newCoordinates;
    }
    else {
      return null;
    }
  };