import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom"; // useParams,

import { AuthProvider } from "./context";

import {
  DataGridExample,
  GlobalLayout,
  Login,
  Register,
  RequireAuth,
} from "./components";

import LocationReduxExample from "./components/LocationReduxExample/LocationReduxExample";

import { useTranslation } from "react-i18next";

import LanguageFlags from "./components/Multilanguage/LanguageFlags";

// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

import HeaderContent from "./components/Header/header";
import { FrontPage } from "./components/Pages/FrontPage";
import Registration from "./components/Pages/RegistrationPage";
import Location from "./components/Pages/LocationPage";
// import { useAuth } from "./components/hooks/auth.hook";
// import { AuthContext } from './context/AuthContext';

const { User, Editor, Admin } = {
  //ROLES
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

export default function App() {
  const { t } = useTranslation();

  // const { token, login, logout, userId } = useAuth()
  // const isAuthenticated = !!token
  // const routes = useRoutes(isAuthenticated)

  return (
    <div className="App">
      <HeaderContent />
      {/* <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}> */}
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Location" element={<Location />} />
      </Routes>
      {/* </AuthContext.Provider> */}

      {/* <BrowserRouter> */}
      {/*  <AuthProvider> 

    <Routes>
      <Route path="/" element={<GlobalLayout> <PageLinks /> </GlobalLayout>}>
        
        <Route index element={<><br /> [-IndexPage-]</>} />

        <Route path="DataGridExample/*" element={<><br /> <DataGridExample /></>} />
        <Route path="LocationReduxExample/*" element={<><br /> <LocationReduxExample /></>} />

        <Route path="pageA/*" element={<><br /> [-PageA-]</>} />

        <Route path="login/*" element={<Login />} />
        <Route path="register/*" element={<Register />} />
    
    
        <Route element={<RequireAuth allowedRoles={[User]}/>}>
          <Route index element={<><br /> (1)Index</>} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Editor]}/>}>
          <Route path="editor/*" element={<><br /> (2)Editors Page</>} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Admin]}/>}>
          <Route path="admin/*" element={<><br /> (3)Admin Page</>} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Editor, Admin]}/>}>
          <Route path="lounge/*" element={<><br /> (4)Lounge Page</>} />
        </Route>
        
        
  
        
        {/* 
        <Route path="redux1" element={<><ReduxReference1 /></>} />
        <Route path="redux2" element={<><ReduxReference2 /></>} />
        <Route path="reduxFetch/*" element={<><ReduxFetch /></>} />
        <Route path="ReduxFetchFun/*" element={<><ReduxFetchFun /></>} />
        */}

      {/* <Route path="unauthorized/*" element={<> <br /> [-PageError403-] (Error 403 Unauthorized) <BackwardLink /> <br /></>} />
        <Route path="*" element={<><br /> [-PageError404-] (Error 404 Page not found) <BackwardLink /> <br /></>} />
      </Route> */}
      {/* </Routes> */}
      {/* </AuthProvider>  */}
      {/* </BrowserRouter>  */}
    </div>
  );
}

// const BackwardLink = () => {
//   const navigate = useNavigate();
//   return (<button onClick={() => navigate(-1)} >Go Back</button>)
// }

// const PageLinks = () => { return (<section>
//     Page Links<br />
//     Public:{' '}
//     <Link to="/login">Login</Link>{' | '}
//     <Link to="/register">Register</Link>{' | '}

//     Private Page:{' '}
//     <Link to="/editor">Editors Page (after login will not auth 403)</Link>{' | '}
//     <Link to="/admin">Admin Page (after login)</Link>{' | '}
//     <br />
//     Public:{' '}
//     <Link to="/">index</Link>{' | '}
//     <Link to="./DataGridExample">DataGridExample</Link>{' | '}
//     <Link to="./LocationReduxExample">LocationReduxExample</Link>{' | '}
//     <Link to="./PageA">PageA</Link>{' | '}

//     <Link to="./Mui">Mui</Link>{' | '}

//     <Link to="./Redux2">ReduxReference2</Link>{' | '}
//     <Link to="./ReduxFetch">ReduxFetch</Link>{' | '}
//     <Link to="./ReduxFetchFun">ReduxFetchFun</Link>{' | '}

//     <Link to="/Error">Error</Link>
// </section>)}
