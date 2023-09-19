import React, {useState,useEffect} from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';


const ProyectosCrear = () => {

    const navigate = useNavigate();

    const [Proyecto, setProyecto] = useState({
        nomProducto:'',
        cantidad:'',
        valor:'',
        direccion:'',
        email:'',
        numero:''
    });

    const {nomProducto,cantidad,valor,direccion,email,numero} = Proyecto;

    useEffect(() => {
        document.getElementById("nomProducto").focus();
    }, [])

    const onChange = (e) =>{
        setProyecto({
            ...Proyecto,
            [e.target.name]:e.target.value
        })
    }

    const crearproyecto = async () =>{
        const data = {
            nomProducto:Proyecto.nomProducto,
            cantidad:Proyecto.cantidad,
            valor:Proyecto.valor,
            direccion:Proyecto.direccion,
            email:Proyecto.email,
            numero:Proyecto.numero

        }
        const response = await APIInvoke.invokePOST('/compra',data);
        const idcompra = response.id;


        if(idcompra === ''){
            const msg = "La compra no fue realizada correctmente";
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
                const msg = "El proyecto fue creado correctamente";
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
               setProyecto({
                nomProducto:'',
                cantidad:'',
                valor:'',
                direccion:'',
                email:'',
                numero:''

               })
        }
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        crearproyecto();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Realizar Compra"}
                    breadCrumb1={"Listado de Compras"}
                    breadCrumb2={"Creación"}
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
                                    <button type="submit" className="btn btn-block btn-primary btn-sm">Crear</button>
                                    
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

export default ProyectosCrear;