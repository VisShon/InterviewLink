import cookie from 'cookie'

export default async function handler(req,res){
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          expires: new Date(0),
          path: "/",
        })
    );
    res.redirect(200,'/')
}