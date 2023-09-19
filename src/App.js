import React, { Fragment } from "react";
import{BrowserRouter as Router,Route,Routes} from "react-router-dom" 

import CrearCuenta from "./paginas/auth/crearcuenta";
import Login from "./paginas/auth/login";
import Home from "./paginas/auth/Home"
import ProyectosAdmin from "./paginas/proyectos/ProyectosAdmin";
import ProyectosCrear from "./paginas/proyectos/ProyectosCrear";
import ProyectosEditar from "./paginas/proyectos/ProyectosEditar";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
         <Route path="/" exact element={<Login/>}/> 
         <Route  path="/crearcuenta" exact element={<CrearCuenta/>}/>
         <Route path="/login" exact element={<Login/>}/>
         <Route  path="/home" exact element={<Home/>}/>
         <Route  path="/proyectos-admin" exact element={<ProyectosAdmin/>}/>
         <Route  path="/proyectos-crear" exact element={<ProyectosCrear/>}/>
         <Route  path="/proyectos-editar/:idproyecto" exact element={<ProyectosEditar/>}/>
        </Routes>

      </Router>

    </Fragment>
  );
}

export default App;
