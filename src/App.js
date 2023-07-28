import { useEffect, useState, useCallback } from 'react';
import ImageComponent from './components/ImageComponent';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://9daohzt5ol.execute-api.us-east-2.amazonaws.com/test/images')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  const handleImageClick = useCallback((image) => {
    let temp = image['ss.jpg'];
    image['ss.jpg'] = image['pic.jpg'];
    image['pic.jpg'] = temp;
    setImages([...images]);
  }, [images]);

  return (
    <div className="grid grid-cols-1 gap-4 bg-black text-white">
      <h1 className="text-4xl text-center pt-4 font-bold">GitReal.</h1>
      {images.slice().reverse().map((image, index) => (
        <ImageComponent key={index} image={image} handleImageClick={handleImageClick} />
      ))}
    </div>
  );
}

export default App;