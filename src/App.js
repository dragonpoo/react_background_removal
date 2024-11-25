
import React, { useState } from 'react';
import {removeBackground} from '@imgly/background-removal';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundHandler = async () => {
    if (image) {
      setLoading(true);
      const result = await removeBackground(image);
      setLoading(false);
      setProcessedImage(result);
    }
  };

  const url = processedImage ? URL.createObjectURL(processedImage) : null;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Background Removal</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={removeBackgroundHandler} style={{ marginLeft: '10px' }}>Remove Background</button>
      {loading && <CircularProgress />}
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '20px' }} />}
      {processedImage && <img src={url} alt="Processed" style={{ maxWidth: '300px', marginTop: '20px' }} />}
    </div>
  );
}

export default App;
