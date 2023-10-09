import { useEffect, useState } from "react"
import SendAssesment from "./SendAssesment"
import SendInvite from "./SendInvite"
import SendMail from "./SendMail"


function InterviewToolbar({links=[], mail, name, phone}){
	
	const [teamsLink,setTeamsLink] = useState('')
	useEffect(()=>setTeamsLink(links[0]),[links])

	return (
		<div className="flex gap-10 w-[85%] justify-between items-center">
				<SendInvite 
					mail={mail}
					name={name}
					links={teamsLink}
				/>
				<SendAssesment
					mail={mail}
					name={name}
				/>
				<SendMail 
					mail={mail}
				/>
		</div>
	)
}

export default InterviewToolbar