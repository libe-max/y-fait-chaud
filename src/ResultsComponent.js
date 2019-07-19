import React, { Component } from 'react'
import ResultBar from './ResultBar'
import moment from 'moment'
import BlockTitle from 'libe-components/lib/text-levels/BlockTitle'

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
    
    /* Assign score for every day */
    const daysSpan = hiBound.diff(loBound, 'days') + 1
    const daysTable = new Array(daysSpan).fill(0).map((e, i) => {
      const middayThatDay = moment(loBound.format('x'), 'x')
        .add(i, 'days')
        .startOf('day')
        .add(12, 'hours')
      const dayData = props.data.find(day => moment(day.day, 'x').format('YYYYMMDD') === middayThatDay.format('YYYYMMDD')) || {
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
        score,
        votes: nbOfVotes
      }
    })

    /* Find min and max val (excl 0) */
    const minVal = daysTable.length
      ? Math.min(...daysTable.map(day => day.score).filter(s => s))
      : null
    const maxVal = daysTable.length
      ? Math.max(...daysTable.map(day => day.score).filter(s => s))
      : null

    /* Re-assign score */
    const temperedDaysTable = daysTable.map(day => {
      return {
        day: day.day,
        score: (day.score - minVal) / (maxVal - minVal),
        real_score: day.score,
        votes: day.votes
      }
    })

    const todayScore = temperedDaysTable.find(day => {
      const thatDayDate = moment(day.day, 'x').format('YYYYMMDD')
      const todayDate = moment().format('YYYYMMDD')
      return thatDayDate === todayDate
    }).real_score

    /* Display component */
    return <div className={classes.join(' ')}>
      <div className={`${c}__bars`}>{
        temperedDaysTable.map((day, i) => {
          return <ResultBar
            key={day.day}
            value={day.score}
            realValue={day.real_score}
            votes={day.votes}
            label={props.tooltip}
            day={day.day} />
        })}
      </div>
      <div className={`${c}__today`}>
        <BlockTitle>{props.label} {Math.round(todayScore * 100) / 10}</BlockTitle>
      </div>
    </div>
  }
}
