import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import "../../CSS/estilos2.css";
const CrearCuenta = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, [])

  const crearCuenta = async () => {

    if (password !== confirmar) {
      const msg = "las contraseñas son diferentes";
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
    } else if (password.length < 6) {
      const msg = "las contraseñas debe de ser de 6 caracteres";
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
    } else {

      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      const response = await APIInvoke.invokePOST(`/usuario`, data);
      const mensaje = response.msg;

      if (mensaje === 'El suario ya existe') {
        const msg = "El suario ya existe";
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

      } else {
        const msg = "El suario fue creado correctamente";
        swal({
          title: 'Información',
          text: msg,
          icon: 'success',
          buttons: {
            confirm: {
              text: 'ok',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              classModal: true
            }
          }
        });
        setUsuario({
          nombre: '',
          email: '',
          password: '',
          confirmar: ''

        })
      }
    }
  }
  const onnSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  }

  return (
    <div>
      <div>
        <nav>
          <h2>MIDULCEONLINE</h2>
        </nav>
        <div className="form-wrapper">
          <center>
            <h2>Registrate</h2>
          </center>
          <form onSubmit={onnSubmit}>
            <div className="form-control">
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={onChange}
                required
              />
              <label>Nombre</label>
            </div>

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

            <div className="form-control">
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                value={confirmar}
                onChange={onChange}
                required
              />
              <label>Confirmar contraseña</label>
            </div>

            
              <button type="submit">Registrate</button>
            
            <div className="form-help"></div>
          </form>
          <center>
            <p>
              Ya tienes cuenta? <Link to={"/login"}>Inicia sesión aqui</Link>
            </p>
          </center>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
