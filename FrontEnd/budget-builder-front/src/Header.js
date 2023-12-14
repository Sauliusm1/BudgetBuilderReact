import React,{useState}  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./Header.css"

const Header = (props) => {
  const initialFormData = Object.freeze({
    companyId: 1,
    departmentId: 1
});

const [formData, setFormData] = useState(initialFormData);
const [warning, setWarning] = useState(null);

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmitDepartments = (e) => {
    e.preventDefault();
    setDepartments(true,formData.companyId)
    handleCloseDepartments()
    // const postToCreate = {
    //   companyId: formData.companyId
    // };
  }
  const handleSubmitPurchases = (e) => {
    e.preventDefault();
    setPurchases(true,formData.companyId,formData.departmentId)
    handleClosePurchases()
    // const postToCreate = {
    //   companyId: formData.companyId,
    //   departmentId: formData.departmentId
    // };
  }

    const [internalCompanies, setInternalCompanies] = useState(false);
    const [internalDepartments, setInternalDepartments] = useState(false);
    const [internalPurchases, setInternalPurchases] = useState(false);
    const [showDepartments, setShowDepartments] = useState(false);
    const handleCloseDepartments = () => setShowDepartments(false);
    const handleShowDepartments = () => setShowDepartments(true);
    const [showPurchases, setShowPurchases] = useState(false);
    const handleClosePurchases = () => setShowPurchases(false);
    const handleShowPurchases = () => setShowPurchases(true);
    const [internalLogIn, setInternalLogIn] = useState(true);
    const [menuActive, setMenuActive] = useState(false);
    // const [internalRegister, setInternalRegister] = useState(false);

    function toggleMenu()
    {
      setMenuActive(!menuActive);
    }
    function setLogIn()
    {
      setInternalLogIn(true);
      props.setLogin(true);
      // setInternalRegister(false);    
    }
    function setRegister()
    {
      setInternalLogIn(false);
      props.setLogin(false);
      // setInternalRegister(true);
    }
    function setCompanies(state)
    {
        setInternalCompanies(state)
        setInternalDepartments(!state)
        setInternalPurchases(!state)
        props.setCompanies(state)
        props.setDepartments(!state)
        props.setPurchases(!state)
        props.setupdateCompanies(state)
    }
    function setDepartments(state, companyId)
    {
        setInternalCompanies(!state)
        setInternalDepartments(state)
        setInternalPurchases(!state)
        props.setCompanies(!state)
        props.setDepartments(state)
        props.setPurchases(!state)
        props.setCompanyId(companyId)
        props.setupdateDepartments(state)
    }
    function setPurchases(state,companyId,departmentId)
    {
        setInternalCompanies(!state)
        setInternalDepartments(!state)
        setInternalPurchases(state)
        props.setCompanies(!state)
        props.setDepartments(!state)
        props.setPurchases(state)
        props.setCompanyId(companyId)
        props.setDepartmentId(departmentId)
        props.setupdatePurchases(state)
    }
    return (
      <><style>
        {`
    .btn-warning {
        font-family: 'Silkscreen', sans-serif;
        font-size: 110%;
        display: table-cell;
        color: purple;
        background-color: lime;
    }
    .btn-warning:hover {
      display: table-cell;
      color: purple;
      background-color: greenyellow;
  }
  @media only screen and (max-width: 756px) {
    .btn-warning {
      display: none;
      color: purple;
      background-color: lime;
  }
    .btn-warning:hover {
      display: none;
      color: purple;
      background-color: greenyellow;
  }
  .barContainer{
    display : table-cell;
    margin: 0;
    padding: 0;
    float: right;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  }
    `}
    {menuActive === true?(`.btn-warning {
        display: table-cell;
        color: purple;
        background-color: lime;
    }
    .btn-warning:hover {
      display: table-cell;
      color: purple;
      background-color: greenyellow;
  }`):(`@media only screen and (max-width: 756px) {    
    .btn-warning {
    display: none;
    color: purple;
    background-color: lime;
}
.HeaderText{
  display: none;
}
  .btn-warning:hover {
    display: none;
    color: purple;
    background-color: greenyellow;
}}`)}
      </style><div className='Header'>
         {props.accessToken?( <><div className='TableElement'>{internalCompanies === true ? <div className='HeaderText'>Viewing compnaies</div> :
            <Button variant='warning' onClick={() => setCompanies(true)} className="HeaderButton">View Companies</Button>}</div><div className='TableElement'>{internalDepartments === true ? <div className='HeaderText'>Viewing departments</div> :
              <> <Button variant='warning' onClick={() => handleShowDepartments(true)} className="HeaderButton">View Departments</Button>
                <Modal show={showDepartments} onHide={handleCloseDepartments} centered backdrop="static">
                  <Modal.Header closeButton>
                    <Modal.Title>Insert Comapany Id</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>          <Form>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                      <Form.Label>Comapny Id</Form.Label>
                      <Form.Control
                        type="number"
                        name="companyId"
                        placeholder="Company Id"
                        autoFocus
                        value={formData.companyId}
                        onChange={handleChange} />
                    </Form.Group>
                  </Form></Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDepartments}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDepartments}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>}</div><div className='TableElement'>{internalPurchases === true ? <div className='HeaderText'>Viewing purchases</div> :
                <><Button variant='warning' onClick={() => handleShowPurchases(true)} className="HeaderButton">View purchases</Button>
                  <Modal show={showPurchases} onHide={handleClosePurchases} centered backdrop="static">
                    <Modal.Header closeButton>
                      <Modal.Title>Insert Comapany and Department Id</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>          <Form>
                      <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>Comapny Id</Form.Label>
                        <Form.Control
                          type="number"
                          name="companyId"
                          placeholder="Company Id"
                          autoFocus
                          value={formData.companyId}
                          onChange={handleChange} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="ControlInput2"
                      >
                        <Form.Label>Department Id</Form.Label>
                        <Form.Control
                          type="number"
                          name="departmentId"
                          placeholder="Department Id"
                          value={formData.departmentId}
                          onChange={handleChange} />
                      </Form.Group>
                    </Form></Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClosePurchases}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleSubmitPurchases}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>}
</div></>):(internalLogIn===false?(<Button variant='warning' onClick={() => setLogIn()}> Log in</Button>):(<Button variant='warning' onClick={() => setRegister()}> Register</Button>))}
                    <div class="TableElementMobile">
                      <div class="barContainer" onClick={toggleMenu}>
                      <div class={menuActive===false?"bar1":"rotated1"}></div>
                      <div class={menuActive===false?"bar2":"rotated2"}></div>
                      <div class={menuActive===false?"bar3":"rotated3"}></div>
                    </div>
                    </div>
                    </div></>
    )
    
}

export default Header;