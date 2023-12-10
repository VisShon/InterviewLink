import GetInterviewer from '@/apollo/query/getInterviewer.graphql'
import UpdateInterviewer from '@/apollo/mutation/updateInterviewerSkillset.graphql'


import nProgress from 'nprogress'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useQuery, useMutation } from '@apollo/client'

import ManagerInfoPanel from '@/components/ManagerInfoPanel'

function Profile() {
	const router = useRouter();
	const {id} = router.query;

	const [newSkills, setNewSkills] = useState([])
	const [showInput, setShowInput] = useState(false)
	const [managerData, setManagerData] = useState()
	const [selectedButton, setSelectedButton] = useState('Basic Details');
	const [updateInterviewer,{error:updateError,loading:updateLoading,data:updateData}] = useMutation(UpdateInterviewer)	
	const { loading, error, data, refetch } = useQuery(GetInterviewer,{
		variables:{
			where: {
			  id: id
			}
		}
	})

	const newSkillUpdate = async () => {
		const newSkillset = [...managerData?.skillset,...newSkills]
		await updateInterviewer({
			variables:{
				"where": {
				  "id": id
				},
				"update": {
				  "skillset": newSkillset
				}
			}
		})
		setShowInput(false)
		router.reload()

	}

	console.log(newSkills)

	useEffect(() => {
		if(loading||updateLoading){
			nProgress.start()
		}
		if(!loading||!updateLoading){
			nProgress.done(false)
			setManagerData(data?.interviewers?.at(0))
		}
		if(error||updateError){
			nProgress.done(false)
		}
	},[loading,updateLoading])


	return (
		<div>
			<div className='flex w-full p-10'>

				<div className='flex flex-col w-[30%] px-8 relative'>
					<ManagerInfoPanel
						image={managerData?.image} 
						name={managerData?.userName} 
						role={managerData?.role}
						skills={managerData?.skillset}
            			stats={false}
					/>
				</div>

				<div className='flex flex-col w-[70%] px-8'>
					{
						selectedButton === 'Basic Details' && (
							<div className="flex flex-col w-full sticky top-7 mb-3">
								<div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm  text-[#898989]">
									<h1 className="text-main font-bold text-xl mb-3 ml-3">About</h1>
									<div className="flex flex-col space-y-2">
										<div className='ml-6'>
											<b>Name: </b>{managerData?.userName}
										</div>
										<div className='ml-6'>
											<b>Role: </b>{managerData?.role}
										</div>
										<div className='ml-6'>
											<b>Location: </b>{"Bengaluru"}
										</div>
										<div className='ml-6'>
											<b>Email: </b>{managerData?.email}
										</div>
										<div className='ml-6'>
											<b>Employee ID: </b>{managerData?.id}
										</div>
									</div>
								</div>
							</div>
			
						)
					}

					<div className="flex flex-col justify-between items-start text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm  text-[#898989]">

						<h1 className="text-main font-bold text-xl ml-3 mb-3">
							Skills
						</h1>

						<div className="w-full flex items-start flex-wrap gap-10">
							{
								!showInput?
								<button
									onClick={()=>setShowInput(true)} 
									className="border-[1px] text-[#80AFCF] text-center rounded-xl w-[15%] p-2 shadow-sm " >
									Add New +
								</button>:

								<div className="border-[1px] text-[#80AFCF] text-center rounded-xl p-1 shadow-sm  flex gap-10  ">
									<select 
										className="text-center border-[1px] rounded-lg" 
										onChange={e=>{
											if(!newSkills?.includes(e.target.value)&&!managerData?.skillset?.includes(e.target.value))
												return setNewSkills([...newSkills, e.target.value])
											else return
										}}>
										<option value="product">product</option>
										<option value="management">management</option>
										<option value="development">development</option>
										<option value="design">design</option>
										<option value="marketing">marketing</option>
									</select>

									{newSkills.map((skill,index)=>(
										<div className="border-[1px] rounded-lg p-2  text-center flex items-center relative">
											{skill}
										</div>
									))}
									
									<button 
										className="border-[1px] rounded-lg p-2 bg-main" 
										onClick={newSkillUpdate}>
											Update
									</button>
								</div>
							}

							{managerData?.skillset?.map((skill, index) => (
								<div
									key={index}
									className="text-center  bg-[#ffffff83] rounded-xl w-[15%] p-2 shadow-sm  text-[#898989] flex items-center justify-center">
									{skill}
								</div>
							))}
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile