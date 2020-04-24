import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';



class EditData extends Component {
    constructor(props)
    {
        super(props);
        //console.log('http://127.0.0.1:8000/recipes/?q='+this.props.editid); 
        var mydate = new Date().toLocaleDateString();
        var str = mydate.split('/');
        mydate = `${str[2]}-${str[0]}-${str[1]}`;
        this.state = {
          recipename:"",
          ingredients:"",
          instructions:"",
          servingsize:0,
          category:"",
          notes:"",
          dateadded:"",
          datemodified:mydate,
          id:0
        };
        this.changerDetails = this.changerDetails.bind(this);
        this.callSave = this.callSave.bind(this);

        
       //console.log("Const");
    }
    getSetelcted(){
        return  this.state.category;
    }
    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps1 " + this.props.editdata.recipename);
        // console.log("componentWillReceiveProps2 " + this.props.editdata.servingsize);
        // let data = this.props.editdata;
        console.log("componentWillReceiveProps2 " + nextProps.data);

        if(nextProps.data!=undefined){
            let d = nextProps.data;
            console.log(d);
            this.setState ( {
                                recipename:d.recipename,
                                ingredients:d.ingredients,
                                instructions:d.instructions,
                                servingsize:d.servingsize,
                                servingsize:d.recipename,
                                notes:d.notes,
                                dateadded:d.dateadded,
                                datemodified:d.datemodified,
                                id:d.id
                              });
                              console.log(this.state)
      
        }
       
   

    }
    callSave(){
        const details = this.state;
        this.props.saveDetails(details);
    }
    changerDetails=e=>{
      this.setState({
        [e.target.id] : e.target.value
      });
      //console.log([e.target.value]);  
    }
    render() {
        
       

        
        return (
           
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
              <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="recipename">
      <Form.Label>Enter Recipe Name</Form.Label>
      <Form.Control type="text" onChange={this.changerDetails} value={this.state.recipename}/>
    </Form.Group>
    <Form.Group as={Col} controlId="category">
      <Form.Label>Select Category</Form.Label>
      <Form.Control as="select"   onChange={this.changerDetails}  value={this.state.category}>
        <option>Choose...</option>
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
      </Form.Control>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="ingredients">
    <Form.Label>Ingredients</Form.Label>
    <Form.Control as="textarea" rows="3"  onChange={this.changerDetails}  value={this.state.ingredients}/>
  </Form.Group>
  <Form.Group controlId="instructions">
    <Form.Label>Instructions</Form.Label>
    <Form.Control as="textarea" rows="3"  onChange={this.changerDetails}  value={this.state.instructions}/>
  </Form.Group>

  <Form.Group controlId="notes">
    <Form.Label>Notes</Form.Label>
    <Form.Control as="textarea" rows="2" onChange={this.changerDetails}  value={this.state.notes} />
  </Form.Group>

    
  <Form.Group as={Col} controlId="servingsize">
      <Form.Label>Serving Size</Form.Label>
      <Form.Control type="number" placeholder="Enter Size"  onChange={this.changerDetails}  value={this.state.servingsize}/>
    </Form.Group>



  <Button variant="primary" type="button" onClick={()=>{this.callSave()}}>
    Submit
  </Button>
</Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          
        );
    }
}

export default EditData;