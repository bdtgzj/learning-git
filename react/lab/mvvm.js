import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Mvvm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: 'null'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this.state.inputValue)
    this.setState({
      inputValue: 'dd'
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.inputValue} />
        <button onClick={this.handleClick}>click me</button>
      </div>
    )
  }

}

export default Mvvm

