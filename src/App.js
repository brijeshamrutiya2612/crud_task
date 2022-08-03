import './App.css';
import { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './screen/Home';
import {ToastContainer} from 'react-toastify';
import ViewData from './screen/ViewData';
import EditData from './screen/EditData';

function App() {
  return (
    <Fragment>
      <div
        style={{
          margin: "auto",
        }}
      >
      <ToastContainer position="top-center" limit={1}/>
      <Routes>
      <Route index path="/" element={<Home/>}></Route>
      <Route path="/ViewData" element={<ViewData/>}></Route>
      <Route path="/EditData/:id" element={<EditData/>}></Route>
      </Routes>
      </div>
    </Fragment>
  );
}

export default App;
