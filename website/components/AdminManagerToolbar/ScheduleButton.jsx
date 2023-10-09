import { useMutation } from "@apollo/client"
import nProgress from "nprogress"
import { useEffect } from "react"
import UpdateCandidateInterview from '@/apollo/mutation/updateCandidateInterview.graphql'
import slotsData from '@/slots.json'

function ScheduleButton({managerId,candidateId,slot}) {
    
    const [updateCandidateInterview,{error,loading,data}] = useMutation(UpdateCandidateInterview);
    const freeSlot = slotsData[slot-1]

    const candidateSchedule = async () =>{
		await updateCandidateInterview({
			variables:{
				"where": {
                    "candidateId": candidateId
                  },
          "update": {
                    "interviewStatus": "ONGOING"
                },
                  "create": {
                    "interviewList": [
                      {
                        "node": {
                          "admin": process.env.ADMIN_ID,
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
                          "timeEnd": new Date(freeSlot.timestart),
                          "timeStart": new Date(freeSlot.timeend)
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
			alert('success')
			nProgress.done(false)
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])

	return (
		<button 
			className="hover:shadow-md  active:opacity-80 flex flex-col text-secondary rounded-xl p-4 px-10 bg-[#80AFCF] justify-center items-center w-[35%] h-full"
			onClick={candidateSchedule}>
			<p>Schedule</p>
		</button>
	)
}

export default ScheduleButton