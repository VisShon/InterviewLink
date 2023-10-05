
function FreeSlot({id,timings,day,selected,setSelected}) {
	return (
		selected==id?
		<button 
			className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-[10rem] shadow-sm my-5 text-[#898989] hover:shadow-md border-2 border-main p-5"
			onClick={()=>setSelected('')}>
			<h2 className="text-main text-[0.8rem]">
				{timings[0]+'-'+timings[1]}
			</h2>
			<p className="text-[black] ">
				{day}
			</p>
		</button>:
		<button 
			className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-[10rem] p-5 shadow-sm my-5 text-[#898989] hover:shadow-md"
			onClick={()=>setSelected(id)}>
			<h2 className="text-main text-[0.8rem]">
				{timings[0]+'-'+timings[1]}
			</h2>
			<p className="text-[black]">
				{day}
			</p>
		</button>
	)
}

export default FreeSlot