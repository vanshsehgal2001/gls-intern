import axios from "axios";
import React, { useEffect, useState } from "react";

import "./App.css";
import Loading from "./Loading";

const App = () => {
  const [breeds, setBreeds] = useState({});
  const [breed, setBreed] = useState("affenpinscher");
  const [images, setImages] = useState([]);
  const [subbreeds, setSubBreeds] = useState([]);
  const [subbreed, setSubBreed] = useState("");
  const [subImages, setSubImages] = useState([]);

  const fillData = async () => {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    setBreeds(response.data.message);
  };

  const showImages = async () => {
    const data = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
    setImages(data.data.message);
  };

  const onchange = async (e) => {
    setBreed(e.target.value);
  };

  const onchange1 = async (e) => {
    setSubBreed(e.target.value);
  };

  const onsubmit = async () => {
    const data2 = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    setSubBreeds(data2.data.message);
    const data = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
    setImages(data.data.message);

    const data1 = await axios.get(
      `https://dog.ceo/api/breed/${breed}/${subbreed}/images`
    );
    setSubImages(data1.data.message);
  };

  useEffect(() => {
    fillData();
    showImages();
  }, []);

  return (
    <div>
      <h1>DOG BREEDS</h1>

      {Object.keys(breeds).length === 0 ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="breed">
          <div>
            <label htmlFor="breeds">Choose a breed:</label>
            <select name="breeds" value={breed} onChange={onchange}>
              {Object.keys(breeds).map((breed) => {
                return <option key={breed}>{breed}</option>;
              })}
            </select>
          </div>
          {subbreeds.length > 0 && (
            <div>
              <label htmlFor="sub-breeds">Choose a sub-breed:</label>
              <select name="subbreeds" value={subbreed} onChange={onchange1}>
                {subbreeds.map((subbreed) => {
                  return <option key={subbreed}>{subbreed}</option>;
                })}
              </select>
            </div>
          )}
          <div>
            <button onClick={onsubmit}>Show Results</button>
          </div>
        </div>
      )}

      {images.length > 0 && subImages.length == 0 && (
        <div className="grid-container">
          {images.map((image, i) => {
            return (
              <img
                className="image"
                src={image}
                height="230px"
                width="250px"
                key={i}
              />
            );
          })}
        </div>
      )}
      {subImages.length > 0 && (
        <div className="grid-container">
          {subImages.map((image, i) => {
            return (
              <img
                className="image"
                src={image}
                height="230px"
                width="250px"
                key={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
