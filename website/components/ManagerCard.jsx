import Image from 'next/image'

function ManagerCard({image, name, role, selected, setSelected, id, setSlots, calendarId}) {

	const findSlots = async () => {
		setSelected(id)
		const res = await fetch(`http://localhost:8000/slotsAPI?calendarId=${calendarId}&interviewerId=${id}`,{
			next: { revalidate: 10 },
		})
		const slotsData = await res.json()
		return setSlots(slotsData)
	}

	const colourVariants = {
		selected: "bg-main",
		notSelected: "bg-[#80AFCF]"
	}

	return (
		<button 
			className={`rounded-xl flex w-full gap-10 h-[15%] mb-4 p-10 items-center justify-start ${selected==id?colourVariants["selected"]:colourVariants["notSelected"]}`}
			onClick={findSlots}>
			<Image
				alt='profile'
				src={image?image:'/profile.svg'}
				height={100}
				width={100}
				className='w-[22%] border-2 border-[white] rounded-full '
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