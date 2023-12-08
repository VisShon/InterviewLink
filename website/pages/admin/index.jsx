import AdminManagerToolbar from '@/components/AdminManagerToolbar'
import CandidateSlot from '@/components/CandidateSlot'
import FreeSlot from '@/components/FreeSlot'
import ManagerCard from "@/components/ManagerCard"

import GetInterviewers from '@/apollo/query/getInterviewers.graphql'
import GetCandidates from '@/apollo/query/getCandidates.graphql'

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import nProgress from 'nprogress'

function admin() {
	const [managersData, setManagersData] = useState([])
	const [managerGraderLink, setManagerGraderLink] = useState('')
	const [candidates, setCandidates] = useState([])
	const [slots, setSlots] = useState([])


	const { loading:interviewersLoading, error:interviewersError, data:interviewersData }
	 = useQuery(GetInterviewers)

	 const { loading:candidatesLoading, error:candidatesError, data:candidatesData }
	 = useQuery(GetCandidates,{
		where: {
			status: "TOBEINTERVIEWED"
		}
	 })

	const [selectedManager,setSelectedManager] = useState(managersData[0]?.id)
	const [selectedSlot,setSelectedSlot] = useState({})
	const [selectedCandidate,setSelectedCandidate] = useState('')

	useEffect(()=>{
		const graderLink = managersData?.find(manager=>manager?.id==selectedManager)?.graderLink
		setManagerGraderLink(graderLink)
	},[selectedManager])

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

	},[interviewersLoading,managersData,candidatesLoading])

	
	return (
		<div className='w-screen h-[80%] flex items-center justify-between p-2 px-5'>
			<div className="p-5 bg-secondary rounded-2xl w-[30%] h-[80vh] overflow-y-clip flex flex-col gap-5">
				{managersData?.map((manager, index)=>(
					<ManagerCard
						key={index}
						id={manager.id}
						image={manager.image}
						name={manager.userName}
						role={manager.role}
						calendarId={manager.calendarId}
						setSlots={setSlots}
						selected={selectedManager}
						setSelected={setSelectedManager}
						setSelectedSlot={setSelectedSlot}
					/>
				))}
			</div>
			<div className='flex flex-col gap-10 w-[70%] px-8 overflow-x-clip'>
				<div className='w-full h-[20vh] flex flex-row gap-5 overflow-x-scroll'>
					{selectedManager&&slots&&
					slots?.map((slot,index)=>(
						<FreeSlot
							key={index}
							id={slot.id}
							timings={[slot.start,slot.end]}
							day={slot.day}
							selected={selectedSlot}
							setSelected={setSelectedSlot}
						/>
					))}
				</div>
				<div className='w-full h-[43vh] rounded-2xl flex flex-col gap-7 overflow-y-scroll'>
					{!selectedManager&&<p className="text-main select-none">Please select a manager</p>}					
					{selectedManager&&
						candidates?.filter(candidate=>candidate.status=='TOBEINTERVIEWED')
						.map((candidate,index)=>(
							<CandidateSlot
								key={index}
								id={candidate.id}
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
					slots={slots}
					managerGraderLink={managerGraderLink}
					interviewersData = {interviewersData?.interviewers}
					candidatesData = {candidatesData?.candidates}
				/>
			</div>
		</div>
	)
}


export default admin