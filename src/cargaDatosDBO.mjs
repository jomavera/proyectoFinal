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
      new Date(2022, 4, 30),
      new Date(2022, 3, 20),
      new Date(2022, 5, 15),
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
      new Date(2022, 4, 30),
      new Date(2022, 3, 20),
      new Date(2022, 5, 15),
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
      new Date(2022, 4, 30),
      new Date(2022, 3, 20),
      new Date(2022, 5, 15),
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
      new Date(2022, 4, 30),
      new Date(2022, 3, 20),
      new Date(2022, 5, 15),
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
      new Date(2022, 4, 30),
      new Date(2022, 3, 20),
      new Date(2022, 5, 15),
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
      new Date(2022, 4, 30),
      new Date(2022, 3, 20),
      new Date(2022, 5, 15),
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
      new Date(2022, 6, 30),
      new Date(2022, 7, 20),
      new Date(2022, 5, 30),
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
      new Date(2022, 6, 30),
      new Date(2022, 7, 20),
      new Date(2022, 5, 30),
    ],
    categoria: "Cine",
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
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/${url}`,
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log("Se inserto locacion correctamente");
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
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/${url}/${name}`,
      opciones
    );
    if (resp.status != 200) {
      throw new Error("ERROR en respuesta");
    }
    const data = await resp.json();
    console.log("Se obtuvo locacion id correctamente");
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
      "https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/nuevo_evento",
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

datos.forEach((evento) => {
  procesarEvento(evento);
});
