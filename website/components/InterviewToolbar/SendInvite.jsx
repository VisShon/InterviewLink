import Image from "next/image"
import { send } from "@emailjs/browser"

function SendInvite({mail,name,links}) {

	const inviteCandidate = async() => {
		await send(
			'service_7uivqsf',
			'template_ymw1xhk',
			{
				to_name: name,
				to_email: mail,
				invite_link:links
			},
			'6HGQvyzipY4qgGkWm'
		)
	}

	return (
		<button 
			className="hover:shadow-md active:opacity-80 flex flex-col bg-secondary rounded-xl p-4 px-10 text-[indigo] justify-center items-center w-[35%] h-full"
			onClick={inviteCandidate}>
			<Image
				alt='teams'
				src={'/Teams.svg'}
				height={100}
				width={100}
				className='w-[2.5rem] '
			/>
			<p>Send Meet</p>
		</button>
	)
}

export default SendInvite