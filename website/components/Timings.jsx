import React from 'react'
import Link from 'next/link'

function Timings({id, name, college, role, timings, degree, status}) {
	return (
		status=='ONGOING'?
		<Link className="flex flex-col justify-center items-left text-left relative bg-[white] rounded-xl w-full p-5 shadow-sm mb-5 text-[#898989] hover:shadow-md"
				href={`/interview/${id}`}>
			<h2 className="text-main">
					{timings[0]+'-'+timings[1]}
			</h2>
			<p className="text-[#4D4D4D]">
					{role}
			</p>
			<span className="mt-5  fonte-[100] text-[1.5rem]">
				{name+', '+college+', '+degree}
			</span>
		</Link>:
		<div className="flex flex-col justify-center items-left text-left relative bg-[#ffffff43] rounded-xl w-full p-5 shadow-sm mb-5 text-main hover:shadow-md">
			<h2>
				{timings[0]+'-'+timings[1]}
			</h2>
			<p className="text-[#4D4D4D]">
				{status=='TOBEINTERVIEWED'&&'Interviewed'}
			</p>
			<span className="mt-5  fonte-[100] text-[1.5rem]">
				{name+', '+college+', '+degree}
			</span>
		</div>
	)
}

export default Timings