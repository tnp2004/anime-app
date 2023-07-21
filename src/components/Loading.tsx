import React from 'react'
import '../loading.css'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="lds-ring my-5"><div></div><div></div><div></div><div></div></div>
  )
}

export default Loading