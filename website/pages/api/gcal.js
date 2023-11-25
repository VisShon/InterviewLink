import credentials from "@/credentials.json"
import { google } from 'googleapis'
import {addWeeks} from "date-fns"

export default async function handler(request,response){
	const scopes = ['https://www.googleapis.com/auth/calendar']
	

	const client = await google.auth.getClient({
		credentials,
		scopes,
	})

	client.subject = "mathworks@education-401817.iam.gserviceaccount.com"
	const calendar = google.calendar({ version: 'v3', auth: client })
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	
	await calendar.events.list(
		{
			calendarId: '91a7911575b532862ac207baec2c46028db05dc77701f6790fbafd39e81b03f7@group.calendar.google.com',
			timeMin: new Date().toISOString(),
			timeMax: addWeeks(new Date(), 1).toISOString(), // Let's get events for one week
			singleEvents: true,
			orderBy: 'startTime',
		},
		(err, res) => {
			if (err) {
				console.log(`The API returned an error: ${err}`)
			}

			const appointments = res.data.items.map((appointment) => ({
				id: appointment.id,
				start: new Date(appointment.start.dateTime),
				end: new Date(appointment.end.dateTime),
				day: new Date(appointment.start.dateTime).getDay(),
			}))

			const workdayStart = new Date()
			workdayStart.setHours(8, 0, 0, 0)

			const workdayEnd = new Date()
			workdayEnd.setHours(19, 0, 0, 0)

			let currentSlotStart = new Date(workdayStart)
			let availableSlots = []
			let id = 0

			while (currentSlotStart < workdayEnd) {
				const currentSlotEnd = new Date(currentSlotStart)
				currentSlotEnd.setMinutes(currentSlotEnd.getMinutes() + 30)

				if(appointments.every(appointment => (currentSlotEnd <= appointment.start || currentSlotStart >= appointment.end))){
					availableSlots.push({ 
						id: id,
						timestamp: currentSlotStart,
						start: currentSlotStart.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
						end: currentSlotEnd.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
						day: daysOfWeek[currentSlotStart.getDay()],
						interviewerStatus: 'Available',
					})

					id++
				}

				currentSlotStart.setTime(currentSlotEnd.getTime())
			}
			response.json(availableSlots)
		},
	)
}