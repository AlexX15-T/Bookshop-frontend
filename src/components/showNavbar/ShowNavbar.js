import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const ShowNavbar = ({children}) => {

const location = useLocation()

const [showNav, setShowNav] = useState(true)

    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/*' || location.pathname === '/manager' || location.pathname === '/employee'
            || location.pathname === '/books/add' || location.pathname === '/books/edit/:id') {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }, [location])

  return (
    <div>{showNav && children}</div>
    )
}
  
export default ShowNavbar