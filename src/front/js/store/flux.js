const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: '',
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
      id: null,
      hora: null,
      fecha: null,
      numero: null,
      precio: null,
      ubicaciones: [],
      estado: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password) => {
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        console.log(typeof email,typeof password, "EMAIL; PASSWORD")
        try {

          const resp = await fetch(
            
            "https://3001-jomavera-proyectofinal-kaws94oob0w.ws-us38.gitpod.io/api/token",
            opciones
          );
          if (resp.status !== 200) {
            
            throw new Error("ERROR en respuesta",Error);
          }
          const data = await resp.json();
          console.log("Informacion desde backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return data;
        } catch (error) {

          console.error(`Login error: ${error}`);
        }
      },

      sincronizarTokenParaSessionStrore: () => {
        const token = sessionStorage.getItem("token");
        console.log("aplicacion sincronizada desde session Storage token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Cerrar sesion");
        setStore({ token: null});
      },
      
      getMessage: () => {
        const store = getStore();
        const opciones = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(
          "https://3001-jomavera-proyectofinal-kaws94oob0w.ws-us38.gitpod.io/api/hello",
          opciones
        )
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      registrarse: async (name, lastname, email, password) => {
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-jomavera-proyectofinal-kaws94oob0w.ws-us38.gitpod.io/api/new_user",
            opciones
          );
          if (resp.status != 200) {
            throw new Error("ERROR en respuesta", Error);
          }
          const data = await resp.json();
          console.log("Informacion desde backend", data);
          setStore({ data: data });
          return data;
        } catch (error) {
          console.error(`New user error: ${error}`);
        }
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
      actualizarPedido: (id, fecha, hora, numero, precio) => {
        setStore({
          id: id,
          fecha: fecha,
          hora: hora,
          numero: numero,
          precio: precio,
        });
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
      actualizarEstado: (estado) => {
        setStore({ estado: estado });
      },
    },
  };
};

export default getState;
