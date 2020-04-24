import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';


class DeleteRecipe extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            id:0
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.id!=undefined || nextProps.id!=0)
        {
            this.setState({id:nextProps.id});
        }
    }
    DeleteCall()
    {
        this.props.onHide();
        this.props.Delete(this.state.id);
    }
    render() {
        return (
            <div>
              
              <Modal
            
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Recipe 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Enter Following Details</h4>
         </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
              <Button onClick={()=>{this.DeleteCall()}} className="btn btn-danger">Confirm Delete</Button>
            </Modal.Footer>
          </Modal>
     
            </div>
        );
    }
}

export default DeleteRecipe;
