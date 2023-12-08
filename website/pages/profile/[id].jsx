import Head from 'next/head'
import Timings from '@/components/Timings'
import GetInterviewer from '@/apollo/query/getInterviewer.graphql'
import ProfileInfoPanel from '@/components/ProfileInfoPanel'
import nProgress from 'nprogress'
import { decode } from 'jsonwebtoken'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client'


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
  
const BasicDetails = ({ name, role, location, email, employeeId }) => {
	return (
	  <div className="flex flex-col w-full sticky top-7">
		<div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
		  <h1 className="text-main font-bold text-xl mb-3 ml-3">About</h1>
		  <div className="flex flex-col space-y-2">
			<div className='ml-6'>
			  <strong>Name:</strong> {name}
			</div>
			<div className='ml-6'>
			  <strong>Role:</strong> {role}
			</div>
			<div className='ml-6'>
			  <strong>Location:</strong> {"Bengaluru"}
			</div>
			<div className='ml-6'>
			  <strong>Email:</strong> {email}
			</div>
			<div className='ml-6'>
			  <strong>Employee ID:</strong> {employeeId}
			</div>
		  </div>
		</div>
		<div className="flex justify-between items-center text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Summary</h1>
			<button className="border-[1px] text-[#80AFCF] rounded-full p-3">{" Add New + "}</button>
      	</div>
		<div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
		  <h1 className="text-main font-bold text-xl ml-3 mb-3">Interview Statistics</h1>
		</div>
	  </div>
	);
  };
  
  
  // WorkExperienceSection.js
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
		  <SectionWithAddNew title="Skills" onAddNew={handleAddNew}>
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
				className="flex justify-between items-center text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]"
			  >
				<div>{skill}</div>
			  </div>
			))}
		  </SectionWithAddNew>
		  <SectionWithAddNew title="Work Experience"></SectionWithAddNew>
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
		<div>
			<div className='flex w-full p-10'>
				<div className='flex flex-col w-[30%] px-8 relative'>
					<ProfileInfoPanel
						image={managerData?.image} 
						name={managerData?.userName} 
						role={managerData?.role}
						skills={managerData?.skillset}
						selectedButton={selectedButton}
            			setSelectedButton={setSelectedButton}
					/>
				</div>

				<div className='flex flex-col w-[70%] px-8'>
					{selectedButton === 'Basic Details' && (
					<BasicDetails
						name={managerData?.userName}
						role={managerData?.role}
						// location={managerData?.location}
						email={managerData?.email}
						// contactNo={managerData?.contactNo}
						employeeId={managerData?.id}
					/>
					)}
					{selectedButton === 'Work Experience' && (
						<WorkExperienceSection
							skills={managerData?.skillset} />
					)}
					{selectedButton === 'Education Details' && (
						<SectionWithAddNew title="Most Recent Education"></SectionWithAddNew>
					)}
					{selectedButton === 'Projects' && (
						<SectionWithAddNew title="Projects"></SectionWithAddNew>
					)}
					{selectedButton === 'Resume, Docs & Write-ups' && (
						<div className="flex flex-col w-full sticky top-7">
							<SectionWithAddNew title="Resumes"></SectionWithAddNew>
							<SectionWithAddNew title="Documents/Certificates"></SectionWithAddNew>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Profile