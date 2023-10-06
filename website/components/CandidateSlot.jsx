function CandidateSlot({id,name,college,track,selected,setSelected}) {
	return (
		selected==id?
		<button 
			className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-full p-5 shadow-sm text-[#898989] hover:shadow-md border-2 border-main"
			onClick={()=>setSelected('')}>
			<h2 className="text-main">
				{name+', '+college}
			</h2>
			<p className="text-[#4D4D4D]">
				{track}
			</p>
		</button>:
		<button 
			className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-full p-5 shadow-sm text-[#898989] hover:shadow-md"
			onClick={()=>setSelected(id)}>
			<h2 className="text-main">
				{name+', '+college}
			</h2>
			<p className="text-[#4D4D4D]">
				{track}
			</p>
		</button>
	)
}

export default CandidateSlot