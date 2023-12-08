var express = require('express')
var router = express.Router()
const { ScheduleAll } = require('../controllers/Scheduler.js')
const { getSlots,setSlot } = require('../controllers/SlotsController.js')


router.post('/ocrAPI', function(req, res, next) {
	//for bulk upload
})

router.post('/schedulerAPI', async function(req, res, next) {
	const interviewSchedule = await ScheduleAll(req.body.candidatesData, req.body.interviewersData)
	res.json(interviewSchedule)
	next()
})

router.get('/slotsAPI', async function(req, res, next) {
	const interviewerSlots = await getSlots(req.query.calendarId, req.query.interviewerId)
	res.send(interviewerSlots)
	next()
})

router.post('/slotsAPI', async function(req, res, next) {
	await setSlot(req.query.calendarId, req.query.start, req.query.end)
	res.send("OK")
	next()
})


module.exports = router
