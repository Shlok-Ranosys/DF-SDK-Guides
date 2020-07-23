import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DfVideo from 'data-fornix-web-video-liveliness';
import { CONSTANT } from './../constants/index';
import Loader from './loader';

const style = `
    .videoMain {
        background-color: lightgray;
    }
    .videoMain button.btn {
        background-color: #ff0000;
    }

    .videoMain button.record-btn {
        background-color: green;
    }
`;

class Videoliveliness extends Component {
    dataFornixVideoObj = '';

    constructor(props) {
        super(props);
        let user_id;

        this.state = {
            currentModule: 'Video Liveliness',
            showLoader: true,
            videoObject: ''
        };

        this.videoLiveLinessSDK = this.videoLiveLinessSDK.bind(this);
        this.videoObjectHandler = this.videoObjectHandler.bind(this);
        this.clearVideoSdkState = this.clearVideoSdkState.bind(this);
    }

    componentDidMount() {
        this.videoLiveLinessSDK();
    }

    componentWillUnmount() {
        this.clearVideoSdkState();
    }

    clearVideoSdkState() {
        if (this.dataFornixVideoObj) {
            this.dataFornixVideoObj.clearState();
        }
    }

    getResMessage(res) {
        let message = res;
        if (res && typeof res === 'object' && Object.keys(res).length) {
            Object.keys(res).forEach(function (key) {
                message = key + ':' + res[key];
            });
        }
        return message;
    }

    videoObjectHandler(obj) {
        if (obj.status) {
            console.log(obj);
            alert('Please check video object in console');
        } else {
            // alert('Text match error');
            this.videoRetry('Text match error');
        }
    }

    videoRetry(msg) {
        const confirmRes = window.confirm(msg);
        if (confirmRes || !confirmRes) {
            if (this.dataFornixVideoObj) {
                this.dataFornixVideoObj.clearState();
                this.videoLiveLinessSDK();
            }
        }
    }

    videoLiveLinessSDK() {
        this.setState({
            showLoader: false
        });
        this.dataFornixVideoObj = new DfVideo({
            containerId: 'video-container',
            token: CONSTANT.SDK_TOKEN,
            style: style,
            onComplete: this.videoObjectHandler
        });
    }

    render() {
        return (
            <div>
                <label className="page-title">Data Fornix: {this.state.currentModule}</label>
                <div className="sidebar">
                    
                </div>
                <div className="sdk-container">
                    <div id="video-container"></div>
                </div>
                {this.state.showLoader && <Loader />}
            </div>
        );
    }
}

export default Videoliveliness;
