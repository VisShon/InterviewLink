
function FeedbackResult({feedback}) {
	return (
		<main className="flex gap-10 bg-secondary w-full h-full rounded-2xl p-10 text-[black]">
			<div className="w-[45%]">
				<div>
					<p>Feedback</p>
					<input 
						className="p-2 border-2 border-[grey] rounded-md w-full"
						type="text" 
						value={feedback?.feedbackResponse}
					/>
				</div>

				<ul className="mt-10">
					<li>
						<div className="my-6 flex gap-5 text-[1.2rem] font-[200] items-center">
							<input
								type="checkbox"
								id={`custom-checkbox-1`}
								name='confidence'
								checked={feedback?.confidence}
							/>
							<label for={`custom-checkbox-1`}>
								confidence
							</label>
						</div>
					</li>

					<li>
						<div className="my-6 flex gap-5 text-[1.2rem] font-[200] items-center">
							<input
								type="checkbox"
								id={`custom-checkbox-2`}
								name='problem solving'
								checked={feedback?.problemSolving}
							/>
							<label for={`custom-checkbox-2`}>
								problem solving
							</label>
						</div>
					</li>

					<li>
						<div className="my-6 flex gap-5 text-[1.2rem] font-[200] items-center">
							<input
								type="checkbox"
								id={`custom-checkbox-3`}
								name='spoken skills'
								checked={feedback?.spokenSkills}
							/>
							<label for={`custom-checkbox-3`}>
								spoken skills
							</label>
						</div>
					</li>

					<li>
						<div className="my-6 flex gap-5 text-[1.2rem] font-[200] items-center">
							<input
								type="checkbox"
								id={`custom-checkbox-4`}
								name='teamwork'
								checked={feedback?.teamwork}
							/>
							<label for={`custom-checkbox-4`}>
								teamwork
							</label>
						</div>
					</li>

					<li>
						<div className="my-6 flex gap-5 text-[1.2rem] font-[200] items-center">
							<input
								type="checkbox"
								id={`custom-checkbox-5`}
								name='technical skills'
								checked={feedback?.technicalSkills}
							/>
							<label for={`custom-checkbox-5`}>
								technical skills
							</label>
						</div>
					</li>
				</ul>
			</div>

			<div className="w-[50%] h-[90%]">
				<p>Remark</p>
				<textarea 
					className="p-2 border-2 border-[grey] rounded-md w-full h-full"
					value={feedback?.feedbackDescription}
				/>
			</div>
		</main>
	)
}

export default FeedbackResult