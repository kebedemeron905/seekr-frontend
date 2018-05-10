import React, {Component} from 'react'

import Axios from 'axios'
import {CLIENT_URL} from '../constants.js'
import JobRows from './JobRows'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import './Main.css'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      jobs: [],
      companies: [],
      jobsApplied: [],
      jobsFirstContact: [],
      jobsInterview: [],
      jobsOffer: [],
      jobsRejected: []
    }
    this.updatePage = this.updatePage.bind(this)
  }

  componentDidMount () {
    this.updatePage()
  }

  updatePage () {
    Axios.get(`${CLIENT_URL}jobs`)
      .then((response) => {
        let jobsApplied = response.data.filter(job => job.job_status === 'Applied')
        let jobsFirstContact = response.data.filter(job => job.job_status === 'First Contact')
        let jobsInterview = response.data.filter(job => job.job_status === 'Interview')
        let jobsOffer = response.data.filter(job => job.job_status === 'Offer')
        let jobsRejected = response.data.filter(job => job.job_status === 'Rejected')
        this.setState({
          jobs: response.data,
          jobsApplied: jobsApplied,
          jobsFirstContact: jobsFirstContact,
          jobsInterview: jobsInterview,
          jobsOffer: jobsOffer,
          jobsRejected: jobsRejected
        })
      })
    Axios.get(`${CLIENT_URL}companies`)
      .then((response) => {
        this.setState({companies: response.data})
      })
  }

  render () {
    return (
      <div className='body'>
        <Navbar openNewJob={this.props.openNewJob} />
        <div className='grid-container'>
          <div>
            <JobRows openJobDetails={this.props.openJobDetails} filter='Applied' jobs={this.state.jobsApplied} companies={this.state.companies} />
            <JobRows openJobDetails={this.props.openJobDetails} filter='First Contact' jobs={this.state.jobsFirstContact} companies={this.state.companies} />
            <JobRows openJobDetails={this.props.openJobDetails} filter='Interview' jobs={this.state.jobsFirstContact} companies={this.state.companies} />
            <JobRows openJobDetails={this.props.openJobDetails} filter='Offer' jobs={this.state.jobsOffer} companies={this.state.companies} />
            <JobRows openJobDetails={this.props.openJobDetails} filter='Rejected' jobs={this.state.jobsRejected} companies={this.state.companies} />
          </div>
          <div>
            <Sidebar companies={this.state.companies} />
          </div>
        </div>
      </div>
    )
  }
}

export default Main
