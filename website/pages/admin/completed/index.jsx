import Search from "@/components/Search"
import CompletedCandidateCard from "@/components/CompletedCandidateCard"
import GetInterview from '@/apollo/query/getInterviewCompleted.graphql'
import nProgress from "nprogress"
import { decode } from "jsonwebtoken"
import Image from "next/image"
import { json2csv } from "json-2-csv"
import { useState,useEffect } from "react"
import { useQuery } from "@apollo/client"

function Candidates() {

	const [sort,setSort] = useState(false)
	const [candidates, setCandidates] = useState()
	const [searchParam,setSearchParam] = useState([])
	const { loading, error, data } = useQuery(GetInterview,{
		variables:{
			"where": {
			"AND": [
			{
				"candidate": {
				"status": "TOBEINTERVIEWED"
				},
				"interviewerAggregate": {
				"NOT": {
					"count": 0
				}
				}
			},
			]
		}
		}
	})

	console.log(data,error)

	const exportCSV = async () => {
		const candidatesData = candidates.map(interview=>{
			return{
				name:interview?.candidate?.name,
				status:interview?.candidate?.status,
				track:interview?.candidate?.track,
				college:interview?.candidate?.college,
				degree:interview?.candidate?.degree,
				email:interview?.candidate?.email,
				feedback:interview?.feedbacks[0]?.description
			}
		})

		const csv  = json2csv(candidatesData)
		const blob = new Blob([csv], { type: ".csv" })
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'candidates.csv';
		link.click();
	}
	

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


	return (
		<main className="w-screen h-auto relative justify-center items-center flex flex-col p-10">
			<div className="flex w-full justify-start gap-10 h-[5%] mb-10 z-20 ">
				<button
					className="bg-main rounded-xl p-2 text-secondary hover:shadow-md active:opacity-95 w-[10%]"
					onClick={()=>setSort(prev=>!prev)}>
					Sort
				</button>
				<button 
					className="text-[0.75rem] hover:shadow-md  active:opacity-80 flex flex-col bg-secondary rounded-xl text-main justify-center items-center w-[8%] gap-2 h-[60%]  cursor-pointer py-1"
					onClick={exportCSV}
					id="Assessment"
				>
					<Image
						alt="assessment"
						src={"/download.svg"}
						height={20}
						width={20}
						className="w-[1.5rem] "
					/>
					<p>Export CSV</p>
				</button>
				<Search
					searchParam={searchParam}
					setSearchParam={setSearchParam}
				/>
			</div>

			{candidates?.filter(({candidate})=>
			(searchParam==''?true:
			candidate?.name?.toLowerCase().includes(searchParam)||
			candidate?.status?.toLowerCase().includes(searchParam)||
			candidate?.track?.toLowerCase().includes(searchParam)||
			candidate?.college?.toLowerCase().includes(searchParam)||
			candidate?.degree?.toLowerCase().includes(searchParam)))
			.sort((a,b)=>{
				if(a?.candidate?.cgpa>b?.candidate?.cgpa&&sort){return -1}
				else{return 1}
			})
			.map(({candidate,id},index)=>(
				<CompletedCandidateCard
					key={index}
					id={id}
					name={candidate?.name}
					college={candidate?.college}
					degree={candidate?.degree}
					description={'Lorem ipsum dolor sit amet consectetur. Lacus rutrum egestas sollicitudin viverra faucibus vitae. Vitae mi pellentesque sed nulla tortor ac placerat. Non non vitae auctor semper tristique ipsum blandit sapien.'}
				/>
			))}
		</main>
	)
}

export default Candidates
