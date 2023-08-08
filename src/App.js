import { useEffect, useState, useCallback } from 'react';
import ImageComponent from './components/ImageComponent';
import LoadingSpinnerComponent from './components/LoadingSpinnerComponent';
import InstallHookInstructions from './components/InstallHookInstructions';

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
    let temp = image['ss.jpg'];
    image['ss.jpg'] = image['pic.jpg'];
    image['pic.jpg'] = temp;
    setImages([...images]);
  }, [images]);

  return (
    <div className="grid grid-cols-1 gap-4 bg-black text-white">
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-4xl font-bold">GitReal.</h1>
        <div className="top-0 right-0 pt-4 pr-4">
          <InstallHookInstructions />
        </div>
      </div>
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