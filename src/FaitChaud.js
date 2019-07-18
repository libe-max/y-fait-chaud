import React, { Component } from 'react'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import PageTitle from 'libe-components/lib/text-levels/PageTitle'
import ResultsComponent from './ResultsComponent'

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
    this.state = {
      loading_sheet: false,
      loading_results: false,
      error: null,
      sheetData: {},
      results: [],
      page: 'buttons'
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
    this.fetchCredentials = this.fetchCredentials.bind(this)
    this.parseSheet = this.parseSheet.bind(this)
    this.submitData = this.submitData.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.fetchCredentials()
    this.fetchResults()
    this.fetchSheet()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH CREDENTIALS
   *
   * * * * * * * * * * * * * * * * */
  fetchCredentials () {
    const api = this.props.api_url
    window.fetch(api, {
      method: 'POST'
    }).then(r => r.json()).then(res => {
      window.lblb_tracking = res._credentials.lblb_tracking
      window.lblb_posting = res._credentials.lblb_posting
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH RESULTS
   *
   * * * * * * * * * * * * * * * * */
  fetchResults () {
    const resultsUrl = `${this.props.api_url}/fait-chaud/results`
    this.setState({ loading_results: true })
    window.fetch(resultsUrl, {
      method: 'POST'
    }).then(r => r.json()).then(res => {
      this.setState({
        loading_results: false,
        results: res.data
      })
    }).catch(e => {
      console.error(e)
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH SHEET
   *
   * * * * * * * * * * * * * * * * */
  fetchSheet () {
    const { spreadsheet } = this.props
    this.setState({ loading_sheet: true })
    window.fetch(spreadsheet).then(r => r.text()).then(res => {
      const data = this.parseSheet(res)
      this.setState({
        loading_sheet: false,
        sheetData: data,
      })
    }).catch(err => {
      console.warn(err)
      this.setState({
        loading_sheet: false,
        error: err.message
      })
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * PARSE SHEET
   *
   * * * * * * * * * * * * * * * * */
  parseSheet (tsv) {
    const table = tsv.split('\n').map(pair => pair.split('\t'))
    const result = {}
    table.forEach(entry => result[entry[0]] = entry[1])
    return result
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SUBMIT DATA
   *
   * * * * * * * * * * * * * * * * */
  submitData (val) {
    this.setState({ loading_results: true })
    const postUrl = `${this.props.api_url}/fait-chaud/submit-vote`
    const postData = {
      vote: val,
      _credentials: {
        lblb_tracking: window.lblb_tracking,
        lblb_posting: window.lblb_posting
      }
    }
    window.fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    }).then(r => r.json()).then(res => {
      if (res.err) throw new Error(res.err)
      this.setState({
        loading_results: false,
        results: res.data,
        page: 'results'
      })
    }).catch(e => {
      this.setState({
        loading_results: false,
        error: e.message
      })
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, state } = this
    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet || state.loading_results) classes.push(`${c}_loading`)
    if (state.error) classes.push(`${c}_error`)
    if (state.page !== 'results') classes.push(`${c}_buttons-page`)
    else classes.push(`${c}_results-page`)

    /* Display component */
    return <div className={classes.join(' ')}>
      <div className={`${c}__loader`}><Loader /></div>
      <div className={`${c}__loading-error`}><LoadingError /></div>
      <div className={`${c}__content`}>
        <div className={`${c}__buttons`}>
          <PageTitle>{state.sheetData.title_1}</PageTitle>
          <button onClick={() => this.submitData(0)}>{state.sheetData.button_0}</button>
          <button onClick={() => this.submitData(1)}>{state.sheetData.button_1}</button>
          <button onClick={() => this.submitData(2)}>{state.sheetData.button_2}</button>
          <button onClick={() => this.submitData(3)}>{state.sheetData.button_3}</button>
        </div>
        <div className={`${c}__results`}>
          <PageTitle>{state.sheetData.title_2}</PageTitle>
          <ResultsComponent data={state.results} />
        </div>
      </div>
    </div>
  }
}
