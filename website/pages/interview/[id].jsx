import CandidateInfoPanel from "@/components/CandidateInfoPanel";
import FeedbackForm from "@/components/FeedbackForm";
import InterviewToolbar from "@/components/InterviewToolbar";

import GetInterview from "@/apollo/query/getInterview.graphql";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import nProgress from 'nprogress'

function Interview() {
	const router = useRouter();
	const {id} = router.query;

	const [candidateData, setCandidateData] = useState({})

	const { loading, error, data } = useQuery(GetInterview,{
		variables:{
			where:{
				interviewId:id
			}
		}
	})

	// console.log(data,error)
	
	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading){
			nProgress.done(false)
			setCandidateData(data?.interviews[0])
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])

	return (
		<main className="flex gap-10 w-screen h-[80%] px-20 justify-between items-top overflow-hidden">
			<CandidateInfoPanel
				id={candidateData?.candidate?.candidateId} 
				image={candidateData?.candidate?.image} 
				degree={candidateData?.candidate?.degree} 
				name={candidateData?.candidate?.name} 
				college={candidateData?.candidate?.college} 
				skills={candidateData?.candidate?.skillset} 
				description={'Lorem ipsum dolor sit amet consectetur. Lacus rutrum egestas sollicitudin viverra faucibus vitae. Vitae mi pellentesque sed nulla tortor ac placerat. Non non vitae auctor semper tristique ipsum blandit sapien.'}
			/>

			<div className="flex flex-col gap-10 w-[70%]">
				<InterviewToolbar
					links={candidateData?.releventLinks}
					mail={candidateData?.candidate?.email}
					name={candidateData?.candidate?.name}
					phone={candidateData?.candidate?.telegramId}
				/>
				<FeedbackForm
					id={candidateData?.interviewId}
				/>
			</div>

		</main>
	)
}

export default Interview