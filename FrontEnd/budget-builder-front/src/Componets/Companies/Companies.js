import React, {useState, props} from 'react';
import "./Companies.css";
import Refresh from '../../Utilities/Refresh';
import API_BASE_URL from '../../Utilities/Constants';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


const Companies = (props) => {
    const [companies, setCompanies] = useState([]);
    const [createCompany, setCreateCompany] = useState(false);
    const [updateCompany, setUpdateCompany] = useState(false);
    const [companyId, setCompanyId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = sessionStorage.getItem('accessToken');

    function handleFormBack(){
      setCreateCompany(false);
      setUpdateCompany(false);
  }

  function handleSetCreate(){
    setFormData(Object.freeze({
      name: "",
      establishedDate: ""
  }))
    setCreateCompany(true)
  }
  function handleSetUpdate(company){
    setCompanyId(company.id)
    setFormData(Object.freeze({
      name: company.name,
      establishedDate: company.establishedDate.substring(0,10)
  }))
    setUpdateCompany(true)
  }
  const initialFormData = Object.freeze({
      name: "",
      establishedDate: ""
  });

  const handleCloseDelete = () => setShowDeleteModal(false);
  function handleShowDelete(id){
    setCompanyId(id)
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
      establishedDate: formData.establishedDate
    };

    const url = `${API_BASE_URL}/companies/${companyId}`;

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
            setUpdateCompany(false);
            getCompanies()
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
        establishedDate: formData.establishedDate
      };

      const url = `${API_BASE_URL}/companies/`;

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
              setCreateCompany(false);
              getCompanies()
          })
          .catch((error) => {
              console.log(error);
              alert("You do not have sufficient permissions to perform this action");
          });
  };
    function getCompanies(){
        const url = `${API_BASE_URL}/companies?pageNumber=1&pageSize=50`;
        Refresh()
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${token}`
            })
          })
            .then(response => response.json())
            .then(companiesFromServer => {
              setCompanies(companiesFromServer);
              console.log(companiesFromServer)
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
                      {renderCompaniesTable()}
                    </div>
                </div>
              </div>
            </div>
          );
          function handleDelete(purchaseId)
          {
            const url = `${API_BASE_URL}/companies/${companyId}`;
  
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                getCompanies()
                handleCloseDelete()
                getCompanies()
          }
        function renderCompaniesTable() {
        if (props.updateCompanies===true){
          getCompanies()
          props.setupdateCompanies(false)
         } 
         return (
          <div className="table-responsive mt-5">
           { createCompany===true || updateCompany===true?
           (<div>
              <button onClick={handleFormBack}> Go Back</button>
              <form className="inputs">
              <label>Company name</label>
            <div className="input">
                <input value={formData.name} type="text" name="name" id="" placeholder='Company name' onChange={handleChange}/>
            </div>
            <label>Date of establishment</label>
            <div className="input">
                <input value={formData.establishedDate} type="date" name="establishedDate" id="" placeholder='Established Date'  onChange={handleChange}/>
            </div>
            <div className="submit-container">
                {updateCompany === true?(
                <button on onClick={handleSubmitUpdate} className="submit">
                Submit update
                </button>
            ):(         
            <button onClick={handleSubmitCreate} className="submit">
            Submit comapny
            </button>)}
            </div>
            </form></div>)
            :(
            <><button onClick={()=> handleSetCreate()}className="btn btn-dark btn-lg w-1 m-1">Create company</button>
            <table className="table table-bordered border-dark">
                 <thead>
                   <tr>
                     <th scope="col">Id</th>
                     <th scope="col">Name</th>
                     <th scope="col">Established</th>
                     <th scope="col">Operations</th>
                   </tr>
                 </thead>
                 <tbody>
                   {companies.map((comapny) => (
                     <tr key={comapny.id}>
                       <th scope="row">{comapny.id}</th>
                       <td>{comapny.name}</td>
                       <td>{comapny.establishedDate.substring(0, 10)}</td>
                       <td>
                       <button onClick={()=> handleSetUpdate(comapny)}className="btn btn-success btn-lg w-1 m-1">Edit department</button>
                        <button onClick={()=> handleShowDelete(comapny.id)}className="btn btn-danger btn-lg w-1 m-1">Delete department</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table><button onClick={() => getCompanies([])} className="btn btn-dark btn-lg w-1">Refresh table</button><>
              <Modal show={showDeleteModal} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete company with id: {companyId}? This action is permanent</Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleCloseDelete}>
                    No, go back
                  </Button>
                  <Button variant="danger" onClick={() =>handleDelete(companyId)}>
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

export default Companies