import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 *   FaitChaud app
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Small app
 *
 *   PROPS
 *   - none -
 *
 */

export default class FaitChaud extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-fait-chaud'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c } = this
    
    /* Assign classes */
    const classes = [c]

    /* Display component */
    return <div className={classes.join(' ')}>
      Fait chaud
    </div>
  }
}

/* * * * * Prop types * * * * */
FaitChaud.propTypes = {
  prop: PropTypes.string
}

FaitChaud.defaultProps = {
  prop: null
}


