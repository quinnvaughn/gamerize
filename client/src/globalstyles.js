import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  font-size: 62.5%;
  margin: 0 !important;
}
  body {
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700, 800, 900');
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin: 0 !important;
    padding: 0;
    overflow-x:hidden !important;
    position: relative;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  }
  button {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  input {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  textarea {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  div {
    box-sizing: border-box;
    cursor: default;
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  h1 {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  h2 {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  h3 {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  h4 {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  p {
    margin: 0;
  }
  button {
    :focus {
      outline: 0;
    }
  }
`
export default GlobalStyle
