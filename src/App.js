import './App.css';
import { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import ViewData from './screen/ViewData';
import EditData from './screen/EditData';
import Add from './screen/Add';

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
      <Route index path="/" element={<ViewData/>}></Route>
      <Route path="/add" element={<Add/>}></Route>
      <Route path="/EditData/:id" element={<EditData/>}></Route>
      </Routes>
      </div>
    </Fragment>
  );
}

export default App;
