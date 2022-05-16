import React from 'react'

const ERTable = (props) => {
  return (
    <button className={`btn btn--${props.kind} CTA`}
            data-id={props.id}
            type={props.type}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
    >
      <h4>{props.label}</h4>
    </button>
  )
}

export default ERTable