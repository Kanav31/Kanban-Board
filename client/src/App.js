
import './App.css';
import CreateBoard from './components/createboard';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import ColumnScreen from './components/createcolumns';

function App() {
  return (
    
      <Router>
        <Routes>
        <Route path='/' element={<CreateBoard/>}/>
        <Route path="/columns/:boardId" element={<ColumnScreen />} />
        </Routes>
      </Router>
   
  );
}

export default App;
