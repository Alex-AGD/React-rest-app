import React, { Component } from 'react';
import axios from "axios";


class AddForm extends Component {

    constructor (props) {
      super (props);
        this.onChangeToolsName = this.onChangeToolsName.bind (this);
        this.onChangeToolsPrice = this.onChangeToolsPrice.bind (this);
        this.onChangeToolsDate = this.onChangeToolsDate.bind (this);
        this.onSubmit = this.onSubmit.bind (this);

        this.state = {
            id: 4,
            toolName: '',
            cost: '',
            date: '',
        }
    }

    onChangeToolsName (e) {
        this.setState ({ toolName: e.target.value })
    }

    onChangeToolsPrice (e) {
        this.setState ({ cost: e.target.value })
    }

    onChangeToolsDate (e) {
        this.setState ({ date: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault ()


    const userObject = {
            toolName: this.state.toolName,
            cost: this.state.cost,
            date: this.state.date
        };

        axios.post ('http://localhost:8080/api/tools', userObject)
            .then ((res) => {
                console.log (res.data)
            }).catch ((error) => {
            console.log(error)
        });
        this.setState ({toolName: '', cost: '', date: '' })

    }



    render () {
        return (
                <div className="wrapper">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Инструмент</label>
                            <input type="text"
                                   value={ this.state.toolName }
                                   onChange={ this.onChangeToolsName }
                                   className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Стоимость</label>
                            <input type="text"
                                   value={ this.state.cost }
                                   onChange={ this.onChangeToolsPrice }
                                   className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Дата</label>
                            <input type="text"
                                   value={ this.state.date }
                                   onChange={ this.onChangeToolsDate }
                                   className="form-control"/>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Добавить" className="btn btn-success btn-block"/>
                        </div>
                    </form>
                </div>
        );
    }
}

export default AddForm;
