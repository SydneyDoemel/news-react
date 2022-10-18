import React, { Component } from 'react'

export default class MOdal extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            modalState: true
        };
    
        this.handleShow = this.handleShow.bind(this);
    }
    
    handleShow() {
        this.setState({ modalState: !this.state.modalState });
    }
    
    render() {
        return (
            <div>
                <div className={"modal fade" + (this.state.modalState ? " show d-block" : " d-none")} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Welcome to Dispatched!</h5>
                                
                            </div>
                            <div className="modal-body">Add categories you would like to see in your news feed.<br></br> You can add custom categories in the search bar. </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary btn-modal-close" onClick={this.handleShow}>Got it!</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }}