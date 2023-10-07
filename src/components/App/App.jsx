import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from '../../configs/router-config';

function App() {

    return (
        <div id="page">
            <RouterProvider router={Router} />
        </div>
    );
}

export default App;