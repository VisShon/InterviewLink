import { useMutation } from "@apollo/client"
import nProgress from "nprogress"
import { useState, useEffect } from "react"
import UpdateCandidateInterview from '@/apollo/mutation/updateCandidateInterview.graphql'

function AutoScheduleButton({candidatesData, interviewersData}) {

	const [updateCandidateInterview, {error, loading, data}]  = useMutation(UpdateCandidateInterview)

	const autoScheduleCandidates = async () =>{
		try{
			const res = await fetch(`https://interviewlink-production.up.railway.app/schedulerAPI`,{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body:JSON.stringify({
					candidatesData:candidatesData,
					interviewersData:interviewersData
				})
			})

			const finalInterviews = await res.json()
			
			await finalInterviews?.forEach(async (interview)=>{

				console.log(interview)
				const interviewer = await interviewersData?.find((interviewer) => 
					interviewer.id==interview?.interviewerId
				)

				const res = await fetch(
					`https://interviewlink-production.up.railway.app/slotsAPI?calendarId=${interviewer?.calendarId}&start=${interview.start}&end=${interview.end}`,
					{
						method: 'POST',
						mode: "cors",
					}
				);


				await candidateAutoSchedule(
					interview?.candidateId, 
					interview?.interviewerId, 
					interview?.start, 
					interview?.end,
					interviewer?.graderLink
				)
			})

			return alert("Done")
		}
		catch(e){
			return alert(e)
		}
	}

	const candidateAutoSchedule = async (candidateId, interviewerId, start, end, graderLink) =>{
		
		try{
			
			const links = [`https://meet.google.com/lookup/${"Mathworks-"+candidateId}`,graderLink]
			const admin = process.env.NEXT_PUBLIC_NEXT_PUBLIC_ADMIN_ID
	
			// console.log(candidateId, interviewerId, start, end, links)
			await updateCandidateInterview({
				variables:{
					"where": {
						"id": candidateId
					},
	
					"update": {
						"status": "ONGOING"
					},
	
					"create": {
						"interviewList":[
							{
								"node": {
									"admin": admin,
		
									"candidate": {
										"connect": {
											"where": {
												"node": {
													"id": candidateId
												}
											}
										}
									},
		
									"interviewer": {
										"connect": {
											"where": {
												"node": {
													"id": interviewerId
												}
											}
										}
									},
									
									"links": links,
									"timeEnd": end,
									"timeStart": start
								}
							}
						]
					}
				}
			})
	
			return console.log("Done")
		}
		catch(e){
			return console.log(error)
		}
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