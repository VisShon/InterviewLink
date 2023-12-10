import Link from "next/link"

function CompletedCandidateCard({id,name,college,degree,description,status}) {
	return (
		<Link  						
			className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-full p-5 shadow-sm my-5 text-[#898989] hover:shadow-md"
			href={`/admin/completed/${id}`}>
			<div className="w-full flex justify-between">
				<h2 className="text-main text-2xl font-bold">
					{name+', '+college}
				</h2>
				{status=="TOBEINTERVIEWED"&&
					<div className="bg-[#a7c4f2] border-2 border-[#16446d] px-10 text-[#16206d] font-bold rounded-full">
						Interviewed
					</div>
				}
				{status=="SELECTED"&&
					<div className="bg-[#c1f2a7] border-2 border-[#166d16] px-10 text-[#166d16] font-bold rounded-full">
						Selected
					</div>
				}
				{status=="REJECTED"&&
					<div className="bg-[#f2a7a7] border-2 border-[#6d1616] px-10 text-[#6d1616] font-bold rounded-full">
						Rejected
					</div>
				}
			</div>

			<div className="flex flex-col w-full gap-1">
				<p className="text-[#4D4D4D]">
					{degree}
				</p>
				<span className="mt-10">
					{description}
				</span>
			</div>
		</Link>
	)
}

export default CompletedCandidateCard