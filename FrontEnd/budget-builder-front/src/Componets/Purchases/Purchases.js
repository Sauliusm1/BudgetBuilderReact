import React, {useState, props} from 'react';
import "./Purchases.css";
import API_BASE_URL from '../../Utilities/Constants';
import Refresh from '../../Utilities/Refresh';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const Purchases = (props) => {
    const [purchases, setPurchases] = useState([]);
    const [companyId,setCompanyId] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [createPurchase, setCreatePurchase] = useState(false);
    const [updatePurchase, setUpdatePurchase] = useState(false);
    const [purchaseId, setPurchaseId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const token = sessionStorage.getItem('accessToken');

    function handleFormBack(){
        setCreatePurchase(false);
        setUpdatePurchase(false);
    }

    function handleSetCreate(){
      setFormData(Object.freeze({
        name: "",
        amount: 0,
        cost: 0,
        purchaseDate: ""
    }))
      setCreatePurchase(true)
    }
    function handleSetUpdate(purchase){
      setPurchaseId(purchase.id)
      setFormData(Object.freeze({
        name: purchase.name,
        amount: purchase.amount,
        cost: purchase.cost,
        purchaseDate: purchase.purchaseDate.substring(0,10)
    }))
      setUpdatePurchase(true)
    }
    const initialFormData = Object.freeze({
        name: "",
        amount: 0,
        cost: 0,
        purchaseDate: ""
    });

    const handleCloseDelete = () => setShowDeleteModal(false);
    function handleShowDelete(id){
      setPurchaseId(id)
      setShowDeleteModal(true)
    }

    const [formData, setFormData] = useState(initialFormData);
    const [warning, setWarning] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmitUpdate = (e) => {
      e.preventDefault();

      const postToCreate = {
        name: formData.name,
        amount: formData.amount,
        cost: formData.cost,
        purchaseDate: formData.purchaseDate
      };

      const url = `${API_BASE_URL}/companies/${companyId}/departments/${departmentId}/purchases/${purchaseId}`;

      fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postToCreate)
      })
          .then(response => response.json())
          .then(responseFromServer => {
              console.log(responseFromServer);
              setUpdatePurchase(false);
              getPurchases(companyId,departmentId)
          })
          .catch((error) => {
              console.log(error);
              alert(error);
          });
  };
    const handleSubmitCreate = (e) => {
        e.preventDefault();

        const postToCreate = {
          name: formData.name,
          amount: formData.amount,
          cost: formData.cost,
          purchaseDate: formData.purchaseDate
        };

        const url = `${API_BASE_URL}/companies/${companyId}/departments/${departmentId}/purchases`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                setCreatePurchase(false);
                getPurchases(companyId,departmentId)
            })
            .catch((error) => {
                console.log(error);
                alert("You do not have sufficient permissions to perform this action");
            });
    };
    function getPurchases(companyId, departmentId){
        const url = `${API_BASE_URL}/companies/${companyId}/departments/${departmentId}/purchases?pageNumber=1&pageSize=50`;
        Refresh()
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${token}`
            })
          })
            .then(response => response.json())
            .then(purchasesFromServer => {
              setPurchases(purchasesFromServer);
              console.log(purchasesFromServer)
              setCompanyId(companyId);
              setDepartmentId(departmentId);
            })
            .catch((error) => {
              console.log(error);
              alert("You do not have sufficient permissions to do access this information");
            });
        }
        return (
            <div className="container">
              <div className="row">
                <div className="col">
                    <div>
                      {renderPurchasesTable()}
                    </div>
                </div>
              </div>
            </div>
          );
        function handleDelete(purchaseId)
        {
          const url = `${API_BASE_URL}/companies/${companyId}/departments/${departmentId}/purchases/${purchaseId}`;

          fetch(url, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          })
              getPurchases(companyId,departmentId)
              handleCloseDelete()
              getPurchases(companyId,departmentId)
        }
        function renderPurchasesTable() {
        if (props.updatePurchases===true){
          getPurchases(props.companyId,props.departmentId)
          props.setupdatePurchases(false)
         } 
         return (
            <div className="table-responsive mt-5">
           
            {createPurchase===true || updatePurchase===true?(
            <div>
              <button onClick={handleFormBack}> Go Back</button>
              <form className="inputs">
              <label>Purchase name</label>
            <div className="input">
                <input value={formData.name} type="text" name="name" id="" placeholder='Purchase name' onChange={handleChange}/>
            </div>
            <label>Amount of units</label>
            <div className="input">
                <input value={formData.amount} type="number" name="amount" id="" placeholder='Amount of units' onChange={handleChange}/>
            </div>
            <label>Cost per unit</label>
            <div className="input">
                <input value={formData.cost} type="number" name="cost" id="" placeholder='Cost per unit'  onChange={handleChange}/>
            </div>
            <label>Date of purchase</label>
            <div className="input">
                <input value={formData.purchaseDate} type="date" name="purchaseDate" id="" placeholder='Date of purchase'  onChange={handleChange}/>
            </div>
            <div className="submit-container">
                {updatePurchase === true?(
                <button on onClick={handleSubmitUpdate} className="submit">
                Submit update
                </button>
            ):(         
            <button onClick={handleSubmitCreate} className="submit">
            Submit purchase
            </button>)}
            </div>
        </form></div>)
        :(<> <button onClick={()=> handleSetCreate()}className="btn btn-dark btn-lg w-1 m-1">Create purchase</button>
              <table className="table table-bordered border-dark">
               <thead>
                 <tr>
                   <th scope="col">Id</th>
                   <th scope="col">Name</th>
                   <th scope="col">Approved</th>
                   <th scope="col">Amount</th>
                   <th scope="col">Cost</th>
                   <th scope="col">Purchase date</th>
                   <th scope="col">Operations</th>
                 </tr>
               </thead>
               <tbody>
                 {purchases.map((purchase) => (
                   <tr key={purchase.id}>
                     <th scope="row">{purchase.id}</th>
                     <td>{purchase.name}</td>
                     <td>{purchase.approved.toString()}</td>
                     <td>{purchase.amount}</td>
                     <td>{purchase.cost}</td>
                     <td>{purchase.purchaseDate.substring(0, 10)}</td>
                     <td>
                      <button onClick={()=> handleSetUpdate(purchase)}className="btn btn-success btn-lg w-1 m-1">Edit purchase</button>
                      <button onClick={()=> handleShowDelete(purchase.id)}className="btn btn-danger btn-lg w-1 m-1">Delete purchase</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table><button onClick={() => getPurchases(companyId,departmentId)} className="btn btn-dark btn-lg w-1vh">Refresh table</button>
             <>
              <Modal show={showDeleteModal} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete purchase with id: {purchaseId}? This action is permanent</Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleCloseDelete}>
                    No, go back
                  </Button>
                  <Button variant="danger" onClick={() =>handleDelete(purchaseId)}>
                    Yes, delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
             </>
             )}
            </div>

        );
        }
}

export default Purchases