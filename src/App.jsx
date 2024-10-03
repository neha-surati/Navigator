 import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import UserRecode from "./components/UserRecode";
import EditData from "./components/EditData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/userRecode" element={<UserRecode/>}/>
        <Route path="/edit/:id" element={<EditData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
