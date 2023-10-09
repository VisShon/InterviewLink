import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

function DoughnutChart({ chartData }) {
  return (
	<div className="chart-container">
		<Doughnut
			data={chartData}
			options={{
				plugins: {
				title: {
					display: false
				}
				}
			}}
		/>
	</div>
  );
}
export default DoughnutChart;