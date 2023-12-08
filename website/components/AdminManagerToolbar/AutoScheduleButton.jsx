import { useMutation } from "@apollo/client"
import nProgress from "nprogress"
import { useState, useEffect } from "react"
import UpdateCandidateInterview from '@/apollo/mutation/updateCandidateInterview.graphql'

function AutoScheduleButton({candidatesData, interviewersData}) {
	const [updateCandidateInterview, {error, loading, data}]  = useMutation(UpdateCandidateInterview)

	const autoScheduleCandidates = async () =>{
		try{
			const res = await fetch(`http://localhost:8000/schedulerAPI`,{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body:JSON.stringify({
					candidatesData:candidatesData,
					interviewersData:interviewersData
				})
			})

			const finalInterviews = await res.json()
			finalInterviews?.forEach((interview)=>{
				candidateAutoSchedule(interview.candidateId, interview.interviewerId, interview.timestart, interview.timeend);
			})
		}
		catch(e){
			alert(e)
			return
		}
	}

	const candidateAutoSchedule = async (candidateId, managerId, timestart, timeend) =>{
			console.table({
					candidateId,
					managerId,
					timestart: new Date(timestart),
					timeend: new Date(timeend),
			})
			await updateCandidateInterview({
					variables:{
							"where": {
								"candidateId": candidateId,
							},
							"update": {
								"status": "ONGOING"
							},
							"create": {
								"interviewList": [
									{
										"node": {
											"admin": process.env.NEXT_PUBLIC_NEXT_PUBLIC_ADMIN_ID,
											"candidate": {
												"connect": {
													"where": {
														"node": {
															"candidateId": candidateId
														}
													}
												}
											},
											"interviewer": {
												"connect": {
													"where": {
														"node": {
															"interviewerId": managerId
														}
													}
												}
											},
											"releventLinks": ['link'],
											"timeEnd": new Date(timestart),
											"timeStart": new Date(timeend)
										}
									}
								]
							}
					}
			})
	}

	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading&&data){
			nProgress.done(false)
				console.log('success')
		}
			
		if(error){
			nProgress.done(false)
		}
	},[loading])

	return (
		<button 
			className="hover:shadow-md  active:opacity-80 flex flex-col text-secondary rounded-xl p-4 px-10 bg-main justify-center items-center w-[35%] h-full"
			onClick={autoScheduleCandidates}>
			<p>Auto</p>
		</button>
	)
}

export default AutoScheduleButton