import React, { useState } from 'react';
import useStore from '../store/useStore';
import axios from 'axios';
import './ControlPanel.css';

const ControlPanel = () => {
  const {
    containers,
    selectedContainer,
    windowDoorTypes,
    selectedWindowDoorType,
    slabDimensions,
    currentDesignName,
    designs,
    addContainer,
    removeContainer,
    updateContainerPosition,
    selectWindowDoorType,
    addWindowDoor,
    removeWindowDoor,
    updateSlabDimensions,
    loadDesign,
    clearDesign,
    setDesigns,
    setCurrentDesignName,
    getCurrentDesign
  } = useStore();
  
  const [designName, setDesignName] = useState('');
  const [selectedWall, setSelectedWall] = useState('front');
  const [wallOffset, setWallOffset] = useState(0);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  
  const selectedContainerData = containers.find(c => c.id === selectedContainer);
  
  const handlePositionChange = (axis, value) => {
    if (!selectedContainer) return;
    const container = containers.find(c => c.id === selectedContainer);
    const newPosition = [...container.position];
    const axisIndex = { x: 0, y: 1, z: 2 }[axis];
    newPosition[axisIndex] = parseFloat(value) || 0;
    updateContainerPosition(selectedContainer, newPosition);
  };
  
  const handleAddWindowDoor = () => {
    if (!selectedContainer || !selectedWindowDoorType) {
      alert('Please select a container and window/door type first');
      return;
    }
    
    const typeData = windowDoorTypes.find(t => t.id === selectedWindowDoorType);
    addWindowDoor(selectedContainer, {
      type: selectedWindowDoorType,
      wall: selectedWall,
      offset: wallOffset,
      width: typeData.width,
      height: typeData.height
    });
  };
  
  const handleSaveDesign = async () => {
    if (!designName.trim()) {
      alert('Please enter a design name');
      return;
    }
    
    try {
      const design = {
        name: designName,
        containers: containers,
        slabDimensions: slabDimensions,
        createdAt: new Date().toISOString()
      };
      
      await axios.post('http://localhost:5000/api/designs', design);
      alert('Design saved successfully!');
      setDesignName('');
      setShowSaveDialog(false);
      setCurrentDesignName(designName);
      loadDesigns();
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design');
    }
  };
  
  const handleLoadDesign = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/designs/${id}`);
      loadDesign(response.data);
      setShowLoadDialog(false);
      alert('Design loaded successfully!');
    } catch (error) {
      console.error('Error loading design:', error);
      alert('Failed to load design');
    }
  };
  
  const loadDesigns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/designs');
      setDesigns(response.data);
    } catch (error) {
      console.error('Error loading designs:', error);
    }
  };
  
  const handleExportDesign = () => {
    const design = getCurrentDesign(useStore.getState());
    const dataStr = JSON.stringify(design, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${currentDesignName.replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const getTotalArea = () => {
    const containerArea = 20 * 8;
    return containers.length * containerArea;
  };
  
  const getSlabArea = () => {
    return slabDimensions.width * slabDimensions.depth;
  };
  
  React.useEffect(() => {
    loadDesigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="control-panel">
      <div className="panel-section">
        <h2>3D Container Home Designer</h2>
        <div className="design-info">
          <strong>{currentDesignName}</strong>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Container Management</h3>
        <button onClick={addContainer} className="btn btn-primary">
          Add Container
        </button>
        <button
          onClick={() => selectedContainer && removeContainer(selectedContainer)}
          disabled={!selectedContainer}
          className="btn btn-danger"
        >
          Remove Selected
        </button>
        
        {selectedContainerData && (
          <div className="position-controls">
            <h4>Position (ft)</h4>
            <div className="input-group">
              <label>X:</label>
              <input
                type="number"
                value={selectedContainerData.position[0]}
                onChange={(e) => handlePositionChange('x', e.target.value)}
                step="1"
              />
            </div>
            <div className="input-group">
              <label>Y:</label>
              <input
                type="number"
                value={selectedContainerData.position[1]}
                onChange={(e) => handlePositionChange('y', e.target.value)}
                step="8.5"
              />
            </div>
            <div className="input-group">
              <label>Z:</label>
              <input
                type="number"
                value={selectedContainerData.position[2]}
                onChange={(e) => handlePositionChange('z', e.target.value)}
                step="1"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="panel-section">
        <h3>Windows & Doors</h3>
        <select
          value={selectedWindowDoorType || ''}
          onChange={(e) => selectWindowDoorType(e.target.value)}
          className="select-input"
        >
          <option value="">Select Type</option>
          {windowDoorTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name} ({type.width}' × {type.height}')
            </option>
          ))}
        </select>
        
        <div className="input-group">
          <label>Wall:</label>
          <select
            value={selectedWall}
            onChange={(e) => setSelectedWall(e.target.value)}
            className="select-input"
          >
            <option value="front">Front</option>
            <option value="back">Back</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Offset (ft):</label>
          <input
            type="number"
            value={wallOffset}
            onChange={(e) => setWallOffset(parseFloat(e.target.value) || 0)}
            step="0.5"
            min="-8"
            max="8"
          />
        </div>
        
        <button
          onClick={handleAddWindowDoor}
          disabled={!selectedContainer || !selectedWindowDoorType}
          className="btn btn-primary"
        >
          Place Window/Door
        </button>
        
        {selectedContainerData && selectedContainerData.windowsDoors.length > 0 && (
          <div className="windows-doors-list">
            <h4>Placed Items:</h4>
            {selectedContainerData.windowsDoors.map((wd) => {
              const typeData = windowDoorTypes.find(t => t.id === wd.type);
              return (
                <div key={wd.id} className="window-door-item">
                  <span>{typeData?.name} - {wd.wall}</span>
                  <button
                    onClick={() => removeWindowDoor(selectedContainer, wd.id)}
                    className="btn-small btn-danger"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="panel-section">
        <h3>Foundation Slab</h3>
        <div className="input-group">
          <label>Width (ft): {slabDimensions.width}</label>
          <input
            type="range"
            min="20"
            max="100"
            value={slabDimensions.width}
            onChange={(e) => updateSlabDimensions({ ...slabDimensions, width: parseInt(e.target.value) })}
          />
        </div>
        <div className="input-group">
          <label>Depth (ft): {slabDimensions.depth}</label>
          <input
            type="range"
            min="20"
            max="100"
            value={slabDimensions.depth}
            onChange={(e) => updateSlabDimensions({ ...slabDimensions, depth: parseInt(e.target.value) })}
          />
        </div>
        <div className="stat">
          Slab Area: {getSlabArea()} sq ft
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Design Stats</h3>
        <div className="stats">
          <div className="stat">Containers: {containers.length}</div>
          <div className="stat">Total Floor Area: {getTotalArea()} sq ft</div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Save/Load</h3>
        <button onClick={() => setShowSaveDialog(!showSaveDialog)} className="btn btn-success">
          Save Design
        </button>
        <button onClick={() => { setShowLoadDialog(!showLoadDialog); loadDesigns(); }} className="btn btn-info">
          Load Design
        </button>
        <button onClick={handleExportDesign} className="btn btn-secondary">
          Export JSON
        </button>
        <button onClick={clearDesign} className="btn btn-warning">
          Clear All
        </button>
        
        {showSaveDialog && (
          <div className="dialog">
            <input
              type="text"
              placeholder="Design name..."
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="text-input"
            />
            <button onClick={handleSaveDesign} className="btn btn-primary">
              Save
            </button>
            <button onClick={() => setShowSaveDialog(false)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        )}
        
        {showLoadDialog && (
          <div className="dialog">
            <div className="designs-list">
              {designs.length === 0 ? (
                <p>No saved designs</p>
              ) : (
                designs.map((design) => (
                  <div key={design._id} className="design-item">
                    <div className="design-info">
                      <strong>{design.name}</strong>
                      <small>{new Date(design.createdAt).toLocaleDateString()}</small>
                    </div>
                    <button
                      onClick={() => handleLoadDesign(design._id)}
                      className="btn-small btn-primary"
                    >
                      Load
                    </button>
                  </div>
                ))
              )}
            </div>
            <button onClick={() => setShowLoadDialog(false)} className="btn btn-secondary">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
