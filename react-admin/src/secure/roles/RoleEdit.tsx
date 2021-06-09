import axios from 'axios';
import React, { Component, PropsWithoutRef, SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { Permission } from '../../classes/permission';
import { Role } from '../../classes/role';
import Wrapper from '../Wrapper'

export default class RoleEdit extends Component<{ match: any }> {

    state = {
        permissions: [],
        name: '',
        selected: [],
        redirect: false
    }

    name = '';
    id = '';
    selected: number[] = []; //хранение выбранных "разрешений"

    componentDidMount = async () => {
        this.id = this.props.match.params.id;
        const permissionCall = await axios.get('permission');
        const roleCall = await axios.get(`roles/${this.id}`);
        const role: Role = roleCall.data;
        
        this.setState({
            permissions: permissionCall.data.data,
        })
        console.log(role.permissions);
    }

    // проверка чекбокса
    check = (id: number) => {
        if (this.selected.filter(s => s === id).length > 0) {
            this.selected = this.selected.filter(s => s !== id);
            return;
        }
        this.selected.push(id)
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.post('roles', {
            name: this.name,
            permissions: this.selected
        });
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/roles'} />
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Изменить данные роли</h1>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Название</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" id="name" placeholder="Название" required
                                defaultValue={this.name = this.state.name}
                                onChange={e => this.name = e.target.value}
                            />
                        </div>
                    </div>

                    <div className="fom-group row">
                        <label className="col-sm-2 col-form-label">Разрешения</label>
                        <div className="col-sm-10">
                            {this.state.permissions.map(
                                (permission: Permission) => {
                                    return (
                                        <div className="form-check form-check-inline col-3" key={permission.id}>
                                            <input type="checkbox" className="form-check-input" value={permission.id}
                                                onChange={e => this.check(permission.id)}
                                            />
                                            <label className="form-check-label">{permission.name}</label>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Изменить</button>
                </form>
            </Wrapper>
        )
    }
}