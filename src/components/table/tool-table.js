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
import paginationFactory from 'react-bootstrap-table2-paginator';

class ToolTable extends Component {


    constructor (props) {
        super (props);
        this.handleGetCurrentData = this.handleGetCurrentData.bind (this);
        const headerSortingStyle = { backgroundColor: '#c8e6c9' };
        this.state = {
            modal: false,
            tools: [],
            columns: [ {
                dataField: 'id',
                text: 'ID',
                sort: true,
                headerSortingStyle
            },
                {
                    dataField: 'toolName',
                    text: 'Инструмент',
                    sort: true,
                    headerSortingStyle,
                    validator: (newValue => {
                        if (newValue < 1) {
                            return {
                                valid: false,
                                message: "Введите название"
                            };
                        }
                        return true;
                    })
                },
                {
                    dataField: 'cost',
                    text: 'Стоимость',
                    headerSortingStyle,
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
                                message: "Введите стоймость"
                            };
                        }
                        return true;
                    }
                },
                {
                    dataField: 'dateOfTools',
                    text: 'Дата',
                    sort: true,
                    headerSortingStyle,
                    editor: {
                        type: Type.DATE
                    }
                }
            ]
        }
    }

    handleGetCurrentData = (oldValue, newValue, row, column) => {

        if (newValue !== oldValue) {
            const newData = {
                tools: newValue,
                id: row[ 'id' ],
                field: column.dataField
            }

            const arr = Object.values (this.props.tools);
            const newToolARr = arr.find (x => x.id === newData.id)

            toolsApi.put (+newData.id, newToolARr)
                .then (res => {
                    this.setState (newToolARr);
                })
                .catch (e => {
                    console.log (newToolARr);
                });
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
            //console.log (prevState, this.state)
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
                        ref={ n => this.node = n }
                        striped
                        hover
                        keyField='id'
                        pagination={ paginationFactory () }
                        bootstrap4={ true }
                        loading={ true }
                        data={ this.state.tools }
                        columns={ this.state.columns }
                        filter={ filterFactory () }
                        cellEdit={ cellEditFactory ({
                            mode: "dbclick",
                            blurToSave: true,
                            afterSaveCell: this.handleGetCurrentData
                        }) }
                    />
                    <Button onClick={ () =>
                        this.setState (
                            { modal: true }) }>Добавить продукт
                    </Button>

                    <Chart tools={ this.state.tools }/>
                </div>
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return { tools: state.tools }
}

export default connect (mapStateToProps, { setData }) (ToolTable)

