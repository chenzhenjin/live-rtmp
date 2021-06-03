import React from 'react'
import propTypes from 'prop-types'
const Case = function (props) {
  console.log('Case props', props.children)
  return <div onClick={() => props['click'](props.children)}>
    {props.children}
  </div>
}
Case.propTypes = {
  if: propTypes.bool,
  elseif: propTypes.bool,
  else: propTypes.bool,
}
const When = function (props) {
  console.log('When props', props.children)
  let ifChildren = props.children.filter(item => {
    if (item.props.if) {
      return item
    }
  })
  if (ifChildren.length) {
    return <>
      {ifChildren}
    </>
  }
  let elseifChildren = props.children.filter(item => {
    if (item.props.elseif) {
      return item
    }
  })
  if (elseifChildren.length) {
    return <>
      {elseifChildren}
    </>
  }
  return <>
    {props.children.filter(item => {
      if (item.props.else) {
        return item
      }
    })}
  </>
}
export {
  When,
  Case
}