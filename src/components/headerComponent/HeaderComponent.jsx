import Container from 'react-bootstrap/Container';
import { Dropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';

import LogoTemplate from './img/LogoTemplate.png';
import placeholder40 from './img/via-placeholder-40.png';
import { LuBuilding2 } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import flatSpain from './img/españa.png'

import "./css/header.css"
import ToggleTheme from '../toggleTheme/ToggleTheme'


/**
 * @description header component created for workflow template
 * @param {config} object header configuration object
 * @param {onLogout} function callback
 * @param {onSettings} function callback
 * @param {onLanguageSelect} function callback
 * @param {onCompanySelect} function callback
 * @param {onNotificationClick} function callback
 */
const HeaderComponent = ({ config = {}, onLogout, onSettings, onLanguageSelect, onCompanySelect, onNotificationClick }) => {


    /* prop validation */
    HeaderComponent.propTypes = {
        config: PropTypes.object,
        onLogout: PropTypes.func,
        onSettings: PropTypes.func,
        onLanguageSelect: PropTypes.func,
        onCompanySelect: PropTypes.func,
        onNotificationClick: PropTypes.func
    };

    //We destructure the config object, making sure it has default values
    const {
        showLogo = true,
        logo = { url: LogoTemplate, description: "app logo" },
        showTitle = false,
        title = "Title App",
        showToggleMode = true,
        optionMenu = [
            {
                label: "Dashboard",
                route: "dashboard"
            },
            {
                label: "Módulos",
                route: "modulos"
            },
            {
                label: "Roles",
                route: "roles"
            },
            {
                label: "Agenda",
                route: "agenda"
            }
        ],
        toggeModeConfig = {
            showLabel: true,
            toggleLabel: 'Titulo del toggle',
            fixed: false,
            fixedRight: false,
            fixedLeft: false
        },
        isAuthenticated = false,
        showIcon = true,
        showUserName = true,
        userName = "Jon Doe",
        userEmail = "jonDoe@mail.com",
        userIcon = {
            url: placeholder40,
            description: "icon user"
        },
        showLanguageDropdown = true,
        showCompanyDropdown = true,
        showNotificationsDropdown = true
    } = config;



    return (

        <header className="header">

            <Navbar expand="xl" className="bg-body-tertiary nav-app" >
                <Container fluid>
                    <div className='img-logo'>
                        {/* company logo */}
                        {showLogo && (
                            <Navbar.Brand href="#">
                                <img className='img-fluid' src={logo.url} alt={logo.description} />
                            </Navbar.Brand>
                        )}
                    </div>
                    {showTitle && <h1 className="header-title">{title}</h1>}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            {
                                optionMenu.map((item, index) => {
                                    return (
                                        <Nav.Link href={item.route} key={index}>{item.label}</Nav.Link>

                                    )

                                })
                            }

                        </Nav>
                        <div className='others-actions'>

                            {showLanguageDropdown && (
                                <Dropdown className="language-dropdown workflow-dropdown">
                                    <Dropdown.Toggle id="dropdown-language">
                                        <div className="img-flat">
                                            <img className='img-fluid' src={flatSpain} alt="flat Country" />
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => onLanguageSelect('Español')}>Español</Dropdown.Item>
                                        <Dropdown.Item onClick={() => onLanguageSelect('Inglés')}>Inglés</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                            {/* Dropdown del usuario */}
                            {isAuthenticated && (<div className='action-user'>
                                {showCompanyDropdown && (
                                    <Dropdown className="company-dropdown workflow-dropdown">
                                        <Dropdown.Toggle id="dropdown-company">
                                            <div className="img-45">
                                                <LuBuilding2 size={20} color='dark' />
                                                {/* <img className='img-fluid' src={logocorporation} alt="logo corporación" /> */}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => onCompanySelect('Empresa 1')}>Empresa 1</Dropdown.Item>
                                            <Dropdown.Item onClick={() => onCompanySelect('Empresa 2')}>Empresa 2</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}

                                {showNotificationsDropdown && (
                                    <Dropdown className="notifications-dropdown workflow-dropdown">
                                        <Dropdown.Toggle id="dropdown-notifications">
                                            <div className="img-45">
                                                <FaRegBell size={20} color='dark' />
                                                {/* <img className='img-fluid' src={iconNotification} alt="logo Notificación" /> */}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={onNotificationClick}>Notificación 1</Dropdown.Item>
                                            <Dropdown.Item onClick={onNotificationClick}>Notificación 2</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}

                                {/* Ícono condicional */}
                                <div className='user-icon'>
                                    {showIcon && (
                                        <img
                                            src={userIcon.url}
                                            alt={userIcon.description}
                                        />
                                    )}
                                </div>
                                <Dropdown className="user-dropdown ">
                                    <Dropdown.Toggle className="user-icon-dropdown" id="dropdown-basic">

                                        {/* Nombre del usuario condicional */}
                                        {showUserName && <div className="user-name">
                                            <span className='alias'> {userName}</span>
                                            <span className='email'>{userEmail}</span>
                                        </div>}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <Dropdown.Item onClick={onSettings}>Configuración</Dropdown.Item>
                                        <Dropdown.Item onClick={onLogout}>Cerrar sesión</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>)}
                            {showToggleMode && (
                                <ToggleTheme config={toggeModeConfig} />
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </header >
    );
};

export default HeaderComponent;