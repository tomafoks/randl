import axios from 'axios';
import React, { Component } from 'react'
import Wrapper from '../Wrapper'

export default class RoleCreate extends Component {

    componentDidMount = async () => {
        const response = await axios.get('roles');
        this.setState({
            roles: response.data.data
        })
    }

    submit = () => { 

    }
    render() {
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Создание новой роли</h1>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Название</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" id="name" placeholder="Название" required/>  
                        </div>
                    </div>

                    <div className="fom-group row">
                        <label className="col-sm-2 col-form-label">Подтверждение</label>
                        <div className="col-sm-10">
                            <div className="form-check form-check-inline col-3">
                                <input type="checkbox" className="form-check-input"/>
                                <label className="form-check-label"></label>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Создать</button>
                </form>
            </Wrapper>
        )
    }
}
