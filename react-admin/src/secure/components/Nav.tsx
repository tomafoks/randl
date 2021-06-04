import React, { Component } from 'react';
import { Redirect } from 'react-router';

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
                            <a className="nav-link active" aria-current="page" href="#" onClick={this.handleClick}>
                                <span data-feather="home"></span>
                                    Выход
                                </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                <span data-feather="home"></span>
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file"></span>
                                Orders
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="shopping-cart"></span>
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="users"></span>
                                Customers
                            </a>
                        </li>
                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Saved reports</span>
                        <a className="link-secondary" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Current month
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Last quarter
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Nav;