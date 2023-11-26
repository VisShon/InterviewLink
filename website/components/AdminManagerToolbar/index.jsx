import AutoScheduleButton from "./AutoScheduleButton"
import ScheduleButton from "./ScheduleButton"

function AdminManagerToolbar({selectedManager,selectedCandidate,selectedSlot,slots,interviewersData,candidatesData}){
	return (
		<div className="flex gap-10 w-[45%] items-center">
				<AutoScheduleButton
						id={selectedManager}
						interviewersData = {interviewersData}
						candidatesData = {candidatesData}
				/>
				<ScheduleButton
						managerId={selectedManager}
						candidateId={selectedCandidate}
						slot={slots[selectedSlot]}
				/>
		</div>
	)
}

export default AdminManagerToolbar