import React from 'react';
import { Card , CardImg, CardBody,CardText, CardTitle } from 'reactstrap';
import '../App.css';

    
function RenderDish({dish}){
    if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
function RenderComments({Comments}){
    if(Comments!=null){
        const commentlist=Comments.map((entry)=>
        <li key={entry.id}>
           <br /> {entry.comment}<br />
            --{entry.author}, {entry.date}<br />
        </li>
        );
    return(
        <div>
        <h4>Comments</h4><br />
        <ul className="list-unstyled">
        {commentlist}
        </ul>
        </div>
    );}
    else
    return(<div></div>);
}
const DishDetail=(props)=>{
    const item=props.dish;
    
    if(item!=null){
    return(
    <div className="container">
    <div className="row">
        <div  className="col-12 col-md-5 m-1">
            <RenderDish dish={item} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <br /><RenderComments Comments={item.comments} />
        </div>
    </div>
    </div>);}
else{
return( <div></div>);}
}

export default DishDetail;