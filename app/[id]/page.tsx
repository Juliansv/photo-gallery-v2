import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
	return <div>page: {params.id}</div>;
}

export default Page