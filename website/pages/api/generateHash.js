import { hashSync } from "bcrypt"

export default async function handler(req,res){
	const {password} = req.query
	const result =  hashSync(password,12)
	res.send(result)
}