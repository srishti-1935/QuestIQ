import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Tool from './Tool';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Tool />} />
    </Routes>
  );
}

export default App;