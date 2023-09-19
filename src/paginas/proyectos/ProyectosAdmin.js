import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { Link } from "react-router-dom";


const ProyectosAdmin = () => {

    const [proyectos, setProyectos] = useState([]);
    
    
    const cargarProyectos = async () => {
        try{
        const response = await APIInvoke.invokeGET(`/compra`);
        if(response){
            setProyectos(response)
        }
    }
        catch(error){
            console.error('error al obtener los',error)
        }
    };
        useEffect(() => {
        cargarProyectos();
    }, [])


    const eliminarProyecto = async (e, idProyecto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/compra${idProyecto}`);

        if (response.msg === 'Proyecto eliminado') {

            const msg = "La compra fue eliminada correctamente";
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
            cargarProyectos();
        } else {
            const msg = "La compra no fue eliminada correctamente";
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
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Listado de Compras"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Compras"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                        <h3 className="card-title"><Link to={"/proyectos-crear"} className="btn btn-block btn-primary btn-sm">Realizar compra</Link> </h3>
 
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
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>Id</th>
                                        <th style={{ width: '16.6%' }}>Nombre</th>
                                        <th style={{ width: '5%' }}>Cantidad</th>
                                        <th style={{ width: '10%' }}>Valor</th>
                                        <th style={{ width: '16.6%' }}>Direccion</th>
                                        <th style={{ width: '16.6%' }}>Email</th>
                                        <th style={{ width: '16.6%' }}>Número</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        proyectos.map(
                                            item =>
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nomProducto}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.valor}</td>
                                                    <td>{item.direccion}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.numero}</td>
                                                    &nbsp;&nbsp;<Link to={`/proyectos-editar/${item.id}@${item.nomProducto}@${item.cantidad}@${item.valor}@${item.direccion}@${item.email}@${item.numero}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button onClick={(e) => eliminarProyecto(e, item.id)} className="btn btn-sm btn-danger">Eliminar</button>
                                                </tr>
                                        )
                                    }


                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProyectosAdmin;