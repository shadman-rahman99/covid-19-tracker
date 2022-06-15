import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from "numeral";
// import Chart from 'chart.js/auto';

// ChartJS materials
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      // x: 
      //   {
      //     type: "time",
      //     time: {
      //       format: "MM/DD/YY",
      //       tooltipFormat: "ll",
      //     },
      //   },
         x: {
      type: 'time',
     time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
    },
        
      y: 
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      // y: {
      //   display: true,
      //   title: {
      //     display: true,
      //     text: 'value'
      //   }
      // },
    },
  };

        // casesType = "cases" focuses on mapped key cases from the
    // arguement named data which is an array of mapped object.
    const buildChartData = (data, casesType) => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases) {
            if(lastDataPoint){
                const newDatePoint = {
                    // x is the x-axis on the graph
                    x: date,

                    // y is the y-axis on the graph.
                    // We want to get the difference between cases for each day
                    // so data[casesType][date] - lastDataPoint gives the 
                    // difference.
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDatePoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

function LineGraph() {
    const [data,setData] = useState([]);

    useEffect(() => {
     const fetchData = async () => {
       await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response)=> {
            return response.json();
        })
        .then((data)=> {
            console.log("LineGraph data >>>> ",data);
            let chartData = buildChartData(data, "cases");
            setData(chartData);
            console.log("ChartData >>> ",chartData);
        });
     }
        fetchData();
    }, []);

    return (
        <div>
        {/* {data?.length > 0 && (
          <Line
            // LineGraph materials
            data={{
              datasets: [
                {
                  backgroundColor: "rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )} */}
      </div>
    )
}

export default LineGraph
