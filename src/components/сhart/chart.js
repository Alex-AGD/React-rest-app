import React from 'react';
import { HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';


const Chart = (props) => {
    const ToolArr = props.tools.map ((d) => {
        return { x: d.toolName + d.dateOfTools, y: d.cost }
    });
    return (
        <XYPlot
            xType="ordinal"
            width={ 1100 }
            height={ 400 }>
            <VerticalGridLines/>
            <HorizontalGridLines/>
            <XAxis title="Дата"/>
            <YAxis title="Цена"/>
            <LineSeries
                className="first-series"
                style={ {
                    strokeLinejoin: 'round',
                    strokeWidth: 4
                } }/>

            <LineSeries className="second-series" data={ ToolArr }/>

        </XYPlot>
    );
}


const mapStateToProps = (state) => {
    return { tools: state.tools }
}

export default Chart