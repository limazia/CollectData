import { createGlobalStyle } from "styled-components";

import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #app {
    /* height: 100vh; */
    height: 100%;
  }

  body {
    background: #fff;
    font-family: "Poppins", sans-serif;
  }
`;