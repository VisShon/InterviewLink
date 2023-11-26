
function FreeSlot({id,timings,day,selected,setSelected}) {

	const borderVariants = {
		selected: "border-2 border-main",
		notSelected: "border-none"
	}

	return (
		<button 
			className={`flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl min-w-[12rem] shadow-sm my-5 text-[#898989] hover:shadow-md border-2 border-main p-5 ${selected==id?borderVariants["selected"]:borderVariants["notSelected"]}`}
			onClick={()=>setSelected(id)}>
			<h2 className="text-main text-[0.8rem]">
				{timings[0]+"-"+timings[1]}
			</h2>
			<p className="text-[black] ">
				{day}
			</p>
		</button>
	)
}

export default FreeSlot