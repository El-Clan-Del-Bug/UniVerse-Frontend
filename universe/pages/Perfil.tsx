import Head from "next/head";
import ComunidadPerfil from "universe/Component/ComunidadPerfil";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as AiIcon from 'react-icons/ai';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useAuth } from "universe/hooks/useAuth";



interface Comunidad {

    id: number
    nameComunidad: string
    descripcion: string
    materia: string


}
const colorIcon = "#61EB8D";
var comunityName: string
var description: string
var id_community: number

export default function Perfil() {
    const { isLoading } = useAuth();

    if (isLoading) {
        // Render a loading state or null if you don't want to show anything during loading
        return null;
    }

    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        setName(localStorage.getItem("name"));
    }, []);

    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, []);


    const router = useRouter();

    //VARIABLES USE STATE


    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Comunidad[]>([]);


    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            //  API para buscar materias
            const response = await fetch(`/api/search?query=${searchQuery}`);
            const data = await response.json();

            // Actualizar los resultados de materias
            setSearchResults(data.results);
        } catch (error) {
            console.error("Error searching for subjects:", error);
        }
    };



    const [formEditar, setformEditar] = useState(false)
    const stateformEditar = () => setformEditar(!formEditar)

    const [Comunidades, setComunidades] = useState([{
        id: 0,
        nameComunidad: "",
        descripcion: "",
        materia: "",
    }])
    // OBTENCION DE TODAS LAS COMUNIDADES 
    const getInfoComunidades = async () => {
        try {
            const res = await fetch('/api/community/', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const data = await res.json()
                setComunidades(data)

            } else {
                throw new Error('Error al traer la informacion');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }

    //EDICION DE LA COMUNIDAD
    const editar = (id: number, nameComunidad: string, descripcion: string) => {
        id_community = id
        comunityName = nameComunidad
        description = descripcion
        stateformEditar()
        toggle()
    }

    const cerrarEdicion = () => {
        stateformEditar()
        toggle()
    }

    //CREACION COMUNIDAD


    //UPDATE COMUNIDAD
    const updateComunidad = async (values: Comunidad) => {
        try {
            const res = await fetch('/api/community/name/' + comunityName, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(values)
            });

            if (res.ok) {

            } else {
                throw new Error('ha sucedido un error al crear la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        stateformEditar()
        toggle()
    }

    // FUNCION TOGGLE  se encarga de desvanecer el fondo cuando se despliega un formulario
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
    }


    //PRIMERA FUNCION EN EJECUTARSE ES TRAERSE LA INFORMACION DE LAS COMUNIDADES
    //getInfoComunidades()

    const editarPerfil = () => {
        router.push('/EditarPerfil');
    }



    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>

            <main id="main">
                <Navbar></Navbar>
                <div className="principal_Content_Profile">
                    <div className="flex items-center justify-start space-x-3">
                        <Faicon.FaUser size={"100px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Mi perfil</h2>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Información personal
                    </h3>

                    <div className={style.principalContentProfile}>
                        <div className={style.component1}>
                            <h4>Nombre de usuario:</h4>
                            <div className={style.textContainer}>
                            <div>
                                <h5>{name}</h5>
                            </div>
                            </div>
                        </div>

                        <div className={style.component2}>
                            <h4>Email registrado:</h4>
                            <div className={style.textContainer}>
                            <div>
                                <h5>{email}</h5>
                            </div>
                            </div>
                        </div>
                    </div>


                    <h3 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Participante de:
                    </h3>



                    <div className="flex flex-wrap justify-center" style={{ marginLeft: '10px' }} >
                        {/*Comunidades.map((item, index)=>{
                            return(
                                <ComunidadRecuadro key={item.nameComunidad} idComunidad={item.id} comunityName={item.nameComunidad} descripcion={item.descripcion} editar={editar}></ComunidadRecuadro>
                            )
                        })*/

                        }

                        <ComunidadPerfil idComunidad={1} comunityName="FEM" descripcion="Descripcion de la comunidad Fem" editar={editar}></ComunidadPerfil>
                        <ComunidadPerfil idComunidad={2} comunityName="Calculo Integral" descripcion="Descripcion de la comunidad Calculo integral" editar={editar}></ComunidadPerfil>
                        <ComunidadPerfil idComunidad={3} comunityName="Calculo Diferencial" descripcion="Descripcion de la comunidad Calculo Diferencial " editar={editar}></ComunidadPerfil>
                        <ComunidadPerfil idComunidad={4} comunityName="Bases de Datos" descripcion="Descripcion de la comunidad Base de datos" editar={editar}></ComunidadPerfil>


                        <button className={style.rectangleButton} style={{ marginBottom: '10px' }} onClick={editarPerfil}>
                            <h6>EDITAR PERFIL</h6>
                        </button>


                    </div>
                </div>


            </main>

            {formEditar ? (
                <div>
                    <Formik
                        initialValues={{
                            id: id_community,
                            nameComunidad: comunityName,
                            descripcion: description,
                            materia: "",

                        }}
                        onSubmit={async (values) => {

                            updateComunidad(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={cerrarEdicion} id="close" />

                                    <div>
                                        <AiIcon.AiFillEdit size={"60px"} color={"#1D3752"} />
                                        <h2>Editar Comunidad</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Editar</h3>
                                        </button>
                                    </div>
                                </div>
                                <div id="inputs">

                                    <div>
                                        <h5>Nombre de la comunidad:</h5>
                                        <input name="NombreComunidad" type="text" placeholder="Nombre de la comunidad"
                                            value={values.nameComunidad}
                                            onChange={handleChange}
                                        />

                                        <h5>Descripcion de la comunidad</h5>
                                        <input name="descripcion" type="text" placeholder="Descripcion de la comunidad"
                                            value={values.descripcion}
                                            onChange={handleChange}
                                        />

                                        <h5>Categoria o materia a la que se refiere la comunidad:</h5>
                                        <input name="materia" type="text" placeholder="Buscar"
                                            value={values.materia}
                                            onChange={handleChange}
                                        />


                                    </div>

                                </div>
                            </form>
                        )}

                    </Formik>
                </div>
            ) : null

            }



        </>
    )
}
