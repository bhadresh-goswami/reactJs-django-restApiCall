import React, { Component } from 'react';

import {Button, ButtonToolbar} from 'react-bootstrap';
import AddRecipe from './addRecipe';
import EditData from './editData';
import DeleteRecipe from './deleteRecipe';
import axios from 'axios';
import {Modal, Row, Col, Form} from 'react-bootstrap';

class list extends Component {

    constructor(props)
    {
        super(props);
        var mydate = new Date().toLocaleDateString();
        var str = mydate.split('/');
        var mydate = `${str[2]}-${str[0]}-${str[1]}`;
        this.state = {
            list:[],
            disp:[],
            addModalShow:false,
            editModalShow:false,deleteShow:false,
            id:0,data:null,
        };
        this.saveDetails = this.saveDetails.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
       this.getData();
    }
    getData(){
        fetch('http://127.0.0.1:8000/recipes/?format=json')
        .then(response => {
            let d = response.json();
            //console.log(d);
            //alert(d);
  
            d.then(data=>{
                //console.log(data);
                this.setState({ list:data });
               
            })
  
      })
        .then(data => { 
            this.setState({ data:data });
            //console.log(data);
          });
    }
    DeleteIT(id){ 

        axios.delete('http://127.0.0.1:8000/recipes/?q='+id)
    .then(res => {console.log(res.data);
        //this.getData();
    }
    );
    }
    
    Edit(d){
        console.log(d);
      this.setState({
          id:d.id, editModalShow:true, data:d
      });
    }
  
    saveDetails(details){
        var mydate = new Date().toLocaleDateString();
        var str = mydate.split('/');
        mydate = `${str[2]}-${str[0]}-${str[1]}`;
      var obj = {
        id:details.id,
        recipename:details.recipename,
        ingredients:details.ingredients,
        instructions:details.instructions,
        servingsize:details.servingsize,
        category:details.category,
        notes:details.notes,
        dateadded:details.dateadded,
        datemodified:mydate
      };
      console.log(obj);
      axios.put('http://127.0.0.1:8000/recipes/?q='+details.id, obj)
    .then(res => {console.log(res.data);
        this.setState({editModalShow:false,data:null});
        this.getData();
    }
    );
      
    }
    retList=()=>
    {
        return this.state.list.map(d=>
            <tr>
            <td>{d.recipename}</td>
                <td>{d.ingredients}</td>
                <td>{d.instructions}</td>
                <td>{d.servingsize}</td>
                <td>{d.category}</td>
                <td>{d.notes}</td>
                <td>{d.dateadded}</td>
                <td>{d.datemodified}</td>
                <td><button onClick={() => this.setState({id:d.id,deleteShow:true})} className="btn btn-danger">Delete</button></td> <td>
                <ButtonToolbar>
                    <Button
                    onClick={()=>this.Edit(d)}>
                        Edit
                    </Button>
                </ButtonToolbar>
                </td>
            </tr>
        );
    }
    
    render() {
        let addModalClose = ()=>{
            this.setState({
                addModalShow:false
            });
        }
        return (

            <div className="row">
                <h1>Recipe List</h1><br/><br/>
              
                <table className="table" id="recipeTable">
                    <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                        <th>Serving Size</th>
                        <th>Recipe Category</th>
                        <th>Notes</th>
                        <th>Added Date</th>
                        <th>Modified Date</th>
                        <th colSpan="2"></th>
                    </tr>
                    </thead>
                    <tbody>
                {
                  this.retList()
                }
                </tbody>
                </table>
                <ButtonToolbar>
                    <Button
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Recipe
                    </Button>
                    <AddRecipe show={this.state.addModalShow} onHide={()=>this.setState({addModalShow:false})}></AddRecipe>
                </ButtonToolbar>
                <EditData saveDetails={this.saveDetails} show={this.state.editModalShow} editid={this.state.id} data={this.state.data} onHide={()=>this.setState({editModalShow:false})}></EditData>
                    <DeleteRecipe Delete={this.DeleteIT} id={this.state.id} show={this.state.deleteShow} onHide={()=>this.setState({deleteShow:false})}></DeleteRecipe>
            </div>
        );
    }
}

export default list;



