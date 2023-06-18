import React, { useEffect, useState } from 'react'
import style from "/styles/ForoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as BsIcon from 'react-icons/bs';
import { number } from 'yup';
import Cookies from "js-cookie"
import { useRouter } from 'next/router';

interface Props {
    id: number
    title: string,
    description: string,
    score: number,
    topic_id: number,
    community_id: number,
    user_name: string,

}



function PreguntaForo({ id, title, description, score, topic_id, community_id, user_name }: Props): JSX.Element {
    const router = useRouter();
    const VoteQuestion = async (vote:string) => {
        try {
            const res = await fetch('http://localhost:3333//api/questions/'+id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "vote_type": vote })

            });

            if (res.ok) {
                console.log('Error:', "se voto correctamente");
                alert("voto registrado con exito");
            } else {
                throw new Error('error al votar');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }
    

    const irPreguntas = (): void => {
        localStorage.setItem("question_id", id.toString())
        router.push("/PaginaRespuesta");
    }
    return (
        <>
            <div className={style.pregunta} onClick={irPreguntas}>
                <div className='flex flex-wrap justify-center'>
                    <FaIcon.FaUserCircle size={'85px'}  />
                </div>
                <div>
                    <h2 >{title}</h2>
                    <h4 >Autor: {user_name}</h4>
                    <div className='mt-5'>
                        <p >{description}</p>
                    </div>
                    
                </div>
                <div >
                    <div className={style.votos}>
                        <div className={style.upvote}>
                            <BsIcon.BsFillHandThumbsUpFill onClick={()=>VoteQuestion("1")} size={"35px"} />
                        </div>
                        <div className={style.downvote}>
                            <BsIcon.BsFillHandThumbsDownFill onClick={()=>VoteQuestion("-1")} size={"35px"} />
                        </div>
                    </div>
                </div>



            </div>



        </>
    )
}

export default PreguntaForo