import React from 'react'
import Topbar from './Topbar'
import Menu from './Menu'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
    <Topbar/>
    <Menu/>
    <main>{children}</main>
    <Footer/>
    </>
  )
}

export default Layout