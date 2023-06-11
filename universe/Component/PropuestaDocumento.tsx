import React, { useEffect, useState } from 'react'
import style from "/styles/PropuestasDocumentosStyles.module.css";


function PropuestaDocumento():JSX.Element{
    
    return (
        <>
            <div className={style.square_documento}>
                <div className="flex justify-center space-x-10" style={{ position: 'absolute', left: '70px', top: '55px' }}>
                    <img
                        src="./images/ejercicioDocumento.png"
                        alt="ejercicioDocumento"
                        style={{width: "49px", height: "46px", marginTop: '3px' }}
                    />
                    <h1 className={style.font}>Ejercicio 8.8</h1>
                </div>
                <div className={style.minisquare_documento}>
                    <div className="flex justify-center space-x-10" style={{ gap:'150px', marginTop: '33px'}}>
                        <button className={style.botones}>Aceptar</button>
                        <button className={style.botones}>Rechazar</button>
                    </div>
                </div>
                    
                <div className={style.minisquare_descripcion}>
                    <h3 className={style.descripcion}>Breve descripción de lo que contiene el documento.</h3>
                </div>
            </div>

        </>
    )
}

export default PropuestaDocumento