import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import Notifications, { notify } from 'react-notify-toast'

import config from '../../config.js'
import Images from './Images'
import Buttons from './Buttons'

const toastColor = {
  background: '#505050',
  text: '#fff'
}

export default class TestUpload extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: false,
        uploading: false,
        images: []
      };
  }
  toast = notify.createShowQueue()

  onChange = e => {
    const errs = []
    console.log(e.target.files) // ok
    const files = Array.from(e.target.files) // ok Obj => Array
    console.log(files)

    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
      return this.toast(msg, 'custom', 2000, toastColor)
    }

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    files.forEach((file, i) => {
      console.log(file)
      console.log(i)
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      formData.append(i, file)
      console.log(formData)
    })

    console.log(formData)

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
    }

    this.setState({ uploading: true })

    const URL = config.serverUrl + '/image-upload'
    fetch(URL, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      console.log(res)
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then(images => {
      console.log(images)
      this.setState({
        uploading: false,
        images
      })
    })
    .catch(err => {
      console.log(err)
      // err.json().then(e => {
      //   this.toast(e.message, 'custom', 2000, toastColor)
      //   this.setState({ uploading: false })
      // })
    })
  }

  filter = id => {
    return this.state.images.filter(image =>
      image.public_id !== id
    )
  }
  removeImage = id => {
    this.setState({
      images: this.filter(id)
    })
  }
  onError = id => {
    this.toast('something went wrong.')
    this.setState({ images: this.filter(id) })
  }
  render() {
    const { loading, uploading, images } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <div> Uploading... </div>
        case images.length > 0:
          return <Images images = {images}
                         removeImage = {this.removeImage}
                         onError = {this.onError} />
        default:
          return <Buttons onChange = {(e) => this.onChange(e)} />
      }
    }


    return(
      <div className="test-wrapper">
        <Notifications />
        <div className="buttons">
          { content() }
        </div>
      </div>
    )
  }
}
