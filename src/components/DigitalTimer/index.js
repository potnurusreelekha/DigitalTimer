// Write your code here
import {Component} from 'react'
import './index.css'

const initialstate = {
  isTimerRunning: false,
  timeElapseInSeconds: 0,
  timerLimit: 25,
}

class DigitalTimer extends Component {
  state = initialstate

  componentWillUnMount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimit = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
    }
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  renderTimerLimitController = () => {
    const {timerLimit, timeElapseInSeconds} = this.state
    const isButtonDisabled = timeElapseInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            onClick={this.onDecreaseTimerLimit}
            type="button"
            className="limit-button"
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div className="limit-value-controller">
            <p className="limit-value">{timerLimit}</p>
          </div>
          <button
            onClick={this.onIncreaseTimerLimit}
            type="button"
            className="limit-button"
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialstate)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapseInSeconds, timerLimit} = this.state
    const isTimerCompleted = timeElapseInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapseInSeconds: prevState.timeElapseInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapseInSeconds, timerLimit} = this.state
    const isTimerCompleted = timeElapseInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapseInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller">
        <button
          className="timer-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button type="button" className="reset-btn" onClick={this.onResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-img"
          />
          <p className="reset-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedInSecondsInTimeFormat = () => {
    const {timerLimit, timeElapseInSeconds} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timeElapseInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedInSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimeController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
