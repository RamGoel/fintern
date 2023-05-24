import React from 'react'
import { accountArray } from '../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
function Account() {
    const location = useLocation()

    return (
        <div>
            <h3>Accounts Section</h3>
            {
                accountArray.map(e => {
                    return (e.isExternal)
                        ? <a
                            href={e.path(location.state.id)}
                            style={{ display: "block" }}>
                            {e.name}
                        </a>
                        : <Link
                            to={e.path(location.state.id)}
                            style={{ display: "block" }}>
                            {e.name}
                        </Link>
                })
            }
        </div>
    )
}

export default Account