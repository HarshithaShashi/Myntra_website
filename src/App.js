import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DesignArea from './DesignArea';
import DesignItem from './DesignItem';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [designs, setDesigns] = useState([]);
  const [history, setHistory] = useState([]); // Stack to keep track of history

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
    if (designs.length < 6) { // Check if less than 6 designs
      setHistory([...history, designs]); // Save current state to history
      setDesigns([...designs, { ...item, id: Date.now() }]);
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
    { type: '2D', src: 'images/a1.png' },
    { type: '2D', src: 'images/a2.png' },
    { type: '2D', src: 'images/a3.png' },
    { type: '2D', src: 'images/a4.png' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header>
          <h1>Make your Design</h1>
        </header>
        <main>
          <DesignArea designs={designs} setDesigns={setDesigns} />
          <div className="controls">
            <button className="button button-primary" onClick={handleUndo}>Back</button>
            <input 
              type="text" 
              placeholder="Search bar" 
              className="button button-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="button button-primary" onClick={handleSearch} >Search</button>
            <button className="button button-primary" onClick={handleDownload}>Download</button>
            <button className="button button-primary" onClick={handleUpload}>Upload</button>
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