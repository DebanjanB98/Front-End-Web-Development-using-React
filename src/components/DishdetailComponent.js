import React, { Component } from 'react';
import { Card , CardImg, CardBody,CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    
renderDish(dish){
    if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>);
}
renderComments(Comments){
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
render(){
    const item=this.props.dish;
    
    if(item!=null){
    return(
    <div className="container">
    <div className="row">
        <div  className="col-12 col-md-5 m-1">
            {this.renderDish(item)}
        </div>
        <div className="col-12 col-md-5 m-1">
            <br />{this.renderComments(item.comments)}
        </div>
    </div>
    </div>);}
else{
return( <div></div>);}
}
}
export default DishDetail;