import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  font-size: 62.5%;
  margin: 0;
  overflow-x:hidden !important;
}
body {
  margin: 0;
}
main {
  display: block;
}
  body {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 0;
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
