import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';



class AddRecipe extends Component {
    constructor(props)
    {
        super(props);
        var mydate = new Date().toLocaleDateString();
        var str = mydate.split('/');
        var mydate = `${str[2]}-${str[0]}-${str[1]}`;
        this.state = {
          recipename:"",
          ingredients:"",
          instructions:"",
          servingsize:0,
          category:"",
          notes:"",
          dateadded:mydate,
          datemodified:mydate
        };
        console.log(this.state);
    }
    saveDetails=(event)=>{
      var obj = {
        recipename:this.state.recipename,
        ingredients:this.state.ingredients,
        instructions:this.state.instructions,
        servingsize:this.state.servingsize,
        category:this.state.category,
        notes:this.state.notes,
        dateadded:this.state.dateadded,
        datemodified:this.state.datemodified
      };
      axios.post('http://127.0.0.1:8000/recipes/', obj)
	.then(res => console.log(res.data));
      
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
                Add Recipe
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Enter Following Details</h4>
              <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="recipename">
      <Form.Label>Enter Recipe Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Recipe Name" onChange={this.changerDetails}/>
    </Form.Group>
    <Form.Group as={Col} controlId="category">
      <Form.Label>Select Category</Form.Label>
      <Form.Control as="select"  onChange={this.changerDetails}>
        <option>Choose...</option>
        <option value="a">1</option>
        <option value="b">2</option>
        <option value="c">3</option>
      </Form.Control>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="ingredients">
    <Form.Label>Ingredients</Form.Label>
    <Form.Control as="textarea" rows="3"  onChange={this.changerDetails}/>
  </Form.Group>
  <Form.Group controlId="instructions">
    <Form.Label>Instructions</Form.Label>
    <Form.Control as="textarea" rows="3"  onChange={this.changerDetails}/>
  </Form.Group>

  <Form.Group controlId="notes">
    <Form.Label>Notes</Form.Label>
    <Form.Control as="textarea" rows="2" onChange={this.changerDetails} />
  </Form.Group>

    
  <Form.Group as={Col} controlId="servingsize">
      <Form.Label>Serving Size</Form.Label>
      <Form.Control type="number" placeholder="Enter Size"  onChange={this.changerDetails}/>
    </Form.Group>



  <Button variant="primary" type="button" onClick={this.saveDetails}>
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

export default AddRecipe;