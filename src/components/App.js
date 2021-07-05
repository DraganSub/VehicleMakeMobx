import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import {  makeObservable, observable } from "mobx"
import {v4 as uuidv4} from "uuid"



class App extends Component {

  constructor(props){
    super(props)
  
    makeObservable( this,{
      handleSubmit : observable,
    })
  }

  state = {
    showForm : false,
  }
  componentDidMount(){
    this.props.VehicleStore.getvehicle()
   
  }
     
  handleSubmit = e => {
    e.preventDefault()
    const id = uuidv4()
    const name = this.vehicleInput.value
    const abrv = this.vehicleAbrv.value
    this.props.VehicleStore.addvehicle({id,name,abrv})
    e.target.reset()
  };

  render() {
    const { VehicleStore } = this.props;
      return (
        <div>
          <h1>Add Vehicle</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              name="name"
              ref={input => (this.vehicleInput = input)}
              placeholder="Add a vehicle"
            />
            <input
              type="text"
              name = "abrv"
              ref={input => (this.vehicleAbrv = input)}
              placeholder="Add a vehicle"
            />
            <button> 
              Add vehicle
            </button>
          </form>
          <ul>
            {VehicleStore.state.vehicles.map(vehicle => ( 
              <li key={vehicle.id}>Vehicle name:{vehicle.name}   {<br />}
                Vehicle abrv: {vehicle.abrv}  {<br />}
                <button className="btn btn-primary" onClick={() => this.props.VehicleStore.editVehicle({name:"malomorger",abrv:"hahahaha",id: vehicle.id})}>Edit</button> 
                <button className="btn btn-danger" onClick={() => this.props.VehicleStore.deleteVehicle(vehicle)}>Delete</button> 
              </li>     
            ))}
            {this.state.showForm ? this.showForm() : null}
          </ul>   
        </div>
      );
    }
  }
  
export default inject("VehicleStore")(observer(App));