import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';


const ProyectosEditar = () => {

    const navigate = useNavigate();

    const { idproyecto } = useParams();
    let arreglo = idproyecto.split('@');
    const nomProductoProyecto = arreglo[1];
    const cantidadProyecto = arreglo[2];
    const valorProyecto = arreglo[3];
    const direccionProyecto = arreglo[4];
    const emailProyecto = arreglo[5];
    const numeroProyecto = arreglo[6];


    const [Proyecto, setProyecto] = useState({
        nomProducto: nomProductoProyecto,
        cantidad: cantidadProyecto,
        valor: valorProyecto,
        direccion: direccionProyecto,
        email: emailProyecto,
        numero: numeroProyecto
    });


    const { nomProducto, cantidad, valor, direccion, email, numero } = Proyecto;

    useEffect(() => {
        document.getElementById("nomProducto").focus();
    }, [])

    const onChange = (e) => {
        setProyecto({
            ...Proyecto,
            [e.target.name]: e.target.value
        })
    }

    const editarProyecto = async () => {
        let arreglo = idproyecto.split('@');
        const idProyecto = arreglo[0]; 

        const data = {
            nomProducto:Proyecto.nomProducto,
            cantidad:Proyecto.cantidad,
            valor:Proyecto.valor,
            direccion:Proyecto.direccion,
            email:Proyecto.email,
            numero:Proyecto.numero

        }
        
        const response = await APIInvoke.invokePUT(`/compra${idProyecto}`,data);
        const idProyectoEditado =response.compra.id;

        if(idProyectoEditado !== idProyecto){

            const msg = "La compra no fue editado correctmente";
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
            navigate("/proyectos-admin");
                const msg = "El proyecto fue editado correctamente";
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
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarProyecto();
    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Editar Compras"}
                    breadCrumb1={"Listado de Compras"}
                    breadCrumb2={"Edicion"}
                    ruta1={"/proyectos-admin"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nomProducto">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nomProducto"
                                            name="nomProducto"
                                            placeholder="Ingrese nombre del producto"
                                            value={nomProducto}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="cantidad">cantidad</label>
                                        <input type="text"
                                            className="form-control"
                                            id="cantidad"
                                            name="cantidad"
                                            placeholder="Ingrese nombre del producto"
                                            value={cantidad}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="valor">valor</label>
                                        <input type="text"
                                            className="form-control"
                                            id="valor"
                                            name="valor"
                                            placeholder="Ingrese nombre del producto"
                                            value={valor}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="direccion">direccion</label>
                                        <input type="text"
                                            className="form-control"
                                            id="direccion"
                                            name="direccion"
                                            placeholder="Ingrese nombre del producto"
                                            value={direccion}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="Email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Ingrese nombre del producto"
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="numero">Número</label>
                                        <input type="text"
                                            className="form-control"
                                            id="numero"
                                            name="numero"
                                            placeholder="Ingrese nombre del producto"
                                            value={numero}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-block btn-primary btn-sm">Editar</button>

                                </div>
                            </form>

                        </div>
                    </div>


                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProyectosEditar;