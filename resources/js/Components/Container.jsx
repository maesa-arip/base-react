import React from 'react'

export default function Container({children}) {
    return (
      <div className="p-6 mx-auto bg-white border rounded">{children}</div>
    )
  }
