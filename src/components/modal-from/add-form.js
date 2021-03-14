import React, { Component } from 'react';
import axios from "axios";
import { toolsApi } from "../../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddForm extends Component {
    constructor (props) {
        super (props);
        this.onChangeToolsName = this.onChangeToolsName.bind (this);
        this.onChangeToolsPrice = this.onChangeToolsPrice.bind (this);
        this.onChangeDate = this.onChangeDate.bind (this);
        this.onSubmit = this.onSubmit.bind (this);

        this.state = {
            id: 0,
            toolName: '',
            cost: '',
            date: new Date()
        }

    }


    onChangeToolsName (e) {
        this.setState ({ toolName: e.target.value })
    }

    onChangeToolsPrice (e) {
        this.setState ({ cost: e.target.value })
    }

    onChangeDate (date) {
        this.setState ({
            date: date
        });
    }

    onSubmit (e) {
        e.preventDefault ()
        const userObject = {
            toolName: this.state.toolName,
            cost: this.state.cost,
            dateOfTools: this.state.date
        };

        axios.post ('http://localhost:8080/api/tools', userObject)
            .then ((res) => {
                this.setState ({ toolName: '', cost: '', dateOfTools: '' })
                toolsApi.getAll ()
                    .then (res => {
                        this.setState ({ tools: res.data });
                        this.props.setData (res.data);
                    })
            })}


        render (){
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
                            <DatePicker
                                selected={ this.state.date }
                                onChange={ this.onChangeDate }
                                isClearable
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>


                        <div className="form-group">
                            <input type="submit" value="Добавить" className="btn btn-success btn-block"/>
                        </div>
                    </form>
                </div>
            );
        }
    }




export default AddForm
