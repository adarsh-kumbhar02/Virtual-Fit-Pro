import React, { Children } from 'react'
import Sidebar from '../Sidebar/Sidebar'

const Container = (props) => {
  return (
    <div className='AppGlass'>
        <Sidebar/>
        {props.children}
    </div>
  )
}

export default Container