import React, { Component } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User } from '../../classes/User';

class Users extends Component {
    state = {
        users: []
    }

    page = 1;
    last_page = 0;

    componentDidMount = async () => {
        const response = await axios.get(`users?page=${this.page}`);
        this.setState({
            users: response.data.data
        });
        this.last_page = response.data.meta.last_page;
    }

    next = async () => {
        if (this.page === this.last_page) return;
        this.page++;
        await this.componentDidMount();
    }

    back = async () => {
        if (this.page === 1) return;
        this.page--;
        await this.componentDidMount();
    }

    delete = async (id: number) => {
        if (window.confirm('Удалить прользователя?')) {
            await axios.delete(`users/${id}`);
            this.setState({
                users: this.state.users.filter((u: User) => u.id !== id)
            })
        }
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
                                                    <Link to={`/users/${user.id}/edit`} type="button" className="btn btn-sm btn-outline-secondary">
                                                        Изменить
                                                    </Link>
                                                    <a type="button" className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => this.delete(user.id)}
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
                <nav>
                    <ul className="pagination">
                        <li className="page-item"><a href="#" className="page-link" onClick={this.back}>Назад</a></li>
                        <li className="page-item"><a href="#" className="page-link" onClick={this.next}>В перед</a></li>
                    </ul>
                </nav>
            </Wrapper>
        )
    }
}


export default Users;