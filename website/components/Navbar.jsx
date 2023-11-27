import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSessionStorage from '@/utils/useSessionStorage'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {

	const router = useRouter()
	const dp = useSessionStorage('image')
	const [route,setRoute] = useState(router.asPath)


	useEffect(() => {
		setRoute(router.asPath)
	}, [router.asPath]);
	

	return (
		route!=='/login'&&
		<div  className='w-full flex justify-center relative my-10'>
			{!route.startsWith('/admin')?
			<nav className="flex w-[50%] p-2 rounded-xl items-center justify-between font-[400] text-[#6f1f6b] px-10  z-50 overflow-x-hidden bg-main">
				<Link target="_blank" 
					href={'/'} 
					className="flex flex-col">
					<Image
						src={'/logo.svg'}
						width={40}
						height={40}
						alt={'Vantage'}
					/>
				</Link>


				<div className=" flex gap-10">
					<Link target="_blank" 
						style={route==='/'?{color:"#FFFFFF"}:{color:"#9EC2DB"}} 
						href={'/'}>
						Dashboard
					</Link>
					<Link target="_blank" 
						style={route==='/candidates'?{color:"#FFFFFF"}:{color:"#9EC2DB"}} 
						href={'/candidates'}>
						Candidates
					</Link>
					<Link target="_blank" 
						style={route==='/compile'?{color:"#FFFFFF"}:{color:"#9EC2DB"}} 
						href={'https://grader.mathworks.com/courses/112968-interview-test/assignments/309028-coding-problems'}>
						Compile
					</Link>
				</div>


				<Link target="_blank" href={'/'} className=" flex flex-col relative">
					<Image 
						className='rounded-full'
						src={dp?dp:'/profile.svg'} 
						width={40} 
						height={40} 
						alt={'Vantage'} 
					/>
				</Link>
			</nav>:
			<nav className="flex w-[50%] p-2 rounded-xl items-center justify-between font-[400] text-[#6f1f6b] px-10  z-50 overflow-x-hidden bg-main">
				<Link target="_blank" 
					href={'/admin'} 
					className="flex flex-col">
					<Image
						src={'/logo.svg'}
						width={40}
						height={40}
						alt={'Vantage'}
					/>
				</Link>


				<div className=" flex gap-10">
					<Link target="_blank" 
						style={route==='/admin'?{color:"#FFFFFF"}:{color:"#9EC2DB"}} 
						href={'/'}>
						Dashboard
					</Link>
					<Link target="_blank" 
						style={route==='/admin/completed'?{color:"#FFFFFF"}:{color:"#9EC2DB"}} 
						href={'/admin/completed'}>
						Candidates
					</Link>
				</div>


				<Link target="_blank" href={'/admin'} className=" flex flex-col relative">
					<Image 
						className='rounded-full'
						src={dp?dp:'/profile.svg'} 
						width={40} 
						height={40} 
						alt={'Vantage'} 
					/>
				</Link>
			</nav>}
		</div>
	)
}

export default Navbar
