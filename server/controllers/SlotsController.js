const credentials =  require("../credentials.json")
const { google } = require("googleapis")
const {addWeeks,addMinutes} =  require("date-fns")
const { v4: uuidv4 } = require('uuid');

const getSlots = async(calendarId,interviewerId) =>{

	const scopes = ["https://www.googleapis.com/auth/calendar"]

	const client = await google.auth.getClient({
		credentials,
		scopes,
	})

	client.subject = "mathworks@education-401817.iam.gserviceaccount.com"
	const calendar = google.calendar({ version: "v3", auth: client })
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const res = await calendar.events.list(
		{
			calendarId: calendarId||"91a7911575b532862ac207baec2c46028db05dc77701f6790fbafd39e81b03f7@group.calendar.google.com",
			timeMin: new Date().toISOString(),
			timeMax: addWeeks(new Date(), 1).toISOString(),
			singleEvents: true,
			orderBy: "startTime",
		}
	)

	const appointments = res.data.items.map((appointment) => ({
		id: appointment.id,
		start: new Date(appointment.start.dateTime),
		end: new Date(appointment.end.dateTime),
		day: new Date(appointment.start.dateTime).getDay(),
	}))


	let availableSlots = []
	const workdayStart = new Date()
	const workdayEnd = new Date()
	workdayEnd.setHours(21, 0, 0, 0)

	let currentSlotStart = new Date(workdayStart)
	let id = 0

	while (currentSlotStart < workdayEnd) {
		const currentSlotEnd = new Date(currentSlotStart)
		currentSlotEnd.setMinutes(currentSlotEnd.getMinutes() + 30)

		if(appointments.every(appointment => (currentSlotEnd <= appointment.start || currentSlotStart >= appointment.end))){
			availableSlots.push({ 
				id: id,
				calendarId: calendarId,
				interviewerStatus: "Available",
				start: currentSlotStart.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
				end: currentSlotEnd.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
				day: daysOfWeek[currentSlotStart.getDay()],
				timestampStart: currentSlotStart.toISOString(),
				timestampEnd: currentSlotEnd.toISOString(),
			})

			id++
		}

		currentSlotStart.setTime(currentSlotEnd.getTime())
	}

	console.log(appointments)

	return availableSlots
}


const setSlot = async(calendarId, start, end) =>{

	const scopes = ["https://www.googleapis.com/auth/calendar"]

	const client = await google.auth.getClient({
		credentials,
		scopes,
	})

	client.subject = "mathworks@education-401817.iam.gserviceaccount.com"
	const calendar = google.calendar({ version: "v3", auth: client })

	const res = await calendar.events.insert(
		{
			sendUpdates:"all",
			calendarId: calendarId||"91a7911575b532862ac207baec2c46028db05dc77701f6790fbafd39e81b03f7@group.calendar.google.com",
			resource:{
				description:"Mathworks Interview",
				summary:"Mathworks Interview",

				start: {
					dateTime: start,
					timeZone: "Asia/Kolkata",
				},
				end: {
					dateTime: end,
					timeZone: "Asia/Kolkata",
				},

				conferenceData: {
					createRequest: {
						requestId: uuidv4().toString(),
						conferenceSolutionKey: {
							type: "hangoutsMeet"
						},
					}
				}
			},
		}
	)
	// console.log(res)
}


module.exports ={
	getSlots,
	setSlot
}
