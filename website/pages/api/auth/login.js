import { logIn } from "../graphql"
import cookie from 'cookie'

export default async function handler(req,res){
	
	const {password,email} = req.body
	
	const token = await logIn({
		email:email,
		password:password,
	})

	if(token=='USER_NOT_EXISTS')
		res.redirect(404,'/signup')


	else if(token!='USER_NOT_EXISTS'){
		res.setHeader(
			"Set-Cookie",
			cookie.serialize('token', token, 
				{
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					maxAge: 2592000,
					sameSite: "strict",
					path: "/",
				}
			)
		);
		res.redirect(200,'/')
	}
}