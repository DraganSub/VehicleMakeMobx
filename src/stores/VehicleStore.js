import {observable, action , makeObservable, runInAction} from "mobx";
import firebase from "../firebase-store/firebase"

class VehicleStore {
    constructor(){
      
      this.state = {
          vehicles : [],
          name: "",
          abrv: ""
      }
        makeObservable(this, {
          state: observable, 
          getvehicle:action,
          editVehicle: action,
          deleteVehicle: action,
          addvehicle: action,  
        
        })
    }
   

    setName = (name) => {
      this.state.name = this.setState({name: name})
  }
  setAbrv = (abrv) => {
      this.state.abrv = this.setState({abrv: abrv})
  }
  
    
    getvehicle = () => {
      firebase.firestore().collection("vehicles1").get().then(
        snapshot => {
          runInAction(() => {
            const vehicle = this.state.vehicles;
            snapshot.forEach(doc => {
            const data = doc.data()
            vehicle.push(data);
            })
          }) 
        }
      )
      console.log(this.vehicles)
    }

    addvehicle= newSchool =>{
      firebase.firestore()
        .collection("vehicles1")
        .doc(newSchool.id).set(newSchool)
        .then(this.state.vehicles.push(newSchool));
        console.log(this.state.vehicles)
    }



   
   
    editVehicle = updatedVehicle =>{
     
      firebase.firestore()
        .collection("vehicles1")
        .doc(updatedVehicle.id)
        .set(updatedVehicle)
        
    } 

    deleteVehicle (vehicleDelete){
      firebase.firestore()
        .collection("vehicles1")
        .doc(vehicleDelete.id)
        .delete()
        .then(
          this.state.vehicles.remove(vehicleDelete)
        )
      
    }

    /*editVehicle= (name,abrv,id )=> {
      firebase.firestore().collection("vehicles").doc(id).update({
        name: name,
        id: id,
        abrv: abrv
      }).then(this.vehicles.push({name,id,abrv}))
    }*/
 
  }

const store = new VehicleStore();
export default store;