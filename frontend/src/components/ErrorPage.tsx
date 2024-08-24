import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div>
      Are you lost go <Link to={'/'}>HOME</Link>
    </div>
  )
}
