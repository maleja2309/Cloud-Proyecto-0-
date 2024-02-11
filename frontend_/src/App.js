import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tarea from "./tarea";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './login.js'
import { AuthProvider } from './Auth_token';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          
            <Route path="/" element={<LogIn />} />
            <Route path="/usuario/:id/tareas" element={<Tarea />} />
          
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
