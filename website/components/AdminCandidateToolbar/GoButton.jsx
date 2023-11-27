import { useMutation } from "@apollo/client"
import nProgress from "nprogress"
import { useEffect } from "react"
import UpdateCandidateStatus from "@/apollo/mutation/updateCandidateStatus.graphql"
import { useRouter } from "next/router";

function GoButton({id,track}) {
    const [updateCandidateStatus,{error,loading,data}] = useMutation(UpdateCandidateStatus);	
	const router = useRouter()

	const candidatePass = async () =>{
		let newStatus

		if(track=='TECHNICAL'){
			newStatus='TOBEINTERVIEWED'
		}
		if(track=='HR'){
			newStatus='SELECTED'
		}

		await updateCandidateStatus({
			variables:{
				"where": {
				  "interviewId": id
				},
				"update": {
				  "candidate": {
					"update": {
					  "node": {
						"track": "HR",
						"status": newStatus
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