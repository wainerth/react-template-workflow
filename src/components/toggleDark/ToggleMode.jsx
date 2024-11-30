import { useEffect } from 'react';

import "./css/toggleMode.css"
import { useState } from 'react';


function ToggleMode() {
  const [darkModetoggleIsOn, setDarkModetoggleIsOn] = useState(false);


  // LIGHT THEME COLOR VARIABLES
  const lightBase = '#bdbdbd';
  const lightBackground = '#FFFFFF';
  // const lightShadow = 'rgba(18, 18, 18, .3)';
  const lightPrimary = '#6200EE';
  const lightPrimaryDark = '#3700B3';
  const lightSecondary = '#03DAC6';
  const lightSecondaryDark = '#018786';
  // const lightErrorColor = '#B00020';

  // DARK THEME COLOR VARIABLES
  const darkBase = '#1d1d1d';
  const darkBackground = '#121212';
  // const darkShadow = 'rgba(255, 255, 255, .1)'
  const darkPrimary = '#BB86FC';
  const darkPrimaryDark = '#3700B3';
  const darkSecondary = '#03DAC6';
  // const darkErrorColor = '#CF6679';

  // GLOBAL VARIABLES
  // eslint-disable-next-line no-debugger
  debugger

  useEffect(() => {

    turnOnDarkModeColors();
  }, [])

  const funcClickToggle = () => {
    const darkModeSwitch = document.querySelector('#Dark-Mode-Switch');

    if (darkModetoggleIsOn === false) {
      darkModeSwitch.style.justifyContent = 'flex-end';
      setDarkModetoggleIsOn(true);
    } else {
      darkModeSwitch.style.justifyContent = 'flex-start';
      setDarkModetoggleIsOn(false);
    }
    turnOnDarkModeColors();
  }

  function turnOnDarkModeColors() {
    if (darkModetoggleIsOn === true) {
      document.body.style.transition = 'color 1s, background-color 1s';
      document.documentElement.style.setProperty('--light-theme-base', darkBase);
      document.documentElement.style.setProperty('--light-theme-background', darkBackground);
      document.documentElement.style.setProperty('--light-theme-primary', darkPrimary);
      document.documentElement.style.setProperty('--light-theme-primary-dark', darkPrimaryDark);
      document.documentElement.style.setProperty('--light-theme-secondary', darkSecondary);
      document.documentElement.style.setProperty('--light-theme-secondary-dark', darkSecondary);
      document.body.style.color = lightBackground;
    } else {
      document.body.style.transition = 'color 1s, background-color 1s';
      document.documentElement.style.setProperty('--light-theme-base', lightBase);
      document.documentElement.style.setProperty('--light-theme-base', lightBase);
      document.documentElement.style.setProperty('--light-theme-background', lightBackground);
      document.documentElement.style.setProperty('--light-theme-primary', lightPrimary);
      document.documentElement.style.setProperty('--light-theme-primary-dark', lightPrimaryDark);
      document.documentElement.style.setProperty('--light-theme-secondary', lightSecondary);
      document.documentElement.style.setProperty('--light-theme-secondary-dark', lightSecondaryDark);
      document.body.style.color = 'black';
    }
  }


  return (
    <>
      <h3>Toggle Dark Mode</h3>
      <div className="toggle-contents-wrapper">
        <p>Off</p>
        <i className="icon icon-light"></i>
        <div id="Dark-Mode-Switch" className="toggle-wrapper">
          <div className="toggle-dot" onClick={funcClickToggle}></div>
        </div>
        <p>On</p>
        <i className="icon icon-dark"></i>
      </div>

    </>
  )
}

export default ToggleMode
