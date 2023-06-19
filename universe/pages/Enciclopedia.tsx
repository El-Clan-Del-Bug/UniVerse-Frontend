import Head from "next/head";
import * as Faicon from "react-icons/fa";
import * as IoIcon from "react-icons/io";
import * as HiIcon from "react-icons/hi";
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import TarjetaTemas from "universe/Component/TarjetaTemas";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";

const colorIcon = "#61EB8D";
interface Tema {
	name: string;
}

var topicID: number;
var topicName: string;

export default function Enciclopedia() {
	const [showFormCrearTema, setShowFormCrearTema] = useState(false);
	const statusShowFormCrearTema = () => {
		setShowFormCrearTema(!showFormCrearTema);
		toggle();
	};
	const [Temas, setTemas] = useState([
		{
			topic_id: 0,
			topic_name: "",
		},
	]);
	const [confirmacion, setConfirmacion] = useState(false);
	const stateConfirmacion = () => {
		setConfirmacion(!confirmacion);
		toggle();
	};
	const [actualizacion, setActualizacion] = useState(0);
	const newActualizacion = () => {
		setActualizacion(actualizacion + 1);
	};

	const toggle = () => {
		var blurMain = document.getElementById("main");
		blurMain?.classList.toggle("active");
	};
	//FUNCION PARA TRAER TODOS LOS TEMAS DE LA ENCICLOPEDIA DE LA COMUNIDAD
	useEffect(() => {
		const fetchData = async () => {
			// se trae la informacion de los documentos que existen al entrar a la pagina
			//setIsLoading(true)
			try {
				const res = await fetch("http://localhost:3333/api/topics/community/" + localStorage.getItem("comunidad_ID"), {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});

				if (res.ok) {
					const data = await res.json();
					console.log(data["topics"]);
					setTemas(data["topics"]);
				}
			} catch (error: any) {
				console.error("Error:", error);
				alert(error.message);
			}
		};
		fetchData();
	}, [actualizacion]);

	const crearTema = async (values: Tema) => {
		/**funcion para la creacion de un tema en el backend */
		// se trae la informacion de los documentos que existen al entrar a la pagina
		//setIsLoading(true)
		try {
			const res = await fetch("http://localhost:3333/api/topic", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ name: values.name, community_id: localStorage.getItem("comunidad_ID") }),
			});
			if (res.ok) {
				console.log("success:", "Creado con exito");
				alert("Creado con exito");
				statusShowFormCrearTema();
			} else {
				console.log(await res.json());
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}
	};
	const eliminar = (topic_ID: number, topic_Name: string) => {
		topicID = topic_ID;
		topicName = topic_Name;
		stateConfirmacion();
	};

	const eliminarTema = async () => {
		/**funcion para la creacion de un tema en el backend */

		try {
			const res = await fetch("http://localhost:3333/api/topic/id/" + topicID, {
				method: "DELETE",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (res.ok) {
				console.log("Success:", "Se ha eliminado el documento de forma correcta ");
				alert("Se ha eliminado el documento de forma correcta");
				newActualizacion();
			} else {
				console.error("Error:", "sucedio un error al eliminar un tema, vuelva a intentarlo");
				alert("sucedio un error al eliminar un tema, vuelva a intentarlo");
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}

		stateConfirmacion();
	};

	return (
		<>
			<Head>
				<title>Universe</title>
			</Head>
			<main id="main">
				<Navbar></Navbar>
				<LateralNavBar></LateralNavBar>
				<div className="principal_Content">
					<div className="flex space-x-3">
						<Faicon.FaBookOpen size={"60px"} color={colorIcon} />
						<h1>Temas</h1>
					</div>
					<div className="flex flex-wrap ">
						{Temas.map((item, index) => {
							return (
								<TarjetaTemas
									key={item.topic_id}
									id_Topic={item.topic_id}
									name={item.topic_name}
									ruta={"/DocumentosTema"}
									eliminar={eliminar}
								></TarjetaTemas>
							);
						})}
					</div>

					<div className="button_crear" onClick={statusShowFormCrearTema}>
						<IoIcon.IoMdAdd size={"80px"} color={colorIcon} />
					</div>
				</div>
				{/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}
			</main>
			{confirmacion ? (
				<ConfirmacionRecuadro
					mensaje="Esta seguro de eliminar el tema:"
					name={topicName}
					eliminar={eliminarTema}
					cerrar={stateConfirmacion}
				></ConfirmacionRecuadro>
			) : null}
			{showFormCrearTema ? (
				<div>
					<Formik
						initialValues={{
							name: "",
						}}
						onSubmit={async (values) => {
							crearTema(values);
							//alert(JSON.stringify(values));
						}}
					>
						{({ handleSubmit, values, handleChange }) => (
							<form onSubmit={handleSubmit}>
								<div id="encabezado">
									<IoIcon.IoMdClose size={"25px"} onClick={statusShowFormCrearTema} id="close" />

									<div>
										<HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
										<h2>Nuevo Tema</h2>
									</div>
									<div>
										<button type="submit">
											<h3>Crear</h3>
										</button>
									</div>
								</div>
								<div id="inputs">
									<div>
										<h5>Nombre del tema:</h5>
										<input
											name="name"
											type="text"
											placeholder="nombre tema"
											value={values.name}
											onChange={handleChange}
										/>
									</div>

									{/**segunda columna del formulario esi es necesario */}
								</div>
							</form>
						)}
					</Formik>
				</div>
			) : null}
		</>
	);
}
