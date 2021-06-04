import React from 'react'
import { Redirect } from 'react-router'

const RedirectToDahboard = () => {
    return <Redirect to={'/dashboard'} />
}

export default RedirectToDahboard;