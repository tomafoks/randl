import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from './components/Header';
import Menu from './components/Menu';
import Nav from './components/Nav';

class Wrapper extends Component {
    state = {
        redirect: false
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('user');
        } catch (e) {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'} />
        }
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Nav />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        )
    }
}

export default Wrapper;