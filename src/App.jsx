import './App.css'
import { useEffect } from 'react';

import HeaderComponent from './components/headerComponent/HeaderComponent';
import { Container, Col } from 'react-bootstrap';

function App() {


  // Configuration object for the Header
  const headerConfig = {
    showTitle: false,
    isAuthenticated: true,
    title: "Mi Aplicación",
    toggeModeConfig: {
      showLabel: false,
    }

  };


  useEffect(() => {
    localStorage.setItem("user-theme", "light")
  }, [])

  return (
    <>
      <HeaderComponent
        config={headerConfig}

      />
      <div className="page">
        <Container>
          <Col sm={12}>
            <h1> Plantilla Workflow</h1>
            <button>mi boton</button>
          </Col>

        </Container>
      </div>
    </>
  )
}

export default App
