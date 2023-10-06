import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import nProgress from 'nprogress'
import AddFeedback from '@/apollo/mutation/addFeedback.graphql'
import UpdateCandidateStatus from '@/apollo/mutation/updateCandidateStatus.graphql'
import { useRouter } from "next/router"

function FeedbackForm({id}) {

	const [addFeedback,{error:feedbackError,loading:feedbackLoading,data:feedbackData}] = useMutation(AddFeedback);
	const [updateInterviewStatus,{error:statusError,loading:statusLoading,data:statusData}] = useMutation(UpdateCandidateStatus);

	const router = useRouter()
	const [feedback,setFeedback] = useState("")
	const [remark,setRemark] = useState("")
	const [params,setParams] = useState([
		{name:'confidence', value:false},
		{name:'problem solving', value:false},
		{name:'spoken skills', value:false},
		{name:'teamwork', value:false},
		{name:'technical skills', value:false}
	])
	
	const handleFeedbackSubmission = async () =>{
		await addFeedback({
			variables:{
				"create": {
				  "feedback": {
					"node": {
					  "confidence": params[0].value,
					  "feedbackDescription": remark,
					  "feedbackResponse": feedback,
					  "problemSolving": params[1].value,
					  "spokenSkills": params[2].value,
					  "teamwork": params[3].value,
					  "technicalSkills": params[4].value,
					  "interviewList": {
						"connect": [
						  {
							"where": {
							  "node": {
								"interviewId": id
							  }
							}
						  }
						]
					  }
					}
				  }
				}
			}
		})
	}

	const handleStatusUpdate = async () =>{
		await updateInterviewStatus({
			variables:{
				"where": {
				  "interviewId": id
				},
				"update": {
				  "candidate": {
					"update": {
					  "node": {
						"interviewStatus": "TOBEINTERVIEWED"
					  }
					}
				  }
				}
			}
		})
	}

	useEffect(() => {
		if(feedbackLoading||statusLoading){
			nProgress.start()
		}
		if((!feedbackLoading&&feedbackData)||(!statusLoading&&statusData)){
			alert('success')
			nProgress.done(false)
		}
		if(feedbackError||statusError){
			nProgress.done(false)
		}
	},[feedbackLoading,statusLoading])

	useEffect(() => {
		if(statusData&&!statusLoading){
			router.push('/candidates')
		}
	},[statusData])

	return (
		<main className="flex gap-10 bg-secondary w-full h-full rounded-2xl p-10 text-[black]">
			<div className="w-[45%]">
				<div>
					<p>Feedback</p>
					<input 
						className="p-2 border-2 border-[grey] rounded-md w-full"
						type="text" 
						onChange={(e)=>setFeedback(e.target.value)}
						value={feedback}
					/>
				</div>

				<ul className="mt-10">
					{params?.map(({ name, value }, index) => {
					return (
						<li key={index}>
							<div className="my-6 flex gap-5 text-[1.2rem] font-[200] items-center">
								<input
									type="checkbox"
									id={`custom-checkbox-${index}`}
									name={name}
									value={value}
									onChange={()=>{
										let newParams = params
										newParams[index].value = !params[index].value
										setParams(newParams)
										console.log(params)
									}}
								/>
								<label for={`custom-checkbox-${index}`}>
									{name}
								</label>
							</div>
						</li>
					);
					})}
				</ul>

				<button
					className="bg-main rounded-xl p-2 text-secondary hover:shadow-md active:opacity-95"
					onClick={handleFeedbackSubmission}>
					Submit Feedback
				</button>

				<button
					className="bg-main rounded-xl p-2 text-secondary hover:shadow-md active:opacity-95 mx-5"
					onClick={handleStatusUpdate}>
					Update Status
				</button>
			</div>

			<div className="w-[50%] h-[90%]">
				<p>Remark</p>
				<textarea 
					className="p-2 border-2 border-[grey] rounded-md w-full h-full"
					onChange={(e)=>setRemark(e.target.value)}
					value={remark}
				/>
			</div>
		</main>
	)
}

export default FeedbackForm