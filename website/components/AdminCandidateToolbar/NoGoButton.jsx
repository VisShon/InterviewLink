import { useMutation } from "@apollo/client"
import nProgress from "nprogress"
import { useEffect } from "react"
import UpdateCandidateStatus from "@/apollo/mutation/updateCandidateStatus.graphql"
import { useRouter } from "next/router"

function NoGoButton({id}) {
    const router = useRouter()
    const [updateCandidateStatus,{error,loading,data}] = useMutation(UpdateCandidateStatus);	
	const candidateFail = async () =>{
		await updateCandidateStatus({
			variables:{
				"where": {
				  "interviewId": id
				},
				"update": {
				  "candidate": {
					"update": {
					  "node": {
						"interviewStatus": "REJECTED"
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
			className="hover:shadow-md  active:opacity-80 flex flex-col text-secondary rounded-xl p-4 px-10 bg-[red] justify-center items-center w-[35%] h-full"
			onClick={candidateFail}>
			<p>No Go</p>
		</button>
	)
}

export default NoGoButton