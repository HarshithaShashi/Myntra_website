import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DesignArea from './DesignArea';
import DesignItem from './DesignItem';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [designs, setDesigns] = useState([]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleUpload = () => {
    console.log('Uploading design');
  };

  const handleDownload = () => {
    console.log('Downloading design');
  };

  const addDesign = (item) => {
    setDesigns([...designs, { ...item, id: Date.now() }]);
  };

  const designOptions = [
    /* eslint-disable no-useless-escape */
    { type: '2D', src:"C:\Users\Harshitha S.Shankar\OneDrive\Desktop\image1.png" },
    //{ type: '2D', src: 'path/to/image2.png' },
   // { type: '2D', src: 'path/to/image3.png' },
    //{ type: '2D', src: 'path/to/image4.png' },
    //{ type: '2D', src: 'path/to/image5.png' },
    /* eslint-enable no-useless-escape */
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header>
          <h1>Design & Drop Logic</h1>
        </header>
        <main>
          <DesignArea designs={designs} setDesigns={setDesigns} />
          <div className="controls">
            <button onClick={() => console.log('Back')}>Back</button>
            <button onClick={() => console.log('Front')}>Front</button>
            <input 
              type="text" 
              placeholder="Search bar" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
          <div className="design-options">
            {designOptions.map((item, index) => (
              <DesignItem key={index} item={item} addDesign={addDesign} />
            ))}
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
