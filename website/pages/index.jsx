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
			  id: id
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
			localStorage.setItem('image',data?.interviewers[0].image)
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])


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
						.filter(item=>item.candidate.status=='TOBEINTERVIEWED').length}
					/>
				</div>

				<div className='flex flex-col w-[70%]'>
					{managerData?.interviewList?.map(({candidate,timeStart,timeEnd,id},index)=>{
						const startTime = new Date(timeStart);
						const endTime = new Date(timeEnd);
						const startTimeFormatted = startTime.toLocaleTimeString('en-US', { hour12: true });
						const endTimeFormatted = endTime.toLocaleTimeString('en-US', { hour12: true });
						return (
						<Timings
							key={index}
							id={id}
							name={candidate.name}
							college={candidate.college}
							degree={candidate.degree}
							role={candidate.track}
							day={startTime.getDay()}
							status={candidate.status}
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
	return {
		props:{
			id:token?decode(token)?.id:''
		}
	}
}