import Head from "next/head";
import ComunidadPerfil from "universe/Component/ComunidadPerfil";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as AiIcon from 'react-icons/ai';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import { useRouter } from 'next/router';
import { useState } from "react";
import { Formik, Form, Field } from 'formik';


const colorIcon = "#61EB8D";

export default function EditarPerfil() {




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
                            <h2 style={{ alignSelf: 'flex-start' }}>Editar perfil</h2>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Información personal
                    </h3>


                    <div className={style.principalContentProfile}>
                        <div className={style.component1}>
                            <div id="inputs">
                                <div>
                                    <h5>Cambiar nombre de usuario:</h5>
                                    <input name="nombre_Usuario" type="text" placeholder="Nuevo nombre de usuario"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className={style.component2}>
                            <div id="inputs">
                                <div>
                                    <h5>Actualizar contraseña:</h5>
                                    <input name="email_Registrado" type="password" placeholder="Nueva contraseña"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-wrap justify-center" >
                        
                    <button className={style.rectangleButton}>
                        <h6>CONFIRMAR CAMBIOS</h6>
                    </button>
                    </div>
                </div>





                <div className="flex flex-wrap justify-left" style={{ marginLeft: '10px' }} >

                </div>


            </main>




        </>
    )
}