
import HighchartsReact from 'highcharts-react-official';
import Sidebar from '../components/Sidebar';
import * as Highcharts from 'highcharts';
import { useEffect } from 'react';
import { fetchChartData } from '../formSlice';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';


const Analytics: React.FC = () => {
    
    const dispatch: AppDispatch = useDispatch();

    const { chart, loading, error }: any = useSelector(
        (state: RootState) => state.form
      );

      console.log(chart?.chartData, "chartsss")


    useEffect(() => {
        dispatch(fetchChartData());
      }, [dispatch]);

      
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent', // Set background color to transparent
      plotBackgroundColor: null, // Ensure the plot area is transparent
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: 'Tickets Composition'
    },
    tooltip: {
      valueSuffix: '%'
    },
    credits: {
        enabled: false, // Disable the Highcharts credits
      },

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data:  [
        { name: 'open', y: 55.02 },
        { name: 'closed', sliced: true, selected: true, y: 26.71 },
        { name: 'pending', y: 15.5 },
      ]
    }]
  };

   // Bar chart options
   const barOptions = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent', // Set background color to transparent
    },
    title: {
      text: 'Tickets by Region',
      align: 'left',
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe'],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: ' millions',
    },
    plotOptions: {
      bar: {
        borderRadius: '50%',
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: (Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF'),
      shadow: true,
    },
    credits: {
      enabled: false, // Disable credits for the bar chart
    },
    series: [{
      name: 'Year 1990',
      data: [632, 727, 3202, 721],
    }, {
      name: 'Year 2000',
      data: [814, 841, 3714, 726],
    }, {
      name: 'Year 2021',
      data: [1393, 1031, 4695, 745],
    }],
  };

  return (
    <div className="flex h-screen gap-4">
      <Sidebar />
      <div className="flex-1 p-4 ml-2 mr-2 flex flex-col justify-center items-center overflow-hidden">
        <div className='flex '>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}  
         <HighchartsReact
          highcharts={Highcharts}
          options={barOptions}
        />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
