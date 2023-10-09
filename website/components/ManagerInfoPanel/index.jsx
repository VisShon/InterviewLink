import Image from 'next/image'
import CandidateStats from './CandidateStats'

function ManagerInfoPanel({image, name, role, skills, candidates,completed}) {
	return (
		<div className="flex flex-col w-full sticky top-10">
			<div className='bg-main rounded-xl flex flex-col w-full h-full mb-4 p-10 text-center items-center justify-between  overflow-y-scroll'>
				<Image
					alt='profile'
					src={image?image:'/profile.svg'}
					height={1000}
					width={1000}
					className='w-[60%] border-2 border-[white] rounded-full '
				/>
				<div className='flex flex-col'>
					<h2>
						{name}
					</h2>
					<p className='font-[200]'>
						{role}
					</p>
				</div>

				<div className='grid grid-cols-2 gap-4 my-5 font-[200]'>
					{skills?.map((skill,index)=>(
						<div 
							className='border-[1px] border-white rounded-full w-[8rem] p-2 flex justify-center'
							key={index}>
							{skill}
						</div>
					))}
				</div>
			</div>

			<CandidateStats
				candidates={candidates}
				completed={completed}
				left={candidates-completed}
			/>
		</div>
	)
}

export default ManagerInfoPanel