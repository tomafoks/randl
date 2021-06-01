import React, { Component } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Nav from './components/Nav';

class Wrapper extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Nav />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <Menu />
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        )
    }
}

export default Wrapper;