import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { useRouter } from 'next/router'

import addHours from "date-fns/addHours"
import nProgress from "nprogress"
import UpdateCandidateInterview from "@/apollo/mutation/updateCandidateInterview.graphql"

function ScheduleButton({managerId,candidateId,slot}) {

	const router = useRouter()

	const [updateCandidateInterview,{error,loading,data}] = useMutation(UpdateCandidateInterview);
	const candidateSchedule = async () =>{
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
								"admin": process.env.ADMIN_ID,
	
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
												"id": managerId
											}
										}
									}
								},
								
								"links": ["link"],
								"timeEnd": new Date(slot.timestamp),
								"timeStart": addHours(new Date(slot.timestamp), 1)
							}
						}
					]
				}
			}
		})
	}

	const scheduleInterview = async () => {
		const res = await fetch(
			`http://localhost:8000/slotsAPI?calendarId=${slot.calendarId}&start=${slot.timestampStart}&end=${slot.timestampEnd}`,
			{
				method: 'POST',
			}
		);
		await candidateSchedule()
		router.reload()
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
		<button 
			className="hover:shadow-md  active:opacity-80 flex flex-col text-secondary rounded-xl p-4 px-10 bg-[#80AFCF] justify-center items-center w-[35%] h-full"
			onClick={scheduleInterview}>
			<p>Schedule</p>
		</button>
	)
}

export default ScheduleButton