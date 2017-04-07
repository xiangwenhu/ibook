import React from 'react'
import ReactDOM from 'react-dom'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { getBaseUrl } from '../utils/apiProxy'
import storageConfig from '../config/storageConfig'
import fileService from '../utils/fileService'



export default class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uploading: false,
            progress: 0,
            finishedOrError: false,
            startTime: null,
            speedSummary: null,
            fileService: fileService.getInstance(),
        }
        this.upload = this.upload.bind(this)
    }

    //上传文件
    upload() {
        if (this.state.fileService) {

            let refFile = ReactDOM.findDOMNode(this.refFile)
            if (!this.validateFile(refFile.files ? refFile.files[0] : null)) {
                return
            }
            let file = refFile.files[0]
            this.state.fileService.doesFileExist(storageConfig.FileShare, storageConfig.Directory, file.name, {}, (error, result, response) => {
                if (error){
                    alert(error)
                }else{
                    result && result.exists ?  this.props.onUploaded({ url: file.name }) : this.executeUpload(file)
                }

            })


        }
    }

    executeUpload(file) {
        this.setState({
            startTime: new Date(),
            uploading: true
        })
        var fileStream = new FileStream(file)

        let speedSummary = this.state.fileService.createFileFromStream(storageConfig.FileShare, storageConfig.Directory, file.name, fileStream, file.size, {}, (error, result, response) => {
            if (error) {
                alert(error)
            } else {
                this.props.onUploaded({ url: file.name })
            }
            clearInterval(this.state.tickets)
        })
        this.setState({
            speedSummary: speedSummary
        })
        this.refreshProgress()
    }


    refreshProgress() {
        let tickets = setInterval(() => {
            if (!this.state.finishedOrError) {
                var progress = this.state.speedSummary.getCompletePercent()
                this.setState({
                    progress: progress
                })
            }
        }, 500)
        this.setState({
            tickets: tickets
        })
    }



    validateFile(file) {
        if (file) {
            //检查大小
            if ((file.size / (1024 * 1024)).toFixed(2) > 100) {
                alert('上传文件大小上线为100M')
                return false
            }
            //检查文件类型
            if (file.type.toLowerCase() != 'application/pdf') {
                alert('电子书必须为pdf格式')
                return false
            }
            return true
        } else {
            alert('未选择上传文件')
            return false
        }
    }


    render() {
        let timing = this.state.uploading && ~~(((new Date()).getTime() - this.state.startTime.getTime()) / 1000)
        return (
            <div>
                <form name="uploadForm" encType="multipart/form-data">
                    <FormGroup controlId='formControlsFile'>
                        <FormControl type="file" accept="application/pdf" name="files" ref={ref => this.refFile = ref} />
                        {this.state.uploading ? <div id="progress">{this.state.progress}%  {timing}s</div> : null}
                        <Button onClick={this.upload}>上传</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}




Upload.propTypes = {
    onUploaded: React.PropTypes.func,
    maxSize: React.PropTypes.number,
    types: React.PropTypes.array
}

