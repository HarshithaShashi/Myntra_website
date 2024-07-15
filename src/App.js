import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import DesignArea from './DesignArea';
import DesignItem from './DesignItem';
import ClothingApp from './clothingApp';
import './App.css';
import html2canvas from 'html2canvas';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [designs, setDesigns] = useState([]);
  const [history, setHistory] = useState([]); // Stack to keep track of history
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleUpload = () => {
    navigate('/clothing-app'); // Navigate to ClothingApp route
  };

  const handleDownload = () => {
    const designArea = document.querySelector('.design-area');
    if (designArea) {
      html2canvas(designArea).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'design.png';
        link.click();
      });
    }
  };

  const addDesign = (item) => {
    if (designs.length < 6) { // Check if less than 6 designs
      setHistory([...history, designs]); // Save current state to history
      setDesigns([...designs, { ...item, id: Date.now(), left: 0, top: 0 }]);
    } else {
      alert('You can only add up to 6 designs.');
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, -1)); // Remove the last state from history
      setDesigns(previousState);
    }
  };

  const designOptions = [
    { type: '2D', src: 'images/file.png' },
    { type: '2D', src: 'images/im1.png' },
    { type: '2D', src: 'images/image1.png' },
    { type: '2D', src: 'images/image2.png' },
    { type: '2D', src: 'images/image3.png' },
    { type: '2D', src: 'images/image4.png' },
    { type: '2D', src: 'images/image5.png' },
    { type: '2D', src: 'images/image6.png' },
    { type: '2D', src: 'images/image7.png' },
    { type: '2D', src: 'images/image8.png' },
    { type: '2D', src: 'images/image9.png' },
    { type: '2D', src: 'images/image10.png' },
    { type: '2D', src: 'images/image11.png' },
    { type: '2D', src: 'images/image12.png' },
    { type: '2D', src: 'images/image13.png' },
    { type: '2D', src: 'images/image14.png' },
    { type: '2D', src: 'images/image15.png' },
    { type: '2D', src: 'images/image16.png' },
    { type: '2D', src: 'images/image17.png' },
    { type: '2D', src: 'images/image18.png' },
    { type: '2D', src: 'images/image19.png' },
    { type: '2D', src: 'images/image20.png' },
    { type: '2D', src: 'images/image21.png' },
    { type: '2D', src: 'images/image22.png' },
    { type: '2D', src: 'images/image23.png' },
    { type: '2D', src: 'images/image24.png' },
    { type: '2D', src: 'images/image25.png' },
    { type: '2D', src: 'images/image26.png' },
    { type: '2D', src: 'images/image27.png' },
    { type: '2D', src: 'images/image28.png' },
    { type: '2D', src: 'images/image29.png' },
    { type: '2D', src: 'images/image30.png' },
    { type: '2D', src: 'images/a1.png' },
    { type: '2D', src: 'images/b1.png' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header>
          <h1>Make your Design</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={
            <main>
              <DesignArea designs={designs} setDesigns={setDesigns} />
              <div className="controls">
                <button className="button button-primary" onClick={handleUndo}>Back</button>
                <input 
                  type="text" 
                  placeholder="Search bar"
                  className="button button-primary search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="button button-primary" onClick={handleSearch}>Search</button>
                <button className="button button-primary" onClick={handleDownload}>Download</button>
                <button className="button button-primary" onClick={handleUpload}>Upload</button>
              </div>
              <div className="design-options">
                {designOptions.map((item, index) => (
                  <DesignItem key={index} item={item} addDesign={addDesign} />
                ))}
              </div>
            </main>
          } />
          <Route path="/clothing-app" element={<ClothingApp />} />
        </Routes>
      </div>
    </DndProvider>
  );
}

export default App;
