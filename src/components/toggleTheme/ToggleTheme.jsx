import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './css/toggleTheme.css'


/**
 *@description toggle component to switch from light to dark mode and vice versa
 *@author Pedro Parada
 * @param {config}  object that defines the initial configuration of the toggle
 */
const ThemeToggle = ({ config = {
    showLabel: true,
    toggleLabel: 'Titulo del toggle',
    fixed: false,
    fixedRight: false,
    fixedLeft: false
} }) => {

    ThemeToggle.propTypes = {
        config: PropTypes.object,

    };


    const [theme, setTheme] = useState(() => {
        // detect if there is user configuration
        const storedTheme = localStorage.getItem('user-theme');
        if (config.fixed && !config.fixedRight && !config.fixedLeft) {
            config.fixedRight = true;
        }
        // Detect initial theme based on prefers-color-scheme
        return storedTheme ? storedTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [darkModetoggleIsOn, setDarkModetoggleIsOn] = useState(false);


    useEffect(() => {
        // Set the class in the <html> to apply global styles
        document.documentElement.className = theme;

        // Listener for changes in prefers-color-scheme
        const mediaQuery = window.matchMedia(`(prefers-color-scheme: ${theme})`);
        const darkModeSwitch = document.querySelector('#Dark-Mode-Switch');
        if (theme === 'dark') {
            darkModeSwitch.style.justifyContent = 'flex-end';
            setDarkModetoggleIsOn(true);
        } else {
            darkModeSwitch.style.justifyContent = 'flex-start';
            setDarkModetoggleIsOn(false);
        }

        mediaQuery.addEventListener('change', handleChange);


        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    /**
     * @description function that changes the state of the theme variable
     * @param {*} e 
     */
    const handleChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
    };


    /**
     * @description function that changes the toggle from light to dark mode and vice versa
     */
    const toggleTheme = () => {
        const darkModeSwitch = document.querySelector('#Dark-Mode-Switch');

        if (darkModetoggleIsOn === false) {
            darkModeSwitch.style.justifyContent = 'flex-end';
            setDarkModetoggleIsOn(true);
        } else {
            darkModeSwitch.style.justifyContent = 'flex-start';
            setDarkModetoggleIsOn(false);
        }
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };


    return (
        <div className={`toggle-contents ${(config.fixed === true) ? config.fixedRight ? 'fixed-toggle fixed-right' : 'fixed-toggle fixed-left' : ''} `}>
            {
                config.showLabel && (
                    <h3 className='label-toggle'>{config.toggleLabel}</h3>
                )
            }
            <div className="toggle-contents-wrapper">
                <i className="icon icon-light" title='Light theme'></i>
                <div id="Dark-Mode-Switch" className="toggle-wrapper">
                    <div className="toggle-dot" onClick={toggleTheme}></div>
                </div>
                <i className="icon icon-dark" title='Dark theme'></i>
            </div>
        </div>
    );
};

export default ThemeToggle;