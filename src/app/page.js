// Si no coloco esto, por defecto sería "use server"
"use client";

import { useState } from "react";

// Funcion que hace algo y devuelve un pedacito de HTML
export default function Home() {
  // useState es un estado para almacenar lo que necesites
  // siempre que cambie su valor, ser vuelve a renderizar el componente que utilice el estado
  // Hooks de react EJ: useState, useEffect, useRef, useMemo...
  const [listaDeMensajes, setListaDeMensajes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idMessage, setIdMessage] = useState(null);

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

  let haveOne = listaDeMensajes.length === 0;

  return (
    <div>
      <p className="text-center py-5">
        {haveOne ? "Agrega tu primer mensaje" : "Nuevo mensaje"}
      </p>

      <form
        id="formulario"
        onSubmit={!edit ? addMessage : editMessageContent}
        className="text-black flex flex-col gap-y-5 max-w-[200px] mx-auto"
      >
        <input
          id="inputMessage"
          type="text"
          name="mensaje"
          placeholder="Mensaje..."
        />
        <button className="bg-white px-2 py-1" type="submit">
          {!edit ? "Añadir" : "Editar"}
        </button>
      </form>

      <div className="text-center pt-5 space-y-5">
        {haveOne ? (
          <>No hay mensajes</>
        ) : (
          listaDeMensajes.map((mensaje, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-x-3"
              >
                <p>{mensaje}</p>
                <button
                  onClick={() => deleteMessage(index)}
                  className="bg-white text-black px-2 rounded font-bold"
                >
                  X
                </button>
                <button
                  onClick={() => editMessage(index)}
                  className="bg-white text-black px-2 rounded font-bold"
                >
                  Editar
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
