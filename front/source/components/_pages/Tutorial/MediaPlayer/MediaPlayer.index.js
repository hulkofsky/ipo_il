import React, { Component } from 'react'
import PropTypes from 'prop-types'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player'
import EndedScreen from './EndedScreen/EndedScreen.index'

import './MediaPlayer.style.styl'

class MediaPlayer extends Component {

  static propTypes = {
    // from parent component
    src: PropTypes.string
  }

  state = {
    playing: false,
    duration: 0,
    playedSeconds: 0,
    seeking: false,
    played: 0,
    volume: 0.3,
    flag: false,
    ended: false,
    visible: true
  }

  onPlay = () => this.setState({playing: true, ended: false})

  onPause = () => this.setState({playing: false})

  handleTogglePlayPause = event => {
    event && event.preventDefault && event.preventDefault()
    this.setState(prevState => ({playing: !prevState.playing}))
  }

  playerBox = undefined
  setPlayerBoxRef = node => this.playerBox = node

  handleToggleFullScreen = event => {
    event && event.preventDefault && event.preventDefault()
    screenfull.toggle(this.playerBox)
  }

  onDuration = duration => this.setState({duration})

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onSeekMouseDown = () => this.setState({seeking: true})

  onSeekChange = value => this.setState({played: parseFloat(value)})

  player = undefined
  setPlayerRef = node => this.player = node

  onSeekMouseUp = value => {
    this.setState({seeking: false})
    this.player.seekTo(parseFloat(value))
  }

  setVolume = value => this.setState({volume: value})
  onVolumeMouseDown = () => this.setState({flag: true})
  onVolumeMouseUp = () => this.setState({flag: false})

  onEnded = () => this.setState(prevState => ({ended: !prevState.ended}))
  replayPlay = () => this.player.seekTo(0)

  onVisible = () => this.setState({visible: true})
  onHide = () => this.setState({visible: false})

  getVideoId = (src) => {
    let videoId = src.split(`v=`)[1]
    const questionMarkPosition = videoId.indexOf(`?`)

    if (questionMarkPosition !== -1) {
      videoId = videoId.substring(0, questionMarkPosition)
    }

    return videoId
  }

  getVideoUrl = (src) => {
    const firstPart = '//www.youtube.com/embed/'
    const secondPart = `?showinfo=0&enablejsapi=1&origin=${window.location.href}`
    return firstPart + this.getVideoId(src) + secondPart
  }

  renderPage = () => {
    const {src} = this.props
    const {playing, volume, ended} = this.state

    if (!src) return null
    return (
      <div className="media-player__inner"
        ref={this.setPlayerBoxRef}
        onMouseEnter={this.onVisible}
        onMouseLeave={this.onHide}
      >
        <ReactPlayer className="media-player__screen"
          width={`100%`}
          height={`100%`}
          ref={this.setPlayerRef}
          url={this.getVideoUrl(src)}
          playing={playing}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onDuration={this.onDuration}
          onProgress={this.onProgress}
          volume={volume}
          onEnded={this.onEnded}
          controls
        />
        {ended && <EndedScreen funcPlay={this.onPlay} cbReplay={this.replayPlay} />}
      </div>
    )
  }

  render() {
    return (
      <div className="media-player">
        {this.renderPage()}
      </div>
    )
  }

}

export default MediaPlayer
