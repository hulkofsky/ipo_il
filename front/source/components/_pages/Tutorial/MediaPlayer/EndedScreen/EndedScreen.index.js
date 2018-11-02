import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { hideOverlay } from '../../../../../redux/reducers/overlay.reducer'
import './EndedScreen.style.styl'
import replayIcon from './images/replay.svg'

EndedScreen.propTypes = {
  // from MediaPlayer.index
  funcPlay: PropTypes.func.isRequired,
  cbReplay: PropTypes.func.isRequired,
  // from react-router-dom
  history: PropTypes.object,
  hideOverlay: PropTypes.func
}

function EndedScreen(props) {
  const handleClick = () => {
    const {funcPlay, cbReplay} = props
    cbReplay()
    funcPlay()
  }

  const onButtonClick = () => {
    const {history, hideOverlay} = props
    window.localStorage.setItem(`video`, `don't show`)
    hideOverlay()
    history.replace(`/tutorial/description`)

  }

  return (
    <div className="media-player__end">
      <div className="media-player__box">
        <a href="#"
          className="media-player__btn-replay"
          onClick={handleClick}
        >
          <span className="media-player__btn-play-big-icon-box">
            <img src={replayIcon} alt="replay" />
          </span>
        </a>
        <button type="button"
          className="media-player__btn-delete"
          onClick = {onButtonClick}
        >
          do not show more
        </button>
      </div>
    </div>
  )

}

const mapStateToProps = null
const mapDispatchToProps = {hideOverlay}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EndedScreen)
)
