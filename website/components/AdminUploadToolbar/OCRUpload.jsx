import Image from "next/image"


function OCRUpload() {

	const uploadResumes = async () => {
		
	}

	return (
		<button 
			className="text-[0.75rem] hover:shadow-md  active:opacity-80 flex flex-col bg-secondary rounded-xl text-main justify-center items-center w-[8%] gap-2 h-[60%] "
			id="Assessment"
			onClick={uploadResumes}>
			<Image
				alt="assessment"
				src={"/ocr.svg"}
				height={20}
				width={20}
				className="w-[2rem] "
			/>
			<p>Upload Resume</p>
		</button>
	)
}

export default OCRUpload