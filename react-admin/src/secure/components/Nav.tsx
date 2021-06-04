import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

class Nav extends Component {

    state = {
        redirect: false
    }

    handleClick = () => {
        localStorage.clear();
        this.setState({
            Redirect:true
        })
    }

    render() {
        if(this.state.redirect){
            <Redirect to={'/login'} />
        }
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">

                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#" onClick={this.handleClick}>
                                <span data-feather="home"></span>
                                    Выход
                                </a>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link active" aria-current="page">
                                <span data-feather="home"></span>
                                Главния
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/users'} className="nav-link">
                                <span data-feather="file"></span>
                                Пользователи
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="shopping-cart"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Nav;