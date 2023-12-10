const { getSlots,setSlot } = require('./SlotsController.js')

function getCandidates(candidatesData){
	
	let candidates = {
		technicalCandidates: {},
		hrCandidates: {}
	}

	candidatesData?.forEach(candidate => {
		switch(candidate.track){
			case "HR":
				candidates.hrCandidates[candidate?.id] = candidate.skillset
				break;
			case "TECHNICAL":
				candidates.technicalCandidates[candidate?.id] = candidate.skillset
				break;
			default:
				candidates.technicalCandidates[candidate?.id] = candidate.skillset
				break;
		}
	})


	return candidates
}

function getInterviewers(interviewersData){

	let interviewers={
		technicalInterviewers: {},
		hrInterviewers: {}
	}

	interviewersData?.forEach(interviewer=>{
		switch(interviewer.role){
			case "Human Resources":
				interviewers.hrInterviewers[interviewer?.id] = interviewer.skillset
				break;
			default:
				interviewers.technicalInterviewers[interviewer?.id] = interviewer.skillset
				break;
		}
	})

	console.log(interviewers)
	return interviewers
}

async function getFreeSlots(interviewersData){

	let freeSlots = new Map()

	for (interviewer of interviewersData){

		
		const res = await getSlots(interviewer?.calendarId,interviewer?.id)

		if(!freeSlots.has(interviewer?.id))
			freeSlots.set(interviewer?.id,[])

		const freeSlot = res.map(slot => [slot?.timestampStart,slot?.timestampEnd])
		freeSlots.set(interviewer?.id,freeSlot)
	}

	return freeSlots
}

function similarityIndex (set1,set2){
	const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}



function schedulingAlgo(candidates, interviewers, freeSlots) {
	
	let skillsetMap = new Map()
	let interviews=[]  

	const candidatesSorted = Object.entries(candidates)
		?.sort((a, b)=>{
		return a?.skillset?.length - b?.skillset?.length
	})
	
	for (let [id, skillset] of Object.entries(interviewers)) {
		if (!skillsetMap.has(skillset))
			skillsetMap.set(skillset,0)

		skillsetMap.set(skillset,id)
	}

	for (let [id, skillset] of candidatesSorted) {

		let maxSimilarity = 0;
		let mostSimillarSkillSet = null;

		for (const interviewerSkillset of skillsetMap.keys()) {
			const similarity = similarityIndex(new Set(interviewerSkillset), new Set(skillset));
			if (similarity > maxSimilarity) {
				maxSimilarity = similarity;
				mostSimillarSkillSet = interviewerSkillset;
			}
		}

		const interviewerId = skillsetMap.get(mostSimillarSkillSet)
		const slots  = freeSlots.get(interviewerId)
		

		if(slots){
			
			interviews.push({
				"candidateId":id,
				"interviewerId":interviewerId,
				"start":slots.at(0)[0],
				"end":slots.at(0)[1],
			})
			
			freeSlots.set(interviewerId,slots.slice(1))
			candidatesSorted.splice(id,1)
		}
	}
	
	return interviews
}


const ScheduleAll = async(candidatesData, interviewersData) =>{	
	if(candidatesData == undefined||interviewersData == undefined)
		return []

	const {technicalCandidates, hrCandidates} = getCandidates(candidatesData)
	const {technicalInterviewers, hrInterviewers} = getInterviewers(interviewersData)
	const freeSlots = await getFreeSlots(interviewersData)

	const technicalSchedule = schedulingAlgo(technicalCandidates,technicalInterviewers,freeSlots)
	const hrSchedule = schedulingAlgo(hrCandidates,hrInterviewers,freeSlots)

	return [...technicalSchedule, ...hrSchedule]
}

module.exports ={
	ScheduleAll
}