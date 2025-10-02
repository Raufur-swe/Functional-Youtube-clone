import React from 'react'
import './Navber.css'
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link } from 'react-router-dom';

const Navber = ({setSidebar}) => {
    return (
        //navber
        <nav className="flex-div">
            {/* nav-left */}
            <div className='nav-left flex-div' >
                <img className='menu-icon' onClick={()=>setSidebar(prev=>!prev)} src={menu_icon} alt="" />
                <Link to='/'>
                <img className='logo' src={logo} alt="" />
                </Link>
            </div>
            {/* nav-moddle */}

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">

                <input className='search-bar' type="text" placeholder='Search' />
                <img className='search-icon' src={search_icon} alt="" />
                </div>
            </div>
            {/* nav-right */}

            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} className='user-icon' alt="" />
            </div>
        </nav>
    )
}

export default Navber;