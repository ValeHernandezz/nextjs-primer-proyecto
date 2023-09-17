// Si no coloco esto, por defecto sería "use server"
"use client";

import { useState } from "react";
import { IconTrash } from "./components/icons/IconTrash";
import { IconEdit } from "./components/icons/IconEdit";
import { IconGripHorizontal } from "./components/icons/IconGripHorizontal";

// Funcion que hace algo y devuelve un pedacito de HTML
export default function Home() {
  /*
    useState es un estado para almacenar lo que necesites
    siempre que cambie su valor, ser vuelve a renderizar el componente que utilice el estado
    Hooks de react EJ: useState, useEffect, useRef, useMemo...
  */
  const [listaDeMensajes, setListaDeMensajes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idMessage, setIdMessage] = useState(null);
  let haveOne = listaDeMensajes.length === 0;

  function addMessage(event) {
    event.preventDefault();

    const { mensaje } = Object.fromEntries(new window.FormData(event.target));

    if (mensaje == null || mensaje.length === 0) {
      alert("Texto no válido");
      return;
    }

    setListaDeMensajes([...listaDeMensajes, mensaje]);

    // Limpia el valor previamente colocado
    const form = document.getElementById("formulario");
    form.reset();
  }

  function deleteMessage(indexDelete) {
    const listaNueva = listaDeMensajes.filter((mensaje, index) => {
      return index !== indexDelete;
    });

    setListaDeMensajes(listaNueva);
  }

  function editMessage(indexEdit) {
    let message = listaDeMensajes.find((message, index) => {
      return index === indexEdit;
    });

    if (message != null) {
      setEdit(true);
      const input = document.getElementById("inputMessage");
      input.value = message;
      setIdMessage(indexEdit);
    }
  }

  function editMessageContent(event) {
    event.preventDefault();

    const { mensaje: newMessage } = Object.fromEntries(
      new window.FormData(event.target)
    );

    const listaNueva = listaDeMensajes.map((message, index) => {
      if (index === idMessage) {
        message = newMessage;
      }
      return message;
    });

    setListaDeMensajes(listaNueva);
    setEdit(false);
    setIdMessage(null);

    const form = document.getElementById("formulario");
    form.reset();
  }

  return (
    <div>
      <div className="flex flex-col max-w-[600px] mx-auto justify-center items-center md:px-0 px-10">
        <h1 className="mt-16 mb-8 text-5xl font-semibold text-gray-900 md:text-6xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8398ff] to-[#a953ff]">
            Message List
          </span>{" "}
          App
        </h1>
        <div className="text-center text-lg md:text-xl font-normal text-gray-800 mb-8">
          <p className="mb-2">
            <span className="font-semibold underline decoration-indigo-500">
              Crea
            </span>
            , visualiza y controla tus propios mensajes de manera sencilla.{" "}
            <span className="font-semibold underline decoration-indigo-500">
              Edita
            </span>{" "}
            o{" "}
            <span className="font-semibold underline decoration-indigo-500">
              elimina
            </span>{" "}
            tus creaciones con facilidad.
          </p>
          <p>
            ¡Comienza a expresarte{" "}
            <span className="text-[#a953ff] font-semibold">ahora mismo</span>!
          </p>
        </div>
        <p className="text-center my-5 text-xl text-gray-900 font-semibold">
          {haveOne ? "Agrega tu primer mensaje" : "Nuevo mensaje"}
        </p>
      </div>

      <form
        id="formulario"
        onSubmit={!edit ? addMessage : editMessageContent}
        className="text-black flex flex-col gap-y-5 max-w-[300px] mx-auto justify-center items-center md:px-0 px-10"
      >
        <input
          type="text"
          id="inputMessage"
          name="mensaje"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4"
          placeholder="Mensaje"
          required
        />
        <button
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#8398ff] to-[#a953ff] group-hover:from-[#8398ff] group-hover:to-[#a953ff] hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 mb-5"
          type="submit"
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
            {!edit ? "Añadir" : "Editar"}
          </span>
        </button>
      </form>

      <div className="text-center space-y-5 flex flex-col max-w-[600px] mx-auto justify-center items-center text-gray-900 md:px-0 px-10 mb-16">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
            <IconGripHorizontal />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl mb-5 font-semibold">
          Lista de Mensajes
        </h2>

        {haveOne ? (
          <>
            <p className="text-gray-900">No hay mensajes</p>
          </>
        ) : (
          listaDeMensajes.map((mensaje, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-x-3  text-lg md:px-0 px-10"
              >
                <p className="pr-3">{mensaje}</p>
                <button onClick={() => deleteMessage(index)}>
                  <IconTrash />
                </button>
                <button onClick={() => editMessage(index)}>
                  <IconEdit />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// Esto es un return de React: devuelve un pedazo de HTML
// return (
//   <div>
//     <h2>Mi primera app</h2>
//     {listaDeMensajes.map((mensaje) => {
//       return <p>{mensaje}</p>;
//     })}
//     <button onClick={() => {}}>Click</button>
//   </div>
// );

/*
<body>
  <Home /> -> 
</body>
*/

// export default or export:
// 1- import Home from "ruta": default (sólo puede haber 1) page.js
// 2- import {myFuncion, myFuncion2} from "ruta": pueden haber más de 1 page.js

// 2-
// export function myFuncion(){}...

// export function myFuncion2(){}...

// export function myFuncion3(){}...

/*
  Si return <></> simplemente lo va a insertar en el body con las etiquetas de dentro, pero su return <div></div> con otras etiquetas nuevas va a crear otro <div>
*/

/*
  Formas para definir los tipo de variables:
  let - Puedo cambiar el valor y tipo de la variable
  const - No puedo cambiar el valor a no ser que sea un objeto y quiera cambiarle el valor a un atributo
*/

/*
  Tipos de =
  = compara el tipo "hola" = "pepe"
  == compara el tipo y el valor 0 == "0"
  === identico 0 === 0
*/
