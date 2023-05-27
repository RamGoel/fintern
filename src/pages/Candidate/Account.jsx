import React from 'react'
import { accountArray } from '../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
import './Candidate.css'
import { bgColor } from '../../utils/constants'
import logo from '../../assets/logo-fin.png'
function Account() {
    const location = useLocation()

    return (
        <div className='account-page' style={{
            backgroundColor: bgColor
        }}>
            <div>

                <img alt="jcjdcn" src={logo} width={100} />
                {
                    accountArray.map(e => {
                        return (e.isExternal)
                            ? <a
                                href={e.path(location.state.id)}
                                style={{ display: "block" }}>
                                <i className={`account-icon fa fa-${e.iconClass}`}></i>  {e.name}
                            </a>
                            : <Link
                                to={e.path(location.state.id)}
                                style={{ display: "block" }}>
                                <i className={`account-icon fa fa-${e.iconClass}`}></i>  {e.name}
                            </Link>
                    })
                }

                <p className='account-bottom'>v1.1 | @ramgoel</p>
                
            </div>
        </div>
    )
}

export default Account