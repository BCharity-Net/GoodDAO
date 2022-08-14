import React from 'react'

function scrap() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <p className="text-green-500">The quick brown fox...</p>

				<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
					<div>
						<div className="text-xl font-medium text-red">ChitChat</div>
						<p className="text-red-500">You have a new message!</p>
					</div>
				</div>
        </>
    )
}



export default scrap