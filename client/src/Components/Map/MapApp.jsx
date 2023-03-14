import Map, { Marker, Popup } from "react-map-gl";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import "./map.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import moment from "moment";
export default function MapApp() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoic2tpbGx6ZGV2IiwiYSI6ImNsZThrbmV0NjA3NjEzeW8zZTNoN3NremEifQ.J2OUiRda51tADGWwnH-cuwadnane";

  return (
    <Map
      initialViewState={{
        longitude: 3.25,
        latitude: 34.666667,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "50vw", height: "70vh   " }}
    >
      {pins.map((p) => (
        <>
          <Marker longitude={p.long} latitude={p.lat}>
            <LocationOnIcon
              onClick={() => handleMarkerClick(p._id)}
              sx={{ cursor: "pointer", color: "red", fontSize: "2rem" }}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label className="label">Place</label>
                <h4 className="place">{p.title}</h4>
                <label className="label">Review</label>
                <p className="desc">{p.desc}</p>
                <label className="label">Rating</label>
                <div className="stars">
                  {Array(p.rating).fill(<StarIcon className="star" />)}
                </div>
                <label className="label">Information</label>
                <span className="username">
                  Created by <b>{p.organizer}</b>
                </span>
                <span className="date">{moment(p.createdAt).fromNow()}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
}
