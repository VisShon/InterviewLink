import Link from "next/link"

function CandidateCard({id,name,college,role,description,status}) {
	console.log(status)
	const bgVariants = {
		tobeinterviewed:"bg-[#ffffff43]",
		ongoing:"bg-[#FFFFFF]"
	}
	return (
		
		
		<Link  						
				target="_blank" 
				className={`flex flex-col justify-center items-left text-left relative  rounded-xl w-full p-5 shadow-sm mb-5 text-[#898989] hover:shadow-md ${status=='ONGOING'?bgVariants.ongoing:bgVariants.tobeinterviewed}`}
				href={`/interview/${id}`}>
			<div className="w-full flex justify-between">
				<h2 className="text-main text-2xl font-bold">
					{name+', '+college}
				</h2>
				{!status=="ONGOING"&&
				<div className="bg-[#c1f2a7] border-2 border-[#166d16] px-10 text-[#166d16] font-bold rounded-full">
					Interviewed
				</div>}
			</div>

			<div className="flex flex-col w-full gap-1">
				<p className="text-[#4D4D4D]">
					{role}
				</p>
				<span className="mt-10">
					{description}
				</span>
			</div>
		</Link>
	)
}

export default CandidateCard