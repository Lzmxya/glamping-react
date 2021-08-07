import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import $ from "jquery";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";
import Member from "./pages/Member";
import Intro from "./pages/Intro";
import Set from "./pages/Set";
import Customized from "./pages/Customized";
import Carts from "./pages/Carts";
import Checkout from "./pages/Checkout";

function App() {
  const [auth, setAuth] = useState(true);
  const [isDay, setIsDay] = useState(true);

  async function checkIsLogin() {
    const url = `http://localhost:8080/api/auth/check`;
    const request = new Request(url, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
    const response = await fetch(request);
    const isLogin = await response.json();
    console.log("登入與否？", isLogin);
    if (isLogin) {
      setAuth(true);
    } else {
      localStorage.removeItem("u_id");
      setAuth(false);
    }
  }

  useEffect(() => {
    checkIsLogin();
  }, []);

  useEffect(() => {
    // 日夜開關
    $(".day-night-switch").on("click", function () {
      $(".day-night-switch").find(".switch-ball").toggleClass("switch");
      $(".day-night-switch").find(".switch-text").toggleClass("switch");
      if ($(".day-night-switch").find(".switch-text").text() === "day") {
        $(".day-night-switch").find(".switch-text").text("night");
        setIsDay(false);
      } else {
        $(".day-night-switch").find(".switch-text").text("day");
        setIsDay(true);
      }
    });
  }, []);

  const cssLink = isDay ? "day" : "night";

  return (
    <>
      <Helmet>
        <link
          type="text/css"
          rel="stylesheet"
          href={`./styles/${cssLink}.css`}
        />
      </Helmet>
      <Router>
        <ScrollToTop>
          <Switch>
            <Layout auth={auth} setAuth={setAuth} isDay={isDay}>
              <Route exact path="/">
                <Home auth={auth} isDay={isDay} />
              </Route>
              <Route path="/event-detail/:i_id">
                <EventDetail auth={auth} isDay={isDay} />
              </Route>
              <Route exact path="/event">
                <Event auth={auth} isDay={isDay} />
              </Route>
              <Route exact path="/set">
                <Set isDay={isDay} />
              </Route>
              <Route exact path="/customized">
                <Customized isDay={isDay} />
              </Route>
              <Route exact path="/carts">
                <Carts auth={auth} isDay={isDay} />
              </Route>
              <Route exact path="/checkout">
                <Checkout isDay={isDay} />
              </Route>
              <Route path="/member">
                <Member auth={auth} isDay={isDay} />
              </Route>
              <Route path="/intro">
                <Intro isDay={isDay} />
              </Route>
            </Layout>
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}
export default App;
