import Numbers from './pages/Numbers'
import Digit from './pages/Digit';
import Homepage from './pages/Homepage';
import './App.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path='/number' element={<Numbers />}/>
        <Route path='/digit' element={<Digit />} />
      </Routes>
    </div>
  );
}

export default App;

/*<Numbers />
 */