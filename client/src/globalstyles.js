import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  font-size: 62.5%;
}
  body {
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700, 800');
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x:hidden;
    position: relative;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
  }
  button {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  input {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  div {
    box-sizing: border-box;
    cursor: default;
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  h1 {
    margin: 0;
  }
  h2 {
    margin: 0
  }
  h3 {
    margin: 0;
  }
  h4 {
    margin: 0;
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
