import React, {useState, props} from 'react';
import "./Departments.css";
import API_BASE_URL from '../../Utilities/Constants';
import Refresh from '../../Utilities/Refresh';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const Departmets = (props) => {
    const [departments, setDepartments] = useState([]);
    const [companyId,setCompanyId] = useState(null);
    const [createDepartment, setCreateDepartment] = useState(false);
    const [updateDepartment, setUpdateDepartment] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const token = sessionStorage.getItem('accessToken');
    function handleFormBack(){
      setCreateDepartment(false);
      setUpdateDepartment(false);
    }

    function handleSetCreate(){
      setFormData(Object.freeze({
        name: ""
    }))
    setCreateDepartment(true)
    }
    function handleSetUpdate(department){
      setDepartmentId(department.id)
      setFormData(Object.freeze({
        name: department.name
    }))
    setUpdateDepartment(true)
    }
    const initialFormData = Object.freeze({
        name: ""
    });

    const handleCloseDelete = () => setShowDeleteModal(false);
    function handleShowDelete(id){
      setDepartmentId(id)
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
        name: formData.name
      };
      const url = `${API_BASE_URL}/companies/${companyId}/departments/${departmentId}`;

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
              setUpdateDepartment(false);
              getDepartments(companyId)
          })
          .catch((error) => {
              console.log(error);
              alert(error);
          });
  };
  const handleSubmitCreate = (e) => {
    e.preventDefault();

    const postToCreate = {
      name: formData.name
    };

    const url = `${API_BASE_URL}/companies/${companyId}/departments`;

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
            setCreateDepartment(false);
            getDepartments(companyId)
        })
        .catch((error) => {
            console.log(error);
            alert("You do not have sufficient permissions to perform this action");
        });
};
    function getDepartments(companyId){
        const url = `${API_BASE_URL}/companies/${companyId}/departments?pageNumber=1&pageSize=50`;
        Refresh()
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${token}`
            })
          })
            .then(response => response.json())
            .then(departmentsFromServer => {
              setDepartments(departmentsFromServer);
              setCompanyId(companyId);
              console.log(departmentsFromServer)
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
                      {renderDepartmentsTable()}
                    </div>
                </div>
              </div>
            </div>
          );
          function handleDelete(departmentId)
          {
            const url = `${API_BASE_URL}/companies/${companyId}/departments/${departmentId}`;
  
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                getDepartments(companyId)
                handleCloseDelete()
                getDepartments(companyId)
          }
        function renderDepartmentsTable() {
        if (props.updateDepartments===true){
          getDepartments(props.companyId)
          props.setupdateDepartments(false)
         } 
         return (
            <div className="table-responsive mt-5">
            {createDepartment===true || updateDepartment === true?(
            <div>
            <form className="inputs">
            <div className='submit-container'><button onClick={handleFormBack} className='submit'> Go Back</button></div>
            <label>Department name</label>
          <div className="input">
              <input value={formData.name} type="text" name="name" id="" placeholder='Department name' onChange={handleChange}/>
          </div>
          <div className="submit-container">
              {updateDepartment === true?(
              <button on onClick={handleSubmitUpdate} className="submit">
              Submit update
              </button>
          ):(         
          <button onClick={handleSubmitCreate} className="submit">
          Submit department
          </button>)}
          </div>
      </form></div>):
            (<><button onClick={()=> handleSetCreate()}className="btn btn-dark btn-lg w-1 m-1">Create department</button>
            <table className="table table-bordered border-dark">
               <thead>
                 <tr>
                   <th scope="col">Id</th>
                   <th scope="col">Name</th>
                   <th scope="col">Operations</th>
                 </tr>
               </thead>
               <tbody>
                 {departments.map((department) => (
                   <tr key={department.id}>
                     <th scope="row">{department.id}</th>
                     <td>{department.name}</td>
                     <td>
                     <button onClick={()=> handleSetUpdate(department)}className="btn btn-success btn-lg w-1 m-1">Edit department</button>
                      <button onClick={()=> handleShowDelete(department.id)}className="btn btn-danger btn-lg w-1 m-1">Delete department</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table><button onClick={() => getDepartments(companyId)} className="btn btn-dark btn-lg w-1">Refresh table</button>
             <>
              <Modal show={showDeleteModal} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete department with id: {departmentId}? This action is permanent</Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleCloseDelete}>
                    No, go back
                  </Button>
                  <Button variant="danger" onClick={() =>handleDelete(departmentId)}>
                    Yes, delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
             </>
            )
            }
            </div>
        );
        }
}

export default Departmets