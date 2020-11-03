import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem , Button, Modal, ModalBody,ModalHeader, Row, Col, Label} from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';  
import { Link } from 'react-router-dom';
import '../App.css';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        
        this.toggleModal= this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        
        return(
            
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg" /> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"
                                className="form-control block"
                                validators={
                                    required
                                }>
                                <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </Control.select>
                                </Col>   
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>First Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control" rows="6"
                                        validators={{
                                            required
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" value="Submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        

                    </ModalBody>
                </Modal>
                </div>
            );
    }
    
}
function RenderDish({dish}){
    if (dish != null)
            return(
                <Card>
                    <CardImg top src={baseUrl+ dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle className="Title">{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>);
}
function RenderComments({comments, addComment, dishId}){
    if(comments!=null){
        const commentlist=comments.map((entry)=>
        <li key={entry.id}>
           <br /> {entry.comment}<br />
            --{entry.author}, {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(entry.date)))}<br />
        </li>
        );
    return(
        <div>
        <h4>Comments</h4><br />
        <ul className="list-unstyled">
        {commentlist}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );}
    else
    return(<div></div>);
}
const DishDetail=(props)=>{
    
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
    return(
    <div className="container">
        <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
    <div className="row">
        <div  className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <br /> <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
        </div>
    </div>
    </div>);

}

export default DishDetail;