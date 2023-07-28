function ImageComponent({ image, handleImageClick }) {
  let date = new Date(image.timestamp * 1000);
  let formattedDate = date.toLocaleString();

  return (
    <div className="relative rounded overflow-hidden shadow-lg m-2 animate-fade-in">
      <img className="object-cover" src={image['ss.jpg']} alt="" />
      <div className="absolute top-0 right-0 w-1/4">
        <img className="rounded w-full h-full object-cover" src={image['pic.jpg']} alt="" onClick={() => handleImageClick(image)} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{image.commit_message}</div>
        <p className="text-white text-base">
          {formattedDate} by <strong>{image.author}</strong>
        </p>
      </div>
    </div>
  );
}

export default ImageComponent;
