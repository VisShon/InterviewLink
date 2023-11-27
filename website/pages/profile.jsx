import Head from 'next/head'
import Timings from '@/components/Timings'
import GetInterviewer from '@/apollo/query/getInterviewer.graphql'
import ProfileInfoPanel from '@/components/ProfileInfoPanel'
// import BasicDetails from '@/components/BasicDetails'
import nProgress from 'nprogress'
import { decode } from 'jsonwebtoken'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

  // BasicDetails.js
  // BasicDetails.js
const BasicDetails = ({ name, role, location, email, contactNo }) => {
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
			  <strong>Location:</strong> {location}
			</div>
			<div className='ml-6'>
			  <strong>Email:</strong> {email}
			</div>
			<div className='ml-6'>
			  <strong>Contact No.:</strong> {contactNo}
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
  const WorkExperienceSection = () => {
	return (
		<div className="flex flex-col w-full sticky top-7">
		  <div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Skills</h1>
		  </div>
		  <div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Experience</h1>
		  </div>
		</div>
	  );
  };
  
  // EducationDetailsSection.js
  const EducationDetailsSection = () => {
	return (
		<div className="flex justify-between items-center text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Most Recent Education</h1>
			<button className="border-[1px] text-[#80AFCF] rounded-full p-3">{" Add New + "}</button>
      	</div>
	);
  };
  
  // ProjectsSection.js
  const ProjectsSection = () => {
	return (
		<div className="flex justify-between items-center text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Projects</h1>
			<button className="border-[1px] text-[#80AFCF] rounded-full p-3">{" Add New + "}</button>
      	</div>
	);
  };
  
  // ResumeDocsSection.js
  const ResumeDocsSection = () => {
	return (
		<div className="flex flex-col w-full sticky top-7">
		  <div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Resumes</h1>
		  </div>
		  <div className="justify-center items-left text-left relative bg-[#ffffff83] rounded-xl w-full p-5 shadow-sm my-3 text-[#898989]">
			<h1 className="text-main font-bold text-xl ml-3 mb-3">Certificates</h1>
		  </div>
		</div>
	  );
  };
  

export default function Profile({id}) {
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
					/>
					)}
					{selectedButton === 'Work Experience' && (
						<WorkExperienceSection />
					)}
					{selectedButton === 'Education Details' && (
						<EducationDetailsSection />
					)}
					{selectedButton === 'Projects' && (
						<ProjectsSection />
					)}
					{selectedButton === 'Resume, Docs & Write-ups' && (
						<ResumeDocsSection />
					)}
				</div>
			</div>
		</div>
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