import Image from "next/image"
import { send } from "@emailjs/browser"

function SendAssesment({name,mail,links}) {

	const assessCandidate = async() => {
		await send(
			'service_7uivqsf',
			'template_2tmiixn',
			{
				to_name: name,
				to_email: mail,
				assessment_link:links
			},
			'6HGQvyzipY4qgGkWm'
		)
		alert('link sent')
	}


	return (
		<button 
			className="hover:shadow-md  active:opacity-80 flex flex-col bg-secondary rounded-xl p-4 px-10 text-main justify-center items-center w-[35%] h-full"
			onClick={assessCandidate}>
			<Image
				alt='assessment'
				src={'/assesment.svg'}
				height={100}
				width={100}
				className='w-[2rem] '
			/>
			<p>Send Assesment</p>
		</button>
	)
}

export default SendAssesment