import React, { Component } from 'react';
import { toolsApi } from '../../api/api'
import filterFactory from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Modal from "../modal-from/modal-form";
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { setData } from "../../reducers/toolsReducer";
import Chart from "../сhart/chart";



class ToolTable extends Component {

    constructor (props) {
        super (props);

        this.state = {
            modal: false,
            tools: [],
            columns: [ {
                dataField: 'id',
                text: 'ID'
            },
                {
                    dataField: 'toolName',
                    text: 'Инструмент'
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
                    sort: true,
                    formatter: (cell) => {
                        let dateObj = cell;
                        if (typeof cell !== 'object') {
                            dateObj = new Date (cell);
                        }
                        return `${ ('0' + dateObj.getUTCDate ())
                            .slice (-2) }/${ ('0' + (dateObj
                            .getUTCMonth () + 1))
                            .slice (-2) }/${ dateObj
                            .getUTCFullYear () }`;
                    },
                    editor: {
                        type: Type.DATE
                    }
                }

            ]
        }
    }

    componentDidMount () {
        toolsApi.getAll ()
            .then (res => {
                this.props.setData (res.data);
                const arr = Object.values (this.props.tools);
                this.setState ({ tools: arr });
            })
            .catch (e => {
                console.log (e);
            });
    }

    componentDidUpdate (prevProps, prevState) {
        const arr = Object.values (this.props.tools);
        if (this.props.tools !== prevProps.tools) {
            this.setState ({ tools: arr });
        }
    }


    render () {
        return (
            <>
                <div className="container" style={ { marginTop: 50 } }>
                    <Modal
                        setData={ this.props.setData }
                        title={ 'Введите данные' }
                        isOpened={ this.state.modal }
                        onModalClose={ () => this.setState ({ modal: false })
                        }
                    >
                    </Modal>
                    <BootstrapTable
                        striped
                        hover
                        keyField='id'
                        bootstrap4={ true }
                        loading={ true }
                        data={ this.state.tools }
                        columns={ this.state.columns }
                        filter={ filterFactory () }
                        cellEdit={ cellEditFactory ({
                            mode: "dbclick",
                            blurToSave: true,

                        }) }
                    />
                    <Button
                        onClick={ () => this.setState ({ modal: true })
                        }>Добавить продукт</Button>

                    <Chart  tools={ this.state.tools }  />
                </div>
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        tools: state.tools
    }
}
export default connect (mapStateToProps, { setData }) (ToolTable)

