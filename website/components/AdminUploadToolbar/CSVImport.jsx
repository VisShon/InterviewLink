import Image from "next/image"
import { useState, useEffect,useRef } from "react"

import { useMutation } from "@apollo/client"
import { csv2json } from "json-2-csv"
import nProgress from "nprogress"

import AddCandidate from "@/apollo/mutation/addCandidate.graphql"


function CSVImport() {

    const [file, setFile] = useState()
	const imageUploader = useRef()

	const [addCandidate,{error,loading,data}] = useMutation(AddCandidate);

	const importCSV = async (e) => {

		const reader = new FileReader()
        const file = e.target.files[0]

		reader.onloadend = async () => {
			setFile(file)
			const csvString = await file.text()
			const candidates = csv2json(csvString)
			console.log(candidates)
			
			const candidatesData = candidates.map(candidate => {
				return {
					"cgpa": candidate?.cgpa?.toString(),
					"college": candidate?.college,
					"degree": candidate?.degree,
					"email": candidate?.email,
					"image": candidate?.image,
					"name": candidate?.name,
					"resumeURL": candidate?.resumeURL,
					"skillset": candidate?.skillset,
					"status": "TOBEINTERVIEWED",
					"telegramId":  candidate?.telegramId?.toString(),
					"track": "TECHNICAL"
				}
			})

			try {
				await addCandidate({
					variables:{
						"input":[...candidatesData]
					}
				})
				console.log(error,data)
			}
			catch(e){
				console.log(e)
			}

		}
        reader.readAsDataURL(file)

		if(error){
			return alert(error)
		}
		
		alert("Refresh to Update Candidates")

		return 
	}

	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading&&data){
			alert("success")
			nProgress.done(false)
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])

	return (
		<label 
			className="text-[0.75rem] hover:shadow-md  active:opacity-80 flex flex-col bg-secondary rounded-xl text-main justify-center items-center w-[8%] gap-2 h-[60%]  cursor-pointer"
			id="Assessment">
			<input
				ref={imageUploader}
				type="file"
				className="opacity-0 h-0"
				accept=".csv"
				onChange={e=>importCSV(e)}
			/>
			<Image
				alt="assessment"
				src={"/assesment.svg"}
				height={20}
				width={20}
				className="w-[1.5rem] "
			/>
			<p>Import CSV</p>
		</label>
	)
}

export default CSVImport