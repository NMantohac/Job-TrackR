import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class EmployerChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  }

  // Logic that renders the Result Chart (Rechart npm package)
  // componentDidMount() {
  //   this.props.data();
    
  //     },
  renderEmployerList = () => {
    if (this.props.data.length === 0) {
      return <Header content='No data yet'/>
    } else {
      return this.props.data.map( ({ canonical_name, count }) => {
        // data.leaderboard
        return (
          <List.Item key={canonical_name}>
            <List.Content>
              <List.Header>{canonical_name}</List.Header>
              <List.Description>Count: {count}</List.Description>
            </List.Content>
          </List.Item>
        )
      })
    }
  }

  render() {
    return (
      <List>
        { this.renderEmployerList() }
      </List>
    );
  }
}
const data =
[
  {name: `${canonical_name}`, uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

    // for..in loop to make key/value pairs to recreate the specific format from Recharts to display a chart with new data
  //   function mapData() {
  //     const employerArr = [];
  //     const timeSeries = dataObj['Time Series (Digital Currency Monthly)'];
  //     for (const property in timeSeries) {
  //       const eachCount = {};
  //       eachCount.name = month;
  //       eachCount.open = parseFloat(timeSeries[property]['1a. open']);
  //       eachCount.high = parseFloat(timeSeries[property]['2a. high']);
  //       eachCount.low = parseFloat(timeSeries[property]['3a. low']);
  //       eachCount.close = parseFloat(timeSeries[property]['4a. close']);
  //       eachCount.amt = 2000;
  //       employerArr.push(eachCount);
  //     }
  //     return employerArr;
  //   }
  //   const dataChart = mapData();

  //   const digitalCurrencyText = dataObj['Meta Data']['Digital Currency Code'];
  //   const physicalMarketText = dataObj['Meta Data']['Market Code'];
  // }

//   render() {
//     return (
//       <div style={{ width: '100%', height: 350 }}>
//         <h2>{this.state.textCurrency} in the {this.state.textMarket} Top Companies six months data </h2>
//         <ResponsiveContainer>
//           <LineChart
//             width={600}
//             height={400}
//             data={this.state.data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
//             <Line type="monotone" dataKey="high" stroke="#e01d34" />
//             <Line type="monotone" dataKey="low" stroke="#82ca9d" />
//             <Line type="monotone" dataKey="close" stroke="#ffff0a" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }