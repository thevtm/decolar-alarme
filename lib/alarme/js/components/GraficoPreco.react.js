var React = require('react');
var R = require('ramda');
var LineChart = require('react-d3').LineChart;

function makeChartDataValues(data) {
  return R.map(function (d)
    {
      return {x:d.momento, y:d.MenorPreco[0].raw.amount};
    },
    data);
}

function makeChartData(data) {
  return [
    {
      label:"Precos",
      values: makeChartDataValues(data)
    }
  ];
}

var GraficoPreco = React.createClass({

  render: function() {
    var data = this.props.data;

    if(R.length(data) >= 1)
    {
      return (
        <LineChart
          data={makeChartData(data)}
          width={400}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          title='Bar Chart'
        />
      );
    }
    else
    {
      return <h2>Grafico</h2>;
    }
  }
});

module.exports = GraficoPreco;
