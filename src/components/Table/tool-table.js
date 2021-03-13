import React, { Component } from 'react';
import { toolsApi } from '../../api/api'
import filterFactory from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from "react-bootstrap-table2-editor";
import Modal from "../Modal-from/modal-form";
import { Button } from "reactstrap";
import { connect } from 'react-redux';

class ToolTable extends Component {


constructor (props) {
    super (props);

    this.state = {
        tools: [],
        modal: false,
        columns: [ {
            dataField: 'id',
            text: 'ID'
        },
            {
                dataField: 'toolName',
                text: 'Инструмент',
            },
            {
                dataField: 'cost',
                text: 'Стоимость',
                sort: true,
                validator: (newValue, row, column) => {
                    if (isNaN (newValue)) {
                        return {
                            valid: false,
                            message: "Цена должна быть цифрами"
                        };
                    }
                    if (newValue < 1) {
                        return {
                            valid: false,
                            message: "Цена должна быть не меньше 1"
                        };
                    }
                    return true;
                }
            },
            {
                dataField: 'dateOfTools',
                text: 'Дата',
                sort: true
            }

        ]
    }
}
    Rerender = () => {
        this.forceUpdate()
    }


    componentDidMount () {
        toolsApi.getAll ()
            .then (res=> {
                this.setState ({ tools: res.data });
            })
            .catch (e => {
                console.log (e);
            });
    }

    componentDidUpdate (prevProps, prevState,) {
    console.log(prevProps,prevState, this.props, this.state)
        if (this.state.tools !== this.state.tools) {

    }}


    render () {
        return (
            <>
            <div className="container" style={ { marginTop: 50 } }>
                <Modal
                    title={ 'Введите данные' }
                    isOpened={ this.state.modal }
                    onModalClose={()=> this.setState({modal:false})}
                >
                </Modal>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={ this.state.tools }
                    columns={ this.state.columns }
                    filter={ filterFactory () }
                    cellEdit={ cellEditFactory ({
                        mode: "click",
                        blurToSave: true
                    })}
                />
                <Button onClick={
                    () => this.setState ({ modal: true })
                }>Добавить продукт</Button>
            </div>
                </>
        );
    }
}

export default connect (state => ({
    testStore: state}),dispatch=>({}))
(ToolTable)

