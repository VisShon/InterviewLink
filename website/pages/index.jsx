import Head from 'next/head'
import Timings from '@/components/Timings'
import ManagerInfoPanel from '@/components/ManagerInfoPanel'
import GetInterviewer from '@/apollo/query/getInterviewer.graphql'
import nProgress from 'nprogress'
import { decode } from 'jsonwebtoken'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

export default function Home({id}) {
	const [managerData, setManagerData] = useState()
	const { loading, error, data } = useQuery(GetInterviewer,{
		variables:{
			where: {
			  interviewerId: id
			}
		}
	})

	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading){
			nProgress.done(false)
			setManagerData(data?.interviewers[0])
			sessionStorage.setItem(data?.interviewers[0].image,'image')
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])

	console.log(data)

	return (
		<main>
			<Head>
				<title>InterviewLink</title>
				<meta
					name="description"
					content="MathWorks interviewing platform"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className='flex w-full p-10'>
				<div className='flex flex-col w-[30%] px-8 relative'>
					<ManagerInfoPanel
						image={managerData?.image} 
						name={managerData?.userName} 
						role={managerData?.role}
						skills={managerData?.skillset}
						candidates={managerData?.interviewList.length}
						completed={managerData?.interviewList
						.filter(item=>item.candidate.interviewStatus=='TOBEINTERVIEWED').length}
					/>
				</div>

				<div className='flex flex-col w-[70%]'>
					{managerData?.interviewList?.map(({candidate,timeStart,timeEnd,interviewId},index)=>{
						const startTime = new Date(timeStart);
						const endTime = new Date(timeEnd);
						const startTimeFormatted = startTime.toLocaleString('en-GB', { timeZone: 'UTC' });
						const endTimeFormatted = endTime.toLocaleString('en-GB', { timeZone: 'UTC' });
						return (
						<Timings
							key={index}
							id={interviewId}
							name={candidate.name}
							college={candidate.college}
							degree={candidate.degree}
							role={candidate.track}
							status={candidate.interviewStatus}
							timings={[startTimeFormatted,endTimeFormatted]}
						/>)
					})}
				</div>
			</div>
		</main>
	)
}

export async function getServerSideProps({req,res}){
	const token = req.cookies.token
	console.log(decode(token))
	return {
		props:{
			id:token?decode(token)?.id:''
		}
	}
}