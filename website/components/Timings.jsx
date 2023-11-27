import React from 'react'
import Link from 'next/link'
import Interview from '../pages/interview/[id]';

function Timings({id, name, college,role, timings, degree, status, day}) {
	const bgVariants = {
		ongoing:"bg-[white]",
		tobeinterviewed:"bg-[#ffffff43]"
	}
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	return (
		
		<div className={`flex flex-col justify-center items-left text-left relative  rounded-xl w-full p-5 shadow-sm mb-5 text-[#898989] hover:shadow-md ${status=='ONGOING'?bgVariants.ongoing:bgVariants.tobeinterviewed}`}>
			<div className="h-[60%] flex w-full justify-between">
				<h2 className="text-main text-2xl font-bold">
						{daysOfWeek[day]+', '+timings[0]+'-'+timings[1]}
				</h2>

				{status=='ONGOING'?
					<Link  						
						target="_blank" 
						className='w-[20%] py-3 hover:opacity-90 text-center bg-main font-bold text-[white] rounded-xl flex items-center justify-center' 
						href={`/interview/${id}`}>
						Start Interview
					</Link>:
					<div className="bg-[#c1f2a7] border-2 border-[#166d16] px-10 text-[#166d16] font-bold rounded-full">
						Interviewed
					</div>
				}
			</div>
			<div className='flex flex-col gap-2'>
				<span className="text-[#4D4D4D]">
					{name+', '+college+', '+role}
				</span>

				<span className="text-[#4D4D4D]">
					{role}
				</span>

				

				<div className='flex gap-5 w-[40%] text-main'>
					<button 
						onClick={()=>alert("job for the role of "+role+" intern")}
						className='w-[50%] text-center font-bold border-2 border-main rounded-xl hover:opacity-90'>
						Job Description
					</button>

					<Link  						
						target="_blank" 
						href={`/resume`} 
						className='w-[50%]  text-center font-bold border-2 border-main rounded-xl hover:opacity-90'>
						Resume
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Timings