import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ChartComponent(props) {

    let data = {
        labels: props.labels,
        datasets: [
          {
            label: 'Data',
            data: props.dataChart,
            backgroundColor: props.backgroundChart
          }
        ]
    }

    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
}

export default ChartComponent