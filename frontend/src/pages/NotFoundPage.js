import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div>
            <h1>404 NOT FOUND</h1>
            <Link to="/">Go To Home</Link>
        </div>
    )
}

export default NotFoundPage
