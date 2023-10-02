import slotsData from '@/slots.json'

function comp(a, b) {
	return a?.skillset?.length < b?.skillset?.length;
}

function convertTime(timeString){
	let currentDate = new Date();
	let [hour, minute] = timeString.split(':').map(part => parseInt(part));
	let convertedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, minute, 0); 
	let formattedDate = convertedDate.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
		}).replaceAll(' AM', '').replaceAll(' PM', '').replaceAll(' at', '');
	return formattedDate;   
}

function getCandidatesFromJSON(candidates){
	let candidateMap = {};
	candidates?.forEach(candidate => {
	candidateMap[candidate?.candidateId] = candidate.track;
	});
	return candidateMap;
}

function getInterviewersFromJSON(interviewers){
	let interviewerMap={};
	interviewers?.forEach(interviewer=>{
		interviewerMap[interviewer?.interviewerId]=interviewer?.skillset;
	});
	return interviewerMap;
}

function getInterviewerFreeSlots(freeSlotsJSON){
	let freeSlotsMap={};
	freeSlotsJSON.forEach(freeSlot=>{
		if(!freeSlotsMap[freeSlot.interviewerId]){
			freeSlotsMap[freeSlot.interviewerId]=[]
		}
		freeSlotsMap[freeSlot.interviewerId].push([convertTime(freeSlot.timestart),convertTime(freeSlot.timeend)]);
	});
	return freeSlotsMap;
}

function circRotate(a, rotationIndex) {
	let n = a.length;
	let b = [...a];
	for (let i = 0; i < n; i++) {
		a[i] = b[(i + rotationIndex) % n];
	}
	return a;
}

function schedulingAlgo1(candidates, interviewers, freeSlots) {
	let interviewersSorted = Object.entries(interviewers);
	let tracks = {};
	
	for (let [candidateId, track] of Object.entries(candidates)) {
		if (!tracks[track]) {
			tracks[track] = [];
		}
		tracks[track].push(candidateId);
	}

	interviewersSorted.sort(comp);
	let interviews=[];  

	for (let [interviewerId, skillset] of interviewersSorted) {
		if(!freeSlots[interviewerId]) continue;
		for (let s of freeSlots[interviewerId]) {
			for (let j = 0; j < skillset?.length; j++) {
				if(!tracks[skillset[j]]) continue;
				if (tracks[skillset[j]].length !== 0) {
					let candidateId = tracks[skillset[j]].pop();
					interviews.push({
						"candidateId":candidateId,
						"interviewerId":interviewerId,
						"duration":60,
						"timestart":s[0],
						"timeend":s[1]
					});
					break;
				}
			}
		}
	}
	return interviews;
}




export async function AutoSchedule(candidatesData, interviewersData) {
	let candidatesDataArray = getCandidatesFromJSON(candidatesData.candidates);
	let interviewersDataArray = getInterviewersFromJSON(interviewersData.interviewers);
	let freeSlotsDataArray = getInterviewerFreeSlots(slotsData);
	let interviewSchedule = schedulingAlgo1(candidatesDataArray, interviewersDataArray, freeSlotsDataArray);
	return interviewSchedule;
}