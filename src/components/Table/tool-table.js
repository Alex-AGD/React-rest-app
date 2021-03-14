import React, { Component } from 'react';
import { toolsApi } from '../../api/api'
import filterFactory from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from "react-bootstrap-table2-editor";
import Modal from "../modal-from/modal-form";
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import axios from "axios";
import { setData } from "../reducers/toolsReducer";



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
                validator:(newValue => {
                    axios.put ('http://localhost:8080/api/tools/', newValue)
                        .then ((res) => {
                            this.setState ({ toolName: '', cost: '', date: '' })
                        }).catch ((error) => {
                        console.log (error)
                    })
                })
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


    componentDidMount () {
        toolsApi.getAll ()
            .then (res=> {
                this.props.setData(res.data);
                const arr = Object.values(this.props.tools);
                console.log(arr)
                this.setState ({ tools:  arr} );
                /*console.dir(this.props.tools)
                console.dir(res.data)*/
                //his.setState ({ tools: this.props.tools });
            })
            .catch (e => {
                console.log (e);
            });
    }

    componentDidUpdate (prevProps, prevState) {
    const arr = Object.values(this.props.tools);
    console.log(prevState,this.state)
         if(this.props.tools !== prevProps.tools){
             this.setState ({ tools:  arr} );
    }}


    render () {
        return (
            <>
            <div className="container" style={ { marginTop: 50 } }>
                <Modal
                    setData={this.props.setData}
                    title={ 'Введите данные' }
                    isOpened={ this.state.modal }
                    onModalClose={()=> this.setState({modal:false})
                    }
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
                        mode: "dbclick",
                        blurToSave: true
                    })}
                />
                <Button
                    onClick={ () => this.setState ({ modal: true })
                }>Добавить продукт</Button>
            </div>
                </>
        );
    }
}

const  mapStateToProps = (state) => {
    return {tools: state.tools}
}

export default connect (mapStateToProps,{setData}) (ToolTable)

