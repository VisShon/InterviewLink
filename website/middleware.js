import { NextResponse } from 'next/server'
import {decodeJwt, jwtVerify} from 'jose'

export async function middleware(req) {
	const jwt = req.cookies.get("token");
	const {pathname} = req.nextUrl;

	//Admin redirects
	if (pathname.startsWith("/admin")){
		if (jwt == undefined) {
			req.nextUrl.pathname = '/login';
			return NextResponse.redirect(req.nextUrl);
		}
		try {
			await verify(jwt.value, process.env.JWT_KEY);
			const user = await decode(jwt.value)
			if(user.id == process.env.ADMIN_ID){
				req.nextUrl.pathname = pathname;
				return NextResponse.next();
			}

			req.nextUrl.pathname = '/login';
			return NextResponse.redirect(req.nextUrl);

		} catch (error) {
			return NextResponse.next();
		}
	}


	//Manager redirects
	if (pathname=="/"||(pathname.startsWith("/compile"))||(pathname.startsWith("/candidates"))||(pathname.startsWith("/interview"))){
		if (jwt == undefined) {
			req.nextUrl.pathname = '/login';
			return NextResponse.redirect(req.nextUrl);
		}
		try {
			await verify(jwt.value, process.env.JWT_KEY);
			const user = await decode(jwt.value)

			if(user.id == process.env.ADMIN_ID){
				req.nextUrl.pathname = '/admin';
				return NextResponse.redirect(req.nextUrl);
			}

			req.nextUrl.pathname = pathname;
			return NextResponse.next();

		} catch (error) {
			return NextResponse.next();
		}
	}

}

export async function verify(token, secret) {
	const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
	return payload;
}

export async function decode(token) {
	const decoded = decodeJwt(token);
	return decoded
}

export const config = {
	matcher: ['/','/interview/:id*','/candidates/:id*','/login', '/compile', '/admin', '/admin/completed'],
}
