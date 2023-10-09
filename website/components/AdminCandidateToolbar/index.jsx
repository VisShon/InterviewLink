import GoButton from "./GoButton"
import NoGoButton from "./NoGoButton"


function AdminToolbar({id,track}){
	return (
		<div className="flex gap-10 w-[85%] items-center">
				<GoButton 
					id={id}
					track={track}
				/>
				<NoGoButton
					id={id}
				/>
		</div>
	)
}

export default AdminToolbar