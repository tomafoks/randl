import React, { Component, SyntheticEvent } from 'react'
import './Public.css';
import axios from 'axios';
import { Redirect } from 'react-router';

class Register extends Component {
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.post('http://localhost/api/register', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
        });
        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <main className="form-signin">
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Регистрация</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="firstName" placeholder="Логин" required
                            onChange={e => this.first_name = e.target.value}
                        />
                        <label htmlFor="firstName">Логин</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="lastName" placeholder="Имя" required
                            onChange={e => this.last_name = e.target.value}
                        />
                        <label htmlFor="lastName">Имя</label>
                    </div>

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

                    <div className="form-floating">
                        <input type="password" className="form-control" id="passwordConfirm" placeholder="Подтвердить пароль" required
                            onChange={e => this.password_confirm = e.target.value}
                        />
                        <label htmlFor="passwordConfirm">Подтвердить пароль</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Регистрация</button>
                </form>
            </main>
        );
    }
}

export default Register;