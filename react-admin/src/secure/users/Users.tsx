import React, { Component } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { User } from '../../classes/user';
import { Link } from 'react-router-dom';

class Users extends Component {
    state = {
        users: []
    }

    page = 1;

    componentDidMount = async () => {
        const response = await axios.get(`users?page=${this.page}`);
        this.setState({
            users: response.data.data
        })
    }

    next = async () => {
        this.page++;  
        await this.componentDidMount();
    }

    back = async () => {
        this.page--;
        await this.componentDidMount();
    }

    render() {
        return (
            <Wrapper>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={'/users/create'} type="button" className="btn btn-sm btn-outline-secondary">Добавить</Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(
                                (user: User) => {
                                    return (
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.first_name} {user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role.name}</td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <a type="button" className="btn btn-sm btn-outline-secondary">Изменить</a>
                                                    <a type="button" className="btn btn-sm btn-outline-secondary">Удалить</a>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className="pagination">
                        <li className="page-item"><a href="" className="page-link" onClick={this.back}>Назад</a></li>
                        <li className="page-item"><a href="" className="page-link" onClick={this.next}>В перед</a></li>
                    </ul>
                </nav>
            </Wrapper>
        )
    }
}


export default Users;