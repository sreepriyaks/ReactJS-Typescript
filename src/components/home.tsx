import * as React from 'react';
import axios from 'axios';
import IProps from '../interfaces/props.interface';
import { convertImageToBase64 } from '../utilities';

export class Home extends React.Component<
  IProps,
  { selectedFile: any; imageFileName: string }
> {
  constructor(props: any, context: any) {
    super(props, context);
    this.fileSelected = this.fileSelected.bind(this);
    this.uploadFile = this.uploadFile.bind(this);

    this.state = {
      selectedFile: null,
      imageFileName: 'Choose File'
    };
  }

  //Uploaded image is converted to Base64 encoded url.
  fileSelected(event) {
    event.preventDefault();
    this.setState({ imageFileName: event.target.files[0].name });
    convertImageToBase64(event.target.files[0])
      .then(result => {
        let imageUrl = result;
        this.setState({ selectedFile: imageUrl });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //Simple api call that accepts the base 64 encoded url and saves it to the db
  uploadFile(event) {
    let uploadedProgress: number;
    event.preventDefault();
    axios
      .post(
        'http://localhost:3002/file',
        {
          image: this.state.selectedFile
        },
        {
          //can be used to show a progress bar
          onUploadProgress: progressEvent => {
            uploadedProgress =
              (progressEvent.loaded / progressEvent.total) * 100;
          }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="custom-file mt-3">
          <input
            type="file"
            id={this.props.fileId}
            className="custom-file-input"
            onChange={this.fileSelected}
          />
          <label className="custom-file-label">
            {this.state.imageFileName}
          </label>
        </div>
        <button
          className="btn btn-info mt-3 float-right"
          onClick={this.uploadFile}
        >
          Upload
        </button>
      </div>
    );
  }
}
