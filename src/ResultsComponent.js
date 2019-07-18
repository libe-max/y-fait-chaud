import React, { Component } from 'react'
import ResultBar from './ResultBar'
import moment from 'moment'

export default class ResultsComponent extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-fait-chaud__heatmap'
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
    const loBound = props.data.length
      ? moment(Math.min(...props.data.map(day => parseInt(day.day, 10))), 'x')
      : null
    const hiBound = props.data.length
      ? moment(Math.max(...props.data.map(day => parseInt(day.day, 10))), 'x')
      : null
    if (!loBound || !hiBound) return <div className={classes.join(' ')} />
    
    const daysSpan = hiBound.diff(loBound, 'days') + 1
    const daysTable = new Array(daysSpan).fill(0).map((e, i) => {
      const middayThatDay = moment(loBound.format('x'), 'x')
        .add(i, 'days')
        .startOf('day')
        .add(12, 'hours')
      const dayData = props.data.find(day => day.day === middayThatDay.format('x')) || {
        day: middayThatDay.format('x'),
        votes: [0, 0, 0, 0]
      }
      const nbOfVotes = dayData.votes[0] + dayData.votes[1] + dayData.votes[2] + dayData.votes[3]
      let score = 0 * dayData.votes[0]
      score += 1/3 * dayData.votes[1]
      score += 2/3 * dayData.votes[2]
      score += 1 * dayData.votes[3]
      score /= nbOfVotes || 1
      return {
        day: dayData.day,
        score
      }
    })

    /* Display component */
    return <div className={classes.join(' ')}>{
      daysTable.map(day => {
        return <ResultBar
          key={day.day}
          value={day.score}
          day={day.day} />
      })
    }</div>
  }
}
