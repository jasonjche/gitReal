import { useEffect, useState, useCallback } from 'react';
import ImageComponent from './components/ImageComponent';
import LoadingSpinnerComponent from './components/LoadingSpinnerComponent';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://9daohzt5ol.execute-api.us-east-2.amazonaws.com/test/images')
      .then(response => response.json())
      .then(data => {
        setImages(data)
        setLoading(false);
      });
  }, []);

  const handleImageClick = useCallback((image) => {
    let tempe = image['ss.jpg'];
    image['ss.jpg'] = image['pic.jpg'];
    image['pic.jpg'] = tempe;
    setImages([...images]);
  }, [images]);

  return (
    <div className="grid grid-cols-1 gap-4 bg-black text-white">
      <h1 className="text-4xl text-center pt-4 font-bold">GitReal.</h1>
      {loading ? (
        <LoadingSpinnerComponent />
      ) : (
        images.slice().reverse().map((image, index) => (
          <ImageComponent key={index} image={image} handleImageClick={handleImageClick} />
        ))
      )}
    </div>
  );
}

export default App;