import React, { Component, SyntheticEvent } from 'react';
import axios from 'axios';
import './Public.css';
import { Redirect } from 'react-router';


class Login extends Component {
    email = '';
    password = '';
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await axios.post('login', {
            email: this.email,
            password: this.password,

        });
        // создаем локальное хранилеще с полученным токеном
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/' />;
        }
        return (
            <main className="form-signin">
                <form onSubmit={this.submit}>
                    <h1 className="h4 mb-3 fw-normal text-center">Вход в систему</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                            onChange={e => this.email = e.target.value}
                        />
                        <label htmlFor="floatingInput">Email адрес</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Пароль" required
                            onChange={e => this.password = e.target.value}
                        />
                        <label htmlFor="inputPassword">Пароль</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
                </form>
            </main>
        )
    }
}

export default Login;