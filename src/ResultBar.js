import React, { Component } from 'react'
import chroma from 'chroma-js'

export default class ResultBar extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-fait-chaud__result-bar'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this
    
    /* Assign classes */
    const classes = [c]

    /* Inner logic */
    const scale = chroma.scale(['white', 'red']).mode('lab')
    const color = scale(props.value).hex()

    /* Display component */
    return <div className={classes.join(' ')} style={{backgroundColor: color}}>
      Chaud à {Math.round(props.value * 100) / 100} %
    </div>
  }
}
