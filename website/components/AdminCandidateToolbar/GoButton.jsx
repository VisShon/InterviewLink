import { useMutation } from "@apollo/client"
import { useRouter } from "next/router";
import { useEffect } from "react";
import nProgress from "nprogress"
import NextRound from "@/apollo/mutation/nextRound.graphql"

function GoButton({interviewId,candidateId,interviewerId,track}) {
    const [updateCandidateStatus,{error,loading,data}] = useMutation(NextRound);	
	const router = useRouter()

	const candidatePass = async () =>{
		let newStatus
		let newTrack

		if(track=='TECHNICAL'){
			newStatus='TOBEINTERVIEWED'
			newTrack="HR"
		}
		if(track=='HR'){
			newStatus='SELECTED'
			newTrack="HR"
		}

		await updateCandidateStatus({
			variables:{
				where: {
				  id: interviewId
				},
				update: {
				  candidate: {
					update: {
					  node: {
						status: newStatus,
						track: newTrack
					  }
					},
					where: {
						node: {
							id: candidateId
						}
					}
				  }
				},
				disconnect: {
				  interviewer: {
					where: {
					  node: {
						id: interviewerId
					  }
					}
				  }
				}
			  }
		})
	}

	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading&&data){
			alert('success')
			nProgress.done(false)
			router.push('/admin/completed')
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])

	return (
		<button 
			className="hover:shadow-md  active:opacity-80 flex flex-col text-secondary rounded-xl p-4 px-10 bg-main justify-center items-center w-[35%] h-full"
			onClick={candidatePass}>
			<p>Go</p>
		</button>
	)
}

export default GoButton