import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'

function Layout({ children }) {
    return (
        <div className='w-full justify-between flex'>
            <LeftSideBar></LeftSideBar>
            {children}
            <RightSideBar></RightSideBar>
        </div>
    )
}

export default Layout