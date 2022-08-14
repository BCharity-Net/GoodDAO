import React from 'react'

function HomepageItem(props: any) {
    return (
        //   <div className="bg-green-300 border-blue-600 border-4 p-4 m-4 rounded">Hello World</div>

        <div className='py-6 m-10 border-black border-4 border-r-4 bg-gray rounded-xl'>
            <h1 className='text-center'>{props.text}<br></br>{props.price}</h1>
        </div>
    )
}

export default HomepageItem