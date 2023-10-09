import Image from "next/image"

function SendMail({mail}) {

	return(
		<a 
			className="hover:shadow-md active:opacity-80 flex flex-col bg-secondary rounded-xl p-4 px-10 text-[red] justify-center items-center w-[35%] h-full"
			href={`mailto:${mail}`}>
			<Image
				alt='mail'
				src={'/Mail.svg'}
				height={100}
				width={100}
				className='w-[2rem] '
			/>
			<p>Send Mail</p>
		</a>
	)
}

export default SendMail