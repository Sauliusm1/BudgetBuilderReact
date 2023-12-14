import logo from './logo.svg';
import './App.css';
import Login from './Componets/Login/Login';
import Companies from './Componets/Companies/Companies';
import Header from './Header';
import React,{useState} from 'react';
import Departmets from './Componets/Departments/Departments';
import Purchases from './Componets/Purchases/Purchases';
import Register from './Componets/Login/Register';

function App() {
  const [accessToken, setToken] = useState(null);
  const [updateCompanies, setupdateCompanies] = useState(true);
  const [updateDepartments, setupdateDepartments] = useState(true);
  const [updatePurchases, setupdatePurchases] = useState(true);
  const [companies, setCompanies] = useState(false);
  const [departments, setDepartments] = useState(false);
  const [purchases, setPurchases] = useState(false);
  const [departmentId, setDepartmentId] = useState(false);
  const [companyId, setCompanyId] = useState(false);
  const [login, setLogin] = useState(true);
  // const [register, setRegister] = useState(false);

  function getToken() {
    const tokenString = sessionStorage.getItem('accessToken');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }
  return (
    <div className="App">
      <Header companies ={companies} setCompanies={setCompanies} companyId={companyId} setCompanyId={setCompanyId}
      departments ={departments} setDepartments={setDepartments} departmentId={departmentId} setDepartmentId={setDepartmentId}
      purchases ={purchases} setPurchases={setPurchases} setupdateCompanies={setupdateCompanies} login={login} setLogin={setLogin}
      setupdateDepartments={setupdateDepartments} setupdatePurchases={setupdatePurchases} accessToken={accessToken}/>
     {accessToken?(<>{(console.log(companies,departments,purchases))}{
      companies===true?(<><Companies updateCompanies={updateCompanies} setupdateCompanies={setupdateCompanies}/></>): 
      departments===true?(<><Departmets updateDepartments={updateDepartments} setupdateDepartments={setupdateDepartments} companyId={companyId}/></>):
      purchases===true?(<><Purchases updatePurchases={updatePurchases} setupdatePurchases={setupdatePurchases} companyId={companyId} departmentId={departmentId}/></>):
      <div className="container">
      <div className="header">
          <div className="text"> 
          Choose which part of the hierarchy to work with above
          </div>
      </div>
      </div>
  }
  
     </>
     )
     :
     (login===true?(<Login setToken={setToken}/>):(<Register/>))
     }

    </div>
  );
}

export default App;

