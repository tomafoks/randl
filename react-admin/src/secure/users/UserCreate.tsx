import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { Role } from '../../classes/role';
import Wrapper from '../Wrapper'

export default class UserCreate extends Component {

    state = {
        roles: [],
        redirect: false
    }

    first_name = '';
    last_name = '';
    email = '';
    role_id = 0;

    componentDidMount = async () => {
        const response = await axios.get('roles');
        this.setState({
            roles: response.data.data
        })
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.post('users', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role_id: this.role_id
        });
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/users'} />
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Создание нового пользователя</h1>

                    <div className="form-group">
                        <input type="text" className="form-control" id="firstName" placeholder="Логин" required
                            onChange={e => this.first_name = e.target.value}
                        />
                        <label htmlFor="firstName">Логин</label>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="lastName" placeholder="Имя" required
                            onChange={e => this.last_name = e.target.value}
                        />
                        <label htmlFor="lastName">Имя</label>
                    </div>

                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" required
                            onChange={e => this.email = e.target.value}
                        />
                        <label htmlFor="email">Email адрес</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role_id">Роль</label>
                        <select name="role_id" id="role_id" className="form-control"
                            onChange={e => this.role_id = parseInt(e.target.value)}
                        >
                            <option value="">Выберите роль</option>
                            {
                                this.state.roles.map(
                                    (role: Role) => {
                                        return (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Создать</button>
                </form>
            </Wrapper>
        )
    }
}
