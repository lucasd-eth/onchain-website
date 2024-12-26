import React from "react";
import "./GalleryView.css";
const GalleryView = ({ items }) => {
  return (
    <div className="gallery">
      {items.map((item, index) => (
        <div key={index} className="gallery-item">
          <img src={item.image} alt={item.title} className="gallery-image" />
          <div className="gallery-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryView;
