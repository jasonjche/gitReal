import React, { useEffect, useState } from 'react';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://9daohzt5ol.execute-api.us-east-2.amazonaws.com/test/images')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 bg-black text-white">
      <h1 className="text-4xl text-center pt-4 font-bold">GitReal.</h1>
      {images.slice().reverse().map((image, index) => {
        let date = new Date(image.timestamp * 1000);
        let formattedDate = date.toLocaleString();
        return (
          <div key={index} className="relative rounded overflow-hidden shadow-lg m-2">
            <img className="object-cover" src={image['ss.jpg']} alt="" />
            <div className="absolute top-0 right-0 w-1/4">
              <img className="rounded w-full h-full object-cover" src={image['pic.jpg']} alt="" />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{image.commit_message}</div>
              <p className="text-white text-base">
                {formattedDate} by <strong>{image.author}</strong>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;