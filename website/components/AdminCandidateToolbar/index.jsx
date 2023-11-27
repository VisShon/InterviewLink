import GoButton from "./GoButton"
import NoGoButton from "./NoGoButton"


function AdminToolbar({interviewId,candidateId,track,interviewerId}){
	return (
		<div className="flex gap-10 w-[45%] items-center font-bold">
				<GoButton 
					interviewId={interviewId}
					candidateId={candidateId}
					track={track}
				/>
				<NoGoButton
					candidateId={candidateId}
					interviewId={interviewId}
					interviewerId={interviewerId}
				/>
		</div>
	)
}

export default AdminToolbar