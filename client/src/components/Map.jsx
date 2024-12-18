import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuth";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import redMarker from "../assets/red-marker.png";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { getCoordinates } from "../helper";
import Success from "../components/toast/Success";
import Error from "../components/toast/Error";
import Card from "./Card";

function Map({ query }) {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [coverage, setCoverage] = useState(5);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [place, setPlace] = useState("");

  const [bg, setBG] = useState("");
  const [department, setDepartment] = useState("");
  const [nearByUsers, setNearByUsers] = useState([]);
  const [showSelection, setShowSelection] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [distances, setDistances] = useState([]);
  const [directionsUrl, setDirectionsUrl] = useState("");

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const markersArray = useRef([]);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [23.7530215, 90.4248998],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapInstance.current
      );

      mapInstance.current.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]);
        await mapMarker(lat, lng);
      });
    }
  }, [currentLocationName]);

  useEffect(() => {
    if (bg && coordinates.length > 0) {
      const [lat, lon] = coordinates;
      mapMarker(lat, lon);
    }
  }, [bg, coverage, coordinates]);

  const mapMarker = async (lat, lon) => {
    const newCoordinates = [lat, lon];
    if (markerRef.current) {
      markerRef.current.setLatLng(newCoordinates);
    } else {
      markerRef.current = L.marker(newCoordinates, {
        icon: L.icon({
          iconUrl: redMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
      })
        .addTo(mapInstance.current)
        .bindPopup(`Location: ${place}`)
        .openPopup();
    }
    await getPlaceName(lat, lon);
    if (query === "hospital") {
      await fetchNearbyHospitals(lat, lon, coverage);
    } else if (query === "blood") {
      await fetchUsersforBlood(lat, lon, coverage, bg);
    }

    // calculateDistances(lat, lon);
  };

  const getPlaceName = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );
    const data = await response.json();
    const { road, suburb, city, state, country } = data.address || {};
    const detailedAddress = [road, suburb, city, state, country]
      .filter(Boolean)
      .join(", ");
    setCurrentLocationName(detailedAddress || "Location not found");
    if (markerRef.current) {
      markerRef.current.setPopupContent(
        `Location: ${detailedAddress || "Location not found"}`
      );
    }
  };

  //   const calculateDistances = (lat, lon) => {
  //     // Calculate distance to each predefined location
  //     const distancesArray = predefinedCoordinates.map((location) => {
  //       const distance = L.latLng(lat, lon).distanceTo(L.latLng(location.lat, location.lon));
  //       return {
  //         name: location.name,
  //         distance: (distance / 1000).toFixed(2), // convert meters to kilometers
  //       };
  //     });
  //     setDistances(distancesArray);
  //   };

  const searchPlace = async () => {
    const data = await getCoordinates(place);

    if (data) {
      const [lat, lon] = data;
      setCoordinates(data);
      mapInstance.current.setView(data, 13);
      mapMarker(lat, lon);
    } else {
      alert("Place not found");
    }
  };

  const fetchUsersforBlood = async (lat, lon, d, bg) => {
    try {
      const res = await fetch(`/api/protected/find/blood`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longitude: lon,
          latitude: lat,
          maxDistanceInMeters: d * 1000,
          bloodGroup: bg,
        }),
      });
      const users = await res.json();

      markersArray.current.forEach((marker) =>
        mapInstance.current.removeLayer(marker)
      );
      markersArray.current = [];

      if (res.ok) {
        console.log("test: ", users);
        const groupedUsers = {};
        
        setShowSelection(false);

        if(users.message) {
          alert(users.message);
        }

        users?.nearbyUsers?.forEach((user) => {
          const userCoordinates = user.address.coordinates;
          const key = userCoordinates.join(",");

          if (!groupedUsers[key]) {
            groupedUsers[key] = [];
          }

          groupedUsers[key].push(user);
        });
        Object.keys(groupedUsers).forEach((coordinateKey) => {
          const [lon, lat] = coordinateKey
            .split(",")
            .map((coord) => parseFloat(coord));
          const usersAtLocation = groupedUsers[coordinateKey];

          const popupContent = `
          <div>
            <h4>${usersAtLocation.length} User(s) at this location</h4>
            <p>${user.address.place}</p>
          </div>
        `;

          const mark = L.marker([lat, lon])
            .addTo(mapInstance.current)
            .bindPopup(popupContent)
            .on("click", () => {
              setNearByUsers(usersAtLocation);
              setShowSelection(true);
            });

          markersArray.current.push(mark);
        });
      } else {
        setError(`${users.error}. Ex- ${users.emptyFields}`);

        setTimeout(() => {
          setError(null);
        }, 6000);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchNearbyHospitals = async (latitude, longitude, d) => {
    const radius = d * 1000;
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:${radius},${latitude},${longitude});
        way["amenity"="hospital"](around:${radius},${latitude},${longitude});
        relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
      );
      out body;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const hospitals = data.elements;

      markersArray.current.forEach((marker) =>
        mapInstance.current.removeLayer(marker)
      );
      markersArray.current = [];

      hospitals.forEach((hospital) => {
        const lat = hospital.lat || (hospital.nodes && hospital.nodes[0].lat);
        const lon = hospital.lon || (hospital.nodes && hospital.nodes[0].lon);

        if (lat && lon) {
          const popupContent = `
      <div>
        <p>${hospital.tags.name || "Unnamed hospital"}</p>
        <a href="https://maps.google.com/?q=${lat},${lon}" target="_blank" rel="noopener noreferrer">Get Directions</a>
      </div>
    `;
          const mark = L.marker([lat, lon])
            .addTo(mapInstance.current)
            .bindPopup(popupContent);

          markersArray.current.push(mark);

          mark.on("click", async () => {
            if (routingControlRef.current) {
              routingControlRef.current.remove();
            }
            const directionsLink = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lon}&travelmode=driving`;
            setDirectionsUrl(directionsLink);
            await getPlaceName(lat, lon);

            routingControlRef.current = L.Routing.control({
              waypoints: [L.latLng(latitude, longitude), L.latLng(lat, lon)],
              createMarker: function () {
                return null;
              },
              routeWhileDragging: true,
            }).addTo(mapInstance.current);
          });
        }
      });
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentCoordinates = [latitude, longitude];
          setCoordinates(currentCoordinates);
          mapInstance.current.setView(currentCoordinates, 13);
          mapMarker(latitude, longitude);
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="flex items-center flex-col gap-x-4 mt-5">
        {query === "blood" && (
          <div className="relative">
            <label
              htmlFor="bloodGroup"
              className="absolute top-[-13px] left-3 bg-gray-50"
            >
              Blood Group
            </label>
            <select
              name="bloodGroup"
              id="bloodGroup"
              onChange={(e) => setBG(e.target.value)}
              className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        )}

        {query === "doctor" && (
          <div className="relative">
            <label
              htmlFor="department"
              className="absolute top-[-13px] left-3 bg-gray-50"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dentist">Dentist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="ENT Specialist">ENT Specialist</option>
              <option value="Medicine">Medicine</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Pediatrician">Pediatrician</option>
            </select>
          </div>
        )}

{query === "therapist" && (
          <div className="relative">
            <label
              htmlFor="department"
              className="absolute top-[-13px] left-3 bg-gray-50"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>
              <option value="Physiotherapist">Physiotherapist</option>
              <option value="Occupational Therapist">Occupational Therapist</option>
              <option value="Speech Therapist">Speech Therapist</option>
              <option value="Psychotherapist">Psychotherapist</option>
              <option value="Chiropractor">Chiropractor</option>
              <option value="Rehabilitation Specialist">Rehabilitation Specialist</option>
              <option value="Mental Health Therapist">Mental Health Therapist</option>
            </select>
          </div>
        )}

        <div className="flex items-center space-x-4 my-5">
          <div className="relative">
            <label
              htmlFor="area"
              className="absolute top-[-13px] left-3 bg-gray-50 z-10"
            >
              Area Cover (km)
            </label>
            <div className="relative">
              <input
                className="block w-full p-2 pe-10 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                min={1}
                name="area"
                type="number"
                placeholder="5"
                value={coverage}
                onChange={(e) => setCoverage(Math.max(1, e.target.value))}
              />
              <span className="absolute inset-y-0 end-0 flex items-center pe-3">
                km
              </span>
            </div>
          </div>

          <button
            onClick={getCurrentLocation}
            className="flex items-center gap-x-2 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m16.949,2.05c-1.321-1.322-3.079-2.05-4.949-2.05s-3.628.728-4.95,2.05c-2.729,2.729-2.729,7.17.008,9.907l2.495,2.44c.675.66,1.561.99,2.447.99s1.772-.33,2.447-.99l2.502-2.448c1.322-1.322,2.051-3.08,2.051-4.95s-.729-3.627-2.051-4.95Zm-4.949,7.94c-1.657,0-3-1.343-3-3s1.343-3,3-3,3,1.343,3,3-1.343,3-3,3Zm12,6.772c.002.354-.183.682-.485.863l-9.861,5.917c-.51.306-1.082.459-1.653.459s-1.144-.153-1.653-.459L.485,17.625c-.303-.182-.487-.51-.485-.863.002-.353.19-.679.495-.857l4.855-2.842c.1.11.203.219.309.325l2.495,2.439c1.028,1.006,2.395,1.561,3.846,1.561s2.817-.555,3.846-1.561l2.518-2.463c.098-.098.194-.199.287-.301l4.854,2.841c.305.179.493.505.495.857Z" />
            </svg>
            <span> Use Current Location</span>
          </button>

          <span>Or</span>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>

            <input
              type="text"
              id="search"
              className="block w-full p-2 ps-10 pe-10 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Select your place (e.g., Dhaka)"
              value={place}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="flex items-center justify-center gap-x-3 text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={searchPlace}
          >
            Go
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="arrow-circle-down"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 "
            >
              <path d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12ZM14.535,6.293l3.586,3.586h0a3,3,0,0,1,0,4.243l-3.586,3.585-.025.024a1,1,0,1,1-1.389-1.438L16.414,13,6,13.007a1,1,0,1,1,0-2L16.413,11,13.121,7.707a1,1,0,1,1,1.414-1.414Z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={mapRef}
        className="h-60 w-1/2 resize border-2 border-black"
      ></div>

      <p>Coordinates: {coordinates.join(", ")}</p>
      <p>Current Location: {currentLocationName}</p>
      {showSelection && (
        <ul>
          {nearByUsers.map((user, i) => (
            <li key={i}>
              <Card src={user.dp} alt={user.name} appt={true}>
              <h5 class="mb-1 text-xl font-medium text-gray-900">{user.name.replace(/\w\S*/g, function (txt) {
                        return (
                          txt.charAt(0).toUpperCase() +
                          txt.substr(1).toLowerCase()
                        );
                      })}</h5>
                <span>Blood Group: {user.bloodGroup}</span>
              </Card>
            </li>
          ))}
        </ul>
      )}
      {directionsUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          Get Directions
        </a>
      )}

      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}
    </div>
  );
}

export default Map;
