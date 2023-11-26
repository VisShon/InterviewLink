function CandidateSlot({id,name,college,track,selected,setSelected}) {

	const borderVariants = {
		selected: "border-2 border-main",
		notSelected: "border-none"
	}

	return (
		<button 
			className={`flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-full p-5 shadow-sm text-[#898989] hover:shadow-md ${selected==id?borderVariants["selected"]:borderVariants["notSelected"]}`}
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