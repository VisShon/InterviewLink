import Image from 'next/image'

function ManagerCard({image, name, role, selected, setSelected, id}) {

	return (
		selected==id?
		<button 
			className='bg-main rounded-xl flex  w-full gap-10 h-[15%] mb-4 p-10 items-center justify-start'
			onClick={()=>setSelected('')}>
			<Image
				alt='profile'
				src={image?image:'/profile.svg'}
				height={100}
				width={100}
				className='w-[25%] border-2 border-[white] rounded-full '
			/>
			<div className='flex flex-col text-left'>
				<h2>
					{name}
				</h2>
				<p className='font-[200]'>
					{role}
				</p>
			</div>
		</button>:
		<button 
			className='bg-[#80AFCF] rounded-xl flex  w-full gap-10 h-[15%] mb-4 p-10 items-center justify-start'
			onClick={()=>setSelected(id)}>
			<Image
				alt='profile'
				src={image?image:'/profile.svg'}
				height={100}
				width={100}
				className='w-[25%] border-2 border-[white] rounded-full '
			/>
			<div className='flex flex-col text-left'>
				<h2>
					{name}
				</h2>
				<p className='font-[200]'>
					{role}
				</p>
			</div>
		</button>
	)
}

export default ManagerCard