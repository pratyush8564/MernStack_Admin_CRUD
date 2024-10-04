import HighchartsReact from "highcharts-react-official";
import Sidebar from "../components/Sidebar";
import * as Highcharts from "highcharts";
import { useEffect } from "react";
import { fetchChartData } from "../formSlice";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/icon";
import {
  closedTicketsIcon,
  deleteTicketsIcon,
  pendingTicketsIcon,
  totalTicketsIcon,
} from "../components/icons";
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';

// Initialize the exporting and offline exporting modules
Exporting(Highcharts);
OfflineExporting(Highcharts);


const Analytics: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { chart, 
    // loading, error
   }: any = useSelector(
    (state: RootState) => state.form
  );

  console.log(chart?.chartData, "chartsss");

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);


  const options = {
    chart: {
      type: "pie",
      backgroundColor: "white", // Set background color to transparent
      plotBackgroundColor: null, // Ensure the plot area is transparent
      plotBorderWidth: null,
      plotShadow: false,
      width: "550",
      height: "400",
    },
    title: {
      text: "Tickets Composition",
    },
    tooltip: {
      valueSuffix: "%",
    },
    credits: {
      enabled: false, // Disable the Highcharts credits
    },

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [
          { name: "open", y: 55.02 },
          { name: "closed", sliced: true, selected: true, y: 26.71 },
          { name: "pending", y: 15.5 },
        ],
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    chart: {
      type: "bar",
      backgroundColor: "white", // Set background color to transparent
      width: "550",
      height: "400",
    },
    title: {
      text: "Tickets by Region",
      align: "left",
    },
    
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe"],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend?.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false, // Disable credits for the bar chart
    },
    series: [
      {
        name: "Year 1990",
        data: [632, 727, 3202, 721],
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 726],
      },
      {
        name: "Year 2021",
        data: [1393, 1031, 4695, 745],
      },
    ],
    exporting: {
      enabled: false, // Enable exporting options
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG"
          ]
        }
      }
    }
  };

  const lineGraphOptions = {
    chart: {
      type: 'line'
  },
  title: {
      text: 'Monthly Average Tickets'
  },

  xAxis: {
      categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
          'Oct', 'Nov', 'Dec'
      ]
  },
  credits: {
    enabled: false, // Disable credits for the bar chart
  },
  yAxis: {
      title: {
          text: 'Tickets (sz)'
      }
  },
  plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      }
  },
  series: [{
      name: 'Reggane',
      data: [
          16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
          22.0, 17.8
      ]
  }, {
      name: 'Tallinn',
      data: [
          -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
          2.0, -0.9
      ]
  }],
  exporting: {
    enabled: true, // Enable exporting options
    buttons: {
      contextButton: {
        menuItems: [
          "viewFullscreen",
          "printChart",
          "separator",
          "downloadPNG",
          "downloadJPEG",
          "downloadPDF",
          "downloadSVG"
        ]
      }
    }
  }
}

  return (
    <div className="flex h-screen gap-16">
      <Sidebar />
      <div>
          {/* tickets counts and all */}
        <div className="flex justify-between mt-8 gap-4">
         <div className="bg-white p-4 rounded-lg w-full">
         <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={totalTicketsIcon} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">23</p>
                <p className="text-sm text-gray-600">Open Tickets</p>
              </div>
            </div>
         </div>
         <div className="bg-white p-4 rounded-lg w-full">
         <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={pendingTicketsIcon} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">5</p>
                <p className="text-sm text-gray-600">Pending Tickets</p>
              </div>
            </div>
         </div>
         <div className="bg-white p-4 rounded-lg w-full">
         <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={closedTicketsIcon} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">3</p>
                <p className="text-sm text-gray-600">Closed Tickets</p>
              </div>
            </div>
         </div>
         <div className="bg-white p-4 rounded-lg w-full">
         <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={deleteTicketsIcon} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">6</p>
                <p className="text-sm text-gray-600">Delete Tickets</p>
              </div>
            </div>
         </div>
      
        </div>
        {/* Charts Section */}
        <div className="w-full mt-6 ">
            <div className="flex gap-4">
            <div >
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
       
          <div >
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          </div>
          </div>
          <div className="mt-8 pb-8">
        <HighchartsReact highcharts={Highcharts} options={lineGraphOptions} />
      </div>
        </div>
      </div>
    </div>
  );
  
};

export default Analytics;
