import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Role } from '../../classes/role';
import Wrapper from '../Wrapper'

export default class Roles extends Component {

    state = {
        roles: []
    }

    componentDidMount = async () => {
        const response = await axios.get('roles');
        this.setState({
            roles: response.data.data
        })
    }

    delete = async (id: number) => {
        if (window.confirm('Удалить роль?')) {
            await axios.delete(`roles/${id}`);
            this.setState({
                roles: this.state.roles.filter((r: Role) => r.id !== id)
            })
        }
    }

    render() {
        return (
            <Wrapper>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={'/roles/create'} type="button" className="btn btn-sm btn-outline-secondary">Добавить</Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.roles.map(
                                (role: Role) => {
                                    return (
                                        <tr>
                                            <td>{role.id}</td>
                                            <td>{role.name}</td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <Link to={`/roles/${role.id}/edit`} type="button" className="btn btn-sm btn-outline-secondary">
                                                        Изменить
                                                    </Link>
                                                    <a type="button" className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => this.delete(role.id)}
                                                    >Удалить</a>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
}
