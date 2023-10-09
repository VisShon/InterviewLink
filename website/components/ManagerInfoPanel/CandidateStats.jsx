import DoughnutChart from './DoughnutChart';
function CandidateStats({candidates,left,completed}) {

	const chartData = {
		datasets: [{
			data: [completed, left],
			backgroundColor:['#005F9F','#00000032'],
			hoverOffset: 4
		}]
	};
	 
	return (
		<div className="flex gap-10 bg-secondary rounded-xl p-5 justify-around">
			<div className='w-[43%] h-[50%]'>
				<DoughnutChart
					chartData={chartData}
				/>
			</div>
			<div className="flex flex-col items-start justify-evenly">
				<p className="text-[#000000a6] font-[500] text-[2rem]">
					{candidates<10?'0'+candidates:candidates}
					<span className="text-[1rem] font-[200]"> Candidates</span>
				</p>

				<p className="text-main font-[500] text-[2rem]">
					{completed<10?'0'+completed:completed}
					<span className="text-[1rem] font-[200]"> Completed</span>
				</p>

				<p className="text-[#00000032] font-[500] text-[2rem]">
					{left<10?'0'+left:left}
					<span className="text-[1rem] font-[200]"> Remaining</span>
				</p>
			</div>
		</div>
	)
}

export default CandidateStats