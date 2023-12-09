import GetInterviewer from '@/apollo/query/getInterviewer.graphql'
import nProgress from 'nprogress'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client'
import ManagerInfoPanel from '@/components/ManagerInfoPanel'


const SectionWithAddNew = ({ title, onAddNew, children }) => {
	return (
		<div className="flex justify-between items-center text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
		<h1 className="text-main font-bold text-xl ml-3 mb-3">{title}</h1>
		<button className="border-[1px] text-[#80AFCF] rounded-full p-3" onClick={onAddNew}>
			{" Add New + "}
		</button>
		{children}
		</div>
	);
};

  
  
  
const WorkExperienceSection = ({skills}) => {

	const [showInput, setShowInput] = useState(false);
	const [newSkill, setNewSkill] = useState('');
	const [skillsList, setSkillsList] = useState(skills || []);

	const handleAddNew = () => {
		setShowInput(true);
	};

	const handleInputKeyPress = (event) => {
		if (event.key === 'Enter' && newSkill.trim() !== '') {
		setSkillsList([...skillsList, newSkill]);
		setNewSkill('');
		}
	};


	return (
		<div className="flex flex-col w-full sticky top-7">
			<SectionWithAddNew 
				title="Skills" 
				onAddNew={handleAddNew}>

				{showInput && (
					<input
						type="text"
						placeholder="Enter new skill"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						onKeyPress={handleInputKeyPress}
					/>
				)}
		
				{skills?.map((skill, index) => (
					<div
						key={index}
						className="flex justify-between items-center text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
						<div>{skill}</div>
					</div>
				))}

			</SectionWithAddNew>
		</div>

	  );
  };
  

function Profile() {
	const router = useRouter();
	const {id} = router.query;

	const [managerData, setManagerData] = useState()
	const [selectedButton, setSelectedButton] = useState('Basic Details');
	const { loading, error, data } = useQuery(GetInterviewer,{
		variables:{
			where: {
			  id: id
			}
		}
	})

	console.log(data)

	useEffect(() => {
		if(loading){
			nProgress.start()
		}
		if(!loading){
			nProgress.done(false)
			setManagerData(data?.interviewers?.at(0))
		}
		if(error){
			nProgress.done(false)
		}
	},[loading])


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
							<div className="flex flex-col w-full sticky top-7">
								<div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
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

					<WorkExperienceSection 
						skills={managerData?.skillset} 
					/>
				</div>
			</div>
		</div>
	)
}

export default Profile