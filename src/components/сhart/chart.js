import React from 'react';
import { HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';


const Chart = (props) => {
    const toolArr = props.tools.map ((d) => {
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
            <LineSeries className="second-series" data={ toolArr }/>
        </XYPlot>
    );
}

export default Chart