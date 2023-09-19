import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import "../../CSS/estilos.css";
 
const Login = () => {

  //para redireccionar de un componente a otro

    const Navigate = useNavigate();
  //definimos el estado inicial de las variables
    const [usuario,setUsuario] = useState({
      email: '',
      password:''
    });

    const {email,password} = usuario;

    const onChange = (e) => {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value

      })
    }
    useEffect(() => {
      document.getElementById("email").focus();
    }, [])

    const iniciarSecion = async () => {
      if (password.length < 6) {
        const msg = "las contraseñas debe de ser al menos de 6 caracteres";
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              classModal: true
            }
          }
        });
    }else{
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      const response = await APIInvoke.invokePOST(`/auth`, data);
      const mensaje = response.msg;

      if(mensaje === 'el usuario no existe' || mensaje === 'contrsaeña incorrecta'){
        const msg = "No fue posible iniciar la sesión verifique los datos ingresados";
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              classModal: true
            }
          }
        });
      }else{
        //obtener el token del acceso jwt
        const jwt = response.token;
        //uardar el token en el localstorage
        localStorage.setItem('token',jwt);
        //redireccion home pagina principal
        Navigate('/Home');
      }
    }
  }
    const onnSubmit = (e) => {
      e.preventDefault();
      iniciarSecion();
    }

    return ( 
        <div> 
  <nav> 
    <h2>MIDULCEONLINE</h2> 
  </nav> 
  <div className="form-wrapper"> 
    <center><h2>Iniciar sesión</h2></center> 
    <form onSubmit={onnSubmit}>
    <div className="form-control">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="form-control">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
              <label>Contraseña</label>
            </div>
      <button type="submit">iniciar sesión</button> 
      <div className="form-help"> 
      </div> 

    </form> 
    <center><p>Eres nuevo?< Link to={"/crearcuenta"}> 
        Regisrate aqui 
      </Link></p></center> 
  </div> 







        </div>);
}

export default Login; 