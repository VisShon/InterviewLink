const credentials =  require("../credentials.json")
const { google } = require("googleapis")
const {addWeeks} =  require("date-fns")

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

	console.log(`Appointments: ${appointments}`)

	let availableSlots = []
	const workdayStart = new Date()
	workdayStart.setHours(8, 0, 0, 0)

	const workdayEnd = new Date()
	workdayEnd.setHours(19, 0, 0, 0)

	let currentSlotStart = new Date(workdayStart)
	let id = 0

	while (currentSlotStart < workdayEnd) {
		const currentSlotEnd = new Date(currentSlotStart)
		currentSlotEnd.setMinutes(currentSlotEnd.getMinutes() + 30)

		if(appointments.every(appointment => (currentSlotEnd <= appointment.start || currentSlotStart >= appointment.end))){
			availableSlots.push({ 
				id: id,
				interviewerId:interviewerId,
				interviewerStatus: "Available",
				start: currentSlotStart.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
				end: currentSlotEnd.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
				day: daysOfWeek[currentSlotStart.getDay()],
				timestamp: currentSlotStart,
			})

			id++
		}

		currentSlotStart.setTime(currentSlotEnd.getTime())
	}

	return availableSlots
}


const setSlot = async(calendarId,interviewerId) =>{

}


module.exports ={
	getSlots,
	setSlot
}
