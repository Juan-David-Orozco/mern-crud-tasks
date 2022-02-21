import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {

  state = {
    users: [],
    userSelected: '',
    date: new Date(),
    title: '',
    content: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({
      users: res.data.map(user => user.username)
    });
    //console.log(this.state.users)
  }

  onSubmit = (e) => {

    console.log(this.state.title, this.state.content)
    e.preventDefault()

  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onChangeDate = (date) => {
    this.setState({date})
  }


  render() {
    return (
      <div className="col-md-6 mx-auto">
        <div className="card card-body">
          <h3>Create Note</h3>

          {/* SELECT THE USER */}
          <div className="form-group">
            <select
              className='form-control'
              name="UserSelected"
              onChange={this.onInputChange}
            >
              {
                this.state.users.map(user =>
                  <option key={user} value={user} >
                    {user}
                  </option>)
              }
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className='form-control'
              name="title"
              placeholder='Title'
              required
              onChange={this.onInputChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="content"
              className='form-control'
              placeholder='content'
              required
              onChange={this.onInputChange}
            >
            </textarea>
          </div>

          <div className="form-group">
            <DatePicker 
              className='form-control'
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <form onSubmit={this.onSubmit}>

            <button type='submit' className='btn btn-info'>Save Note</button>
          </form>
        </div>
      </div>
    )
  }
}
