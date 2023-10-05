import Image from 'next/image'

function Search({ searchParam, setSearchParam }) {
	return (
		<div className="w-[35%] flex flex-col text-[grey] items-center z-20 fixed top-30 right-10">
			<input
				className="bg-[#d0d0d02a] p-2 rounded-full w-full glass border-none px-20"
				value={searchParam}
				onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
				placeholder=""
				type="search"
			/>
			<div className="absolute left-2 z-10 top-[20%] cursor-pointer">
				<Image
					className=''
					src={'/search.svg'}
					width={30}
					height={30}
					alt='vantage'
				/>
			</div>
		</div>
	)
}

export default Search
