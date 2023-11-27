import { useMutation } from "@apollo/client"
import nProgress from "nprogress"
import { useEffect } from "react"
import RejectCandidate from "@/apollo/mutation/rejectCandidate.graphql"
import { useRouter } from "next/router"

function NoGoButton({candidateId,interviewId,interviewerId}) {

	console.log(candidateId,interviewId,interviewerId)

    const router = useRouter()
    const [rejectCandidate,{error,loading,data}] = useMutation(RejectCandidate)	

	const candidateFail = async () =>{
		await rejectCandidate({
			variables:{
				where: {
				  id: interviewId
				},
				disconnect: {
				  interviewer: {
					where: {
					  node: {
						id: interviewerId
					  }
					}
				  }
				},
				update: {
				  candidate: {
					update: {
					  node: {
						status: "REJECTED"
					  }
					},
					where: {
					  node: {
						id: candidateId
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