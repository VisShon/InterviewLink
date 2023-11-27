import { useEffect, useState } from "react"
import SendAssesment from "./SendAssesment"
import SendInvite from "./SendInvite"
import SendMail from "./SendMail"


function InterviewToolbar({links=[], mail, name, phone}){
	
	return (
		<div className="flex gap-10 w-[85%] justify-between items-center">
				<SendInvite 
					mail={mail}
					name={name}
					links={links[0]}
				/>
				<SendAssesment
					mail={mail}
					name={name}
					links={links[1]}
				/>
				<SendMail 
					mail={mail}
				/>
		</div>
	)
}

export default InterviewToolbar