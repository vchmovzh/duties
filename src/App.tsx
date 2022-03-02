import React from 'react';
import 'tachyons/css/tachyons.min.css'
import Header from './components/Header';
import Schedule from './components/Schedule';

function App() {
  return (
    <div className="flex flex-column">
      <Header />
      <Schedule />
    </div>
  );
}

export default App;
