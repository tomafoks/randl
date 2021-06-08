import axios from 'axios';
import React, { Component, PropsWithoutRef, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { Role } from '../../classes/role';
import { User } from '../../classes/User';
import Wrapper from '../Wrapper'

export default class UserEdit extends Component<{ match: PropsWithoutRef<any> }> {

    state = {
        roles: [],
        first_name: '',
        last_name: '',
        email: '',
        role_id: 0,
        redirect: false
    }

    id = 0;
    first_name = '';
    last_name = '';
    email = '';
    role_id = 0;

    componentDidMount = async () => {
        this.id = this.props.match.params.id;

        const rolesCall = await axios.get('roles');

        const userCall = await axios.get(`users/${this.id}`);

        const user: User = userCall.data.data;

        this.setState({
            roles: rolesCall.data.data,

            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role_id: user.role.id,
        })
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.put(`users/${this.id}}`, {
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
        if(this.state.redirect) {
            return <Redirect to={'/users'}/>
        }
        return (

            <Wrapper>
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Изменить данные пользователя</h1>

                    <div className="form-group">
                        <input type="text" className="form-control" id="firstName" placeholder="Логин" required
                            defaultValue={this.first_name = this.state.first_name}
                            onChange={e => this.first_name = e.target.value}
                        />
                        <label htmlFor="firstName">Логин</label>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="lastName" placeholder="Имя" required
                            defaultValue={this.last_name = this.state.last_name}
                            onChange={e => this.last_name = e.target.value}
                        />
                        <label htmlFor="lastName">Имя</label>
                    </div>

                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" required
                            defaultValue={this.email = this.state.email}
                            onChange={e => this.email = e.target.value}
                        />
                        <label htmlFor="email">Email адрес</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role_id">Роль</label>
                        <select name="role_id" id="role_id" className="form-control"
                            value={this.role_id = this.state.role_id}
                            onChange={e => {
                                this.role_id = parseInt(e.target.value);
                                this.setState({
                                    role_id: this.role_id
                                })
                            }}
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

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Изменить</button>
                </form>
            </Wrapper>
        )
    }
}
