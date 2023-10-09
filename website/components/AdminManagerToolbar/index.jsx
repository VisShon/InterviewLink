import AutoScheduleButton from "./AutoScheduleButton"
import ScheduleButton from "./ScheduleButton"

function AdminManagerToolbar({selectedManager,selectedCandidate,selectedSlot,interviewersData,candidatesData}){
	return (
		<div className="flex gap-10 w-[85%] items-center">
				<AutoScheduleButton
						id={selectedManager}
						interviewersData = {interviewersData}
						candidatesData = {candidatesData}
				/>
				<ScheduleButton
						managerId={selectedManager}
						candidateId={selectedCandidate}
						slot={selectedSlot}
				/>
		</div>
	)
}

export default AdminManagerToolbar