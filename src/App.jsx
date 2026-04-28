// --------------------- hooks ---------------------
import { useEffect } from 'react';
import AcademyAgendateYa from './components/TutorialModule/AcademyAgendateYa';
// --------------------- apollo ---------------------
import { ApolloProvider } from '@apollo/client/react';
import client from './apollo/client';
// ------------------ others ---------------------
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css'

function App() {
  useEffect(() => {
    localStorage.setItem("user-theme", "light")
  }, [])

  return (
    <>

      <div >
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<AcademyAgendateYa />} />

            </Routes>
          </BrowserRouter>
        </ApolloProvider>



      </div>
    </>
  )
}

export default App
