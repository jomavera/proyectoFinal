const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      hora: null,
      fecha: null,
      numero: null,
      ubicaciones: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      actualizarPedido: (fecha, hora, numero) => {
        setStore({ fecha: fecha, hora: hora, numero: numero });
      },
      anadirUbicacion: (row, number, id) => {
        const store = getStore();
        let newUbicaciones = store.ubicaciones;
        newUbicaciones.push({ row: row, number: number, id: id });
        setStore({ ubicaciones: newUbicaciones });
      },
      quitarUbicacion: (row, number, id) => {
        const store = getStore();
        let newUbicaciones = store.ubicaciones.filter((e) => e.id != id);
        setStore({ ubicaciones: newUbicaciones });
      },
    },
  };
};

export default getState;
