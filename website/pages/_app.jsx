import '@/styles/globals.css'
import { useState,  useEffect} from 'react'
import Nprogress from 'nprogress'
import Router from 'next/router'

import { ApolloProvider } from '@apollo/client'
import { Initalize } from '@/apollo/index'

import Navbar from '@/components/Navbar'


export default function App({ Component, pageProps }) {

	const [Apolloclient,setApolloclient]  = useState(Initalize())
	useEffect(()=>{
		const getApolloClient = async () =>{
			const client = await Initalize()
			setApolloclient(client)
		}
		getApolloClient()
	},[])

	useEffect(() => {
		Router.events.on("routeChangeStart",(url)=>{
			Nprogress.start()
		})
		Router.events.on("routeChangeComplete", (url)=>{
			Nprogress.done(false)
		})
		Router.events.on("routeChangeError", (url)=>{
			Nprogress.done(false)
		})
	},[Router])


	return (
		<>	
			<ApolloProvider client={Apolloclient}>
				<Navbar />
				<Component {...pageProps}/>
			</ApolloProvider>
		</>
	)
}
