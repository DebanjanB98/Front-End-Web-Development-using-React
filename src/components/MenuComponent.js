import React from 'react';
import { Card , CardImg, CardBody,  CardTitle } from 'reactstrap';
import '../App.css';
function RenderMenuItem({dish}){
    return(
        <Card className="card">   
        <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle className="Title">{dish.name}</CardTitle>
            </CardBody>
        </Card>
    );
}
function Menu(props){
    
        const menu= props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-3 ">
                  <RenderMenuItem dish={dish} />
            </div>
            );
        });
      return (
          <div className="container">
              <div className="row">
                      {menu}
                   </div>
                
          </div>
      );
    
}
export default Menu;