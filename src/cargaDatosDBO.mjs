import fetch from "node-fetch";
const datos = [
  {
    titulo: "Evento 1",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. . Sed maximus consectetur blandit. ",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h30",
    locacion: "Teatro Municipal de Santiago",
    precio: 8000,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Teatro",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 2",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h50",
    locacion: "Teatro Municipal de Las Condes",
    precio: 12000,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Teatro",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 3",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h25",
    locacion: "Teatro Municipal de  Providencia",
    precio: 10000,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Teatro",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 4",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h15",
    locacion: "Teatro Nescafe",
    precio: 15000,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Teatro",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 5",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h35",
    locacion: "Teatro Matucana 100",
    precio: 7000,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Teatro",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 6",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h15",
    locacion: "Teatro Nescafe",
    precio: 15300,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Teatro",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 7",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h15",
    locacion: "Cineplanet Costanera",
    precio: 5300,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Cine",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 8",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h20",
    locacion: "Cinemark",
    precio: 5300,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Cine",
    imagen: "https://via.placeholder.com/300x300",
  },
  {
    titulo: "Evento 9",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit.",
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit commodo tincidunt. Sed nulla ex, feugiat at arcu in, fringilla facilisis nisl. Phasellus placerat leo quis sapien euismod semper. Fusce molestie erat a velit tincidunt, eget rutrum massa bibendum. Suspendisse. ",
    duracion: "1h20",
    locacion: "Movistar Arena",
    precio: 5300,
    funciones: [
      new Date(2022, 6, 30, 22, 15),
      new Date(2022, 7, 20, 20),
      new Date(2022, 5, 30, 21, 30),
    ],
    categoria: "Concierto",
    imagen: "https://via.placeholder.com/300x300",
  },
];

async function insertarDato(url, nombre) {
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nombre,
    }),
  };
  try {
    const resp = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/${url}`,
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log(`Se inserto ${url} correctamente`);
    return data;
  } catch (error) {
    console.error(`Error API ${url}: ${error}`);
  }
}

async function getID(url, name) {
  const opciones = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const resp = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/${url}/${name}`,
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log(`Se obtuvo ${url} id correctamente`);
    return data;
  } catch (error) {
    console.error(`Error API ${url}: ${error}`);
  }
}

async function insertarEvento(evento, locacion_id, categoria_id) {
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: evento.titulo,
      categoria_id: categoria_id,
      locacion_id: locacion_id,
      descripcion: evento.descripcion,
      sinopsis: evento.sinopsis,
      precio: parseInt(evento.precio),
      duracion: evento.duracion,
      imagen: evento.imagen,
    }),
  };
  try {
    const resp = await fetch(
      "https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/nuevo_evento",
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log("Se inserto evento correctamente");
    return data;
  } catch (error) {
    console.error(`Error API nuevo evento: ${error}`);
  }
}

async function procesarEvento(evento) {
  // Insertar locacion
  const respInsertLoc = await insertarDato("nueva_locacion", evento.locacion);
  // Obetener id locacion de DB
  const locacionData = await getID("locacion", evento.locacion);

  // Insertar categoria
  const respInsertCat = await insertarDato("nueva_categoria", evento.categoria);
  // Obetener id categoria de DB
  const categoriaData = await getID("categoria", evento.categoria);

  //Insert evento
  const respNewEvento = await insertarEvento(
    evento,
    locacionData[0]._id,
    categoriaData[0]._id
  );
}

for (const evento of datos) {
  const resp = await procesarEvento(evento);
}

//-------------------- Insertar funciones por cada evento -----------

async function getEventoID(name) {
  const opciones = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const resp = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/evento_name/${name}`,
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log(`Se obtuvo evento por nombre correctamente`);
    return data[0];
  } catch (error) {
    console.error(`Error API: ${error}`);
  }
}

async function insertarFuncion(evento_id, funcion) {
  let minutos = funcion.getMinutes();
  if (minutos < 10) {
    minutos = `0${minutos}`;
  }
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      evento_id: evento_id,
      fecha: funcion.toUTCString(),
      hora: `${funcion.getHours()}h${minutos}`,
    }),
  };
  try {
    const resp = await fetch(
      "https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/nueva_funcion",
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log("Se inserto funcion correctamente");
    return data;
  } catch (error) {
    console.error(`Error API nueva funcion: ${error}`);
  }
}

async function insertarTickets(evento_id, funcion, funcion_id) {
  let minutos = funcion.getMinutes();
  if (minutos < 10) {
    minutos = `0${minutos}`;
  }
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      evento_id: evento_id,
      funcion_id: funcion_id,
      fecha: funcion.toUTCString(),
      hora: `${funcion.getHours()}h${minutos}`,
    }),
  };
  try {
    const resp = await fetch(
      "https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/tickets",
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log("Se inserto Ubicacion en funcion correctamente");
    return data;
  } catch (error) {
    console.error(`Error API ubicacion ${error}`);
  }
}

for (const evento of datos) {
  let respEvento = await getEventoID(evento.titulo);
  for (const funcion of evento.funciones) {
    const resp = await insertarFuncion(respEvento.id, funcion);
    const resp2 = await insertarTickets(respEvento.id, funcion, resp["id"]); //insertar tickets/ubicaciones para cada funcion
  }
}

const usuarios = [
  {
    name: "jose",
    lastname: "vera",
    email: "jose@prueba.com",
    password: "12345",
    is_active: true,
  },
  {
    name: "prueba",
    lastname: "prueba",
    email: "test_user_86167117@testuser.com",
    password: "12345",
    is_active: true,
  },
];

async function insertarUsario(usuario) {
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: usuario.name,
      lastname: usuario.lastname,
      email: usuario.email,
      password: usuario.password,
      is_active: usuario.is_active,
    }),
  };
  try {
    const resp = await fetch(
      "https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/new_user",
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta crear nuevo usuario");
    }
    const data = await resp.json();
    console.log("Se inserto usuario correctamente");
  } catch (error) {
    console.error(`Error API nuevo usuario: ${error}`);
  }
  const data = await resp.json();
  console.log("Se inserto usuario correctamente");
} catch (error) {
  console.error(`Error API nuevo usuario: ${error}`);
}

for (const usuario of usuarios) {
  const resp = await insertarUsario(usuario);
}
