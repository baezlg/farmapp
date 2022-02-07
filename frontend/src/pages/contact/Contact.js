import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./Contact.scss";

const Contact = () => {
  const [viewport, setViewport] = useState({
    latitude: 59.436962,
    longitude: 24.913574,
    zoom: 8,
    width: "100%",
    height: "100%",
  });

  const locations = [
    { id: 1, name: "Noora's farm", latitude: 59.395, longitude: 24.6719 },
    {
      id: 2,
      name: "Organic Ossi's Impact That Lasts plantase",
      latitude: 59.4227,
      longitude: 24.8001,
    },
    {
      id: 3,
      name: "PartialTech Research Farm",
      latitude: 59.346,
      longitude: 24.7719,
    },
    {
      id: 4,
      name: "Friman Metsola collective",
      latitude: 59.346,
      longitude: 24.9519,
    },
  ];
  return (
    <div className="contact">
      <div className="contact__wrapper">
        <div className="contact__info">
          <ul>
            <li>Address: 123 main str, Tallinn</li>
            <li>Phone: 555-555-5555</li>
            <li>Email: farmdata@gmail.com</li>
          </ul>
        </div>
        <div className="contact__map-box">
          <ReactMapGL
            className="map"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapStyle="mapbox://styles/baezl16/ckj85rj5n2xdv19mwsx64m35u"
          >
            {locations.map((l) => (
              <Marker
                latitude={l.latitude}
                longitude={l?.longitude}
                offsetLeft={-20}
                offsetTop={-10}
                key={l.id}
              >
                <div className="contact__map">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact__map-name">{l.name}</div>
                </div>
              </Marker>
            ))}
          </ReactMapGL>
          <p>farm location map</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
