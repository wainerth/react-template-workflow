import './App.css'
import { useEffect } from 'react';


import ToggleTheme from './components/toggleTheme/ToggleTheme'
function App() {

  // variable para configurar mi toggle de cambio de modo
  const configToggle = {
    showLabel:true,
    toggleLabel:"Mi toggle Mode",
    fixed:true
  }

  useEffect(()=> {
      localStorage.setItem("user-theme","light")
  },[])

  return (
    <>
        <ToggleTheme config={configToggle} />
      <h1> Plantilla Workflow</h1>
    <button>mi boton</button>
    </>
  )
}

export default App
