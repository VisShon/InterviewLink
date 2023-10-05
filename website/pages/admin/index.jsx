import AdminManagerToolbar from '@/components/AdminManagerToolbar'
import CandidateSlot from '@/components/CandidateSlot'
import FreeSlot from '@/components/FreeSlot'
import ManagerCard from "@/components/ManagerCard"
import Slots from '@/slots.json'

import GetInterviewers from '@/apollo/query/getInterviewers.graphql'
import GetCandidates from '@/apollo/query/getCandidates.graphql'

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import nProgress from 'nprogress'

function admin() {
	const [managersData, setManagersData] = useState()
	const [candidates, setCandidates] = useState()

	const { loading:interviewersLoading, error:interviewersError, data:interviewersData }
	 = useQuery(GetInterviewers)

	 const { loading:candidatesLoading, error:candidatesError, data:candidatesData }
	 = useQuery(GetCandidates,{
		where: {
			interviewStatus: "TOBEINTERVIEWED"
		}
	 })

	const [selectedManager,setSelectedManager] = useState('')
	const [selectedSlot,setSelectedSlot] = useState(0)
	const [selectedCandidate,setSelectedCandidate] = useState('')

	console.log(selectedManager,selectedSlot,selectedCandidate)

	useEffect(() => {
		if(interviewersLoading||candidatesLoading)
			nProgress.start()
		if((!interviewersLoading&&!candidatesLoading)||candidatesError){
			nProgress.done(false)
			setManagersData(interviewersData?.interviewers)
			setCandidates(candidatesData?.candidates)
		}
		if(interviewersError||candidatesData)
			nProgress.done(false)

		if(managersData)
			setSelectedManager(managersData[0].interviewerId)

	},[interviewersLoading,managersData,candidatesLoading])

	
	return (
		<div className='w-screen h-[80%] flex items-center justify-between p-2 px-5'>
			<div className="p-5 bg-secondary rounded-2xl w-[30%] h-[80vh] overflow-y-clip flex flex-col gap-5">
				{managersData?.map((manager, index)=>(
					<ManagerCard
						key={index}
						id={manager.interviewerId}
						image={manager.image}
						name={manager.userName}
						role={manager.role}
						selected={selectedManager}
						setSelected={setSelectedManager}
					/>
				))}
			</div>
			<div className='flex flex-col gap-10 w-[70%] px-8'>
				<div className='w-auto h-[20vh] rounded-2xl flex gap-5 overflow-x-scroll'>
					{selectedManager&&
					Slots.filter(item=>item.interviewerId===selectedManager)
						.map((slot,index)=>(
						<FreeSlot
							key={index}
							id={slot.id}
							timings={[slot.timestart,slot.timeend]}
							day={slot.day}
							selected={selectedSlot}
							setSelected={setSelectedSlot}
						/>
					))}
				</div>
				<div className='w-full h-[43vh] rounded-2xl flex flex-col gap-7 overflow-y-scroll'>
					{selectedManager&&
						candidates?.filter(candidate=>candidate.interviewStatus=='TOBEINTERVIEWED')
						.map((candidate,index)=>(
							<CandidateSlot
								key={index}
								id={candidate.candidateId}
								name={candidate.name}
								college={candidate.college}
								track={candidate.track}
								selected={selectedCandidate}
								setSelected={setSelectedCandidate}
							/>
						))}
				</div>
				<AdminManagerToolbar
					selectedCandidate={selectedCandidate}
					selectedManager={selectedManager}
					selectedSlot={selectedSlot}
					interviewersData = {interviewersData}
					candidatesData = {candidatesData}
				/>
			</div>
		</div>
	)
}

export default admin