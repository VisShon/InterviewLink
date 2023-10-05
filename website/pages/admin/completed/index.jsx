import Search from "@/components/Search"
import CompletedCandidateCard from "@/components/CompletedCandidateCard"
import GetInterviewer from '@/apollo/query/getInterviewCompleted.graphql'
import nProgress from "nprogress"
import { decode } from "jsonwebtoken"
import { useState,useEffect } from "react"
import { useQuery } from "@apollo/client"

function Candidates() {

	const [sort,setSort] = useState(false)
	const [candidates, setCandidates] = useState()
	const [searchParam,setSearchParam] = useState([])
	const { loading, error, data } = useQuery(GetInterviewer,{
		variables:{
			"where": {
				"candidate": {
				  "interviewStatus": "TOBEINTERVIEWED"
				}
			}
		}
	})

	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading){
			nProgress.done(false)
			setCandidates(data?.interviews)
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])

	console.log(data)

	return (
		<main className="w-screen h-auto relative justify-center items-center flex flex-col p-10">
			<div className="flex w-full justify-between h-[5%] mb-10 z-20 ">
				<button
					className="bg-main rounded-xl p-2 text-secondary hover:shadow-md active:opacity-95 w-[10%]"
					onClick={()=>setSort(prev=>!prev)}>
					Sort
				</button>
				<Search
					searchParam={searchParam}
					setSearchParam={setSearchParam}
				/>
			</div>

			{candidates?.filter(({candidate})=>
			(searchParam==''?true:
			candidate?.name?.toLowerCase().includes(searchParam)||
			candidate?.interviewStatus?.toLowerCase().includes(searchParam)||
			candidate?.track?.toLowerCase().includes(searchParam)||
			candidate?.college?.toLowerCase().includes(searchParam)||
			candidate?.degree?.toLowerCase().includes(searchParam)))
			.sort((a,b)=>{
				if(a?.candidate?.cgpa>b?.candidate?.cgpa&&sort){return -1}
				else{return 1}
			})
			.map(({candidate,interviewId},index)=>(
				<CompletedCandidateCard
					key={index}
					id={interviewId}
					name={candidate?.name}
					college={candidate?.college}
					role={candidate?.track}
					description={'Lorem ipsum dolor sit amet consectetur. Lacus rutrum egestas sollicitudin viverra faucibus vitae. Vitae mi pellentesque sed nulla tortor ac placerat. Non non vitae auctor semper tristique ipsum blandit sapien.'}
				/>
			))}
		</main>
	)
}

export default Candidates

export async function getServerSideProps({req,res}){
	const token = req.cookies.token
	console.log(decode(token))
	return {
		props:{
			id:token?decode(token)?.id:''
		}
	}
}
