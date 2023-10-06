import Image from 'next/image'

function CandidateInfoPanel({id, image, name, college, skills, description,degree}) {
  return (
	<div className='bg-main rounded-xl flex flex-col w-[30%] p-10 text-center items-center justify-between  overflow-y-scroll'>
		<Image
			alt='profile'
			src={image?image:'/profile.svg'}
			height={100}
			width={100}
			className='w-[60%] border-2 border-[white] rounded-full '
		/>
		<div className='flex flex-col'>
			<h2>
				{name}
			</h2>
			<p className='font-[200]'>
				{college+', '+degree}
			</p>
		</div>

		<div className='grid grid-cols-2 gap-4 my-5 font-[200]'>
			{skills?.map((skill,index)=>(
				<div 
					className='border-[1px] border-white rounded-full text-[0.8rem] w-[8rem] p-2 flex justify-center'
					key={index}>
					{skill}
				</div>
			))}
		</div>

		<p className='font-[200] text-left'>
			{description}
		</p>
	</div>
  )
}

export default CandidateInfoPanel