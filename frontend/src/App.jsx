import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import Footer from "./components/Footer.jsx";
import { Loader } from "lucide-react";
import { WatchPage } from "./pages/WatchPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import NotFoundPage from "./pages/404.jsx";
import MyList from "./pages/MyList.jsx";

function App() {
const {user, isCheckingAuth, authCheck}=useAuthStore();
console.log(user);

useEffect(()=>{
  authCheck();
},[authCheck]);

if (isCheckingAuth) {
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center bg-black h-full'>
        <Loader className='animate-spin text-red-600 size-10' />
      </div>
    </div>
  );
}

  return (<>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route
        path='/login'
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
    <Route
        path='/signup'
        element={!user ? <SignUpPage /> : <Navigate to="/" />}
      />
      <Route
      path="/watch/:id"
      element={user ? <WatchPage/>: <Navigate to="/login"/>}
      />
      <Route
      path="/search"
      element={user ? <SearchPage/>: <Navigate to="/login"/>}
      />
      <Route
      path="/history"
      element={user ? <HistoryPage/>: <Navigate to="/login"/>}
      />
      <Route
      path="/*"
      element={<NotFoundPage/>}
      />
      <Route
      path="/favourite"
      element={user ? <MyList/>: <Navigate to="/login"/>}
      />
   </Routes>
   <Footer/>
   <Toaster/>
   </>
  );
}

export default App
