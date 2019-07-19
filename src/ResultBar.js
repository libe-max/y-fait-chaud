import React, { Component } from 'react'
import chroma from 'chroma-js'
import moment from 'moment'
import 'moment/locale/fr'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

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
    const scale = chroma.scale(['#FCE2D7', '#E30613']).mode('lab')
    const color = scale(props.value).hex()

    /* Display component */
    return <div className={classes.join(' ')} style={{backgroundColor: color}}>
      <div className={`${c}__tooltip`}>
        <div className={`${c}__day`}><Paragraph>{moment(props.day, 'x').format('DD MMMM YYYY')}</Paragraph></div>
        <div className={`${c}__value`}><Paragraph>{(props.label || ' ').replace(/\s/, ' ')} {Math.round(props.realValue * 100) / 10}</Paragraph></div>
        <div className={`${c}__votes`}><Paragraph small>({props.votes} votants)</Paragraph></div>
      </div>
    </div>
  }
}
