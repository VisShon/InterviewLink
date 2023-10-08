import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const Initalize = () => {
	const link = createHttpLink({
		uri: '/api/graphql',
		credentials: 'same-origin'
	  });
	  
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link,
	});
	

	return client
}