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
    content: '',
    editing: false,
    _id: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    });
    if(this.props.match.params.id){
      const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
      console.log(res.data)
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected,
      date: this.state.date
    };
    if (this.state.editing) {
      await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
    } else {
      await axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/';
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
          <form onSubmit={this.onSubmit}>
          {/* SELECT THE USER */}
          <div className="form-group">
            <select
              className='form-control'
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
              required
            >
              {
                this.state.users.map(user =>
                  <option key={user} value={user} >
                    {user}
                  </option>)
              }
            </select>
          </div>
          {/* Note Title */}
          <div className="form-group">
            <input
              type="text"
              className='form-control'
              name="title"
              placeholder='Title'
              required
              onChange={this.onInputChange}
              value={this.state.title}
            />
          </div>
          {/* Note Content */}
          <div className="form-group">
            <textarea
              name="content"
              className='form-control'
              placeholder='content'
              required
              onChange={this.onInputChange}
              value={this.state.content}
            >
            </textarea>
          </div>
          {/* Note Date */}
          <div className="form-group">
            <DatePicker 
              className='form-control'
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          {/* Boton Submit */}
          <button type='submit' className='btn btn-info'>Save Note</button>
          </form>
        </div>
      </div>
    )
  }
}
