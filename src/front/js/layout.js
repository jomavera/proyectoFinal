import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Registrarse } from "./pages/registrarse";
import { Login } from "./pages/login";
import { Perfil } from "./pages/perfil";
import { Evento } from "./pages/evento";
import { EventoUbicaciones } from "./pages/eventoUbicaciones";
import { DatosCompra } from "./pages/datosCompra";
import { Pago } from "./pages/pago";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Registrado } from "./component/registrado";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/registrarse">
              <Registrarse />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/perfil">
              <Perfil />
            </Route>
            <Route exact path="/registrado">
              <Registrado />
            </Route>
            <Route exact path="/evento/:theid">
              <Evento />
            </Route>
            <Route exact path="/eventoUbicaciones/:theid">
              <EventoUbicaciones />
            </Route>
            <Route exact path="/datosCompra">
              <DatosCompra />
            </Route>
            <Route exact path="/pago">
              <Pago />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
