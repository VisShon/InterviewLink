import Link from "next/link"

function CandidateCard({id,name,college,role,description,status}) {
	return (
		status=='ONGOING'?
		<Link className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-full p-5 shadow-sm my-5 text-[#898989] hover:shadow-md"
				href={`/interview/${id}`}>
			<h2 className="text-main">
				{name+', '+college}
			</h2>
			<p className="text-[#4D4D4D]">
				{role}
			</p>
			<span className="mt-10">
				{description}
			</span>
		</Link>:
		<div className="flex flex-col justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-5 text-[#898989] hover:shadow-md">
			<h2 className="text-main">
				{name+', '+college}
			</h2>
			<p className="text-[#4D4D4D]">
				{status=='TOBEINTERVIEWED'&&'Interviewed'}
			</p>
			<span className="mt-10">
				{description}
			</span>
		</div>
	)
}

export default CandidateCard