import React, { Component } from 'react';
import { connect } from 'react-redux';


class ReduxTable extends Component {

    render () {
        return (
            <div>
                    <input type="text"/>
                    <button>Add Tool</button>
                    <ul>
                        {this.props.testStore.map((tools, index) =>
                            <li key={index}>{tools}</li>
                        )}
                    </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({})
)(ReduxTable);