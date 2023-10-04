import { botController } from './graphql'

export default async function handler(req,res){
	const {telegram_id} = req.query
	const result = await botController({telegram_id})
	if(result=='USER_NOT_EXISTS')
		res.send('user not found')
	else if(result!='USER_NOT_EXISTS'){
		res.send(result)
	}
}