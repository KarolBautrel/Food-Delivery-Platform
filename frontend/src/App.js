import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Home from "./pages/home/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/auth/login/Login";
import { Meal } from "./pages/meal/Meal";
import { Restaurant } from "./pages/restaurant/Restaurant";
import { User } from "./pages/user/User";
import { LoggedUserMenu } from "./pages/user/loggedUser/LoggedUserMenu";
import { Cart } from "./pages/cart/Cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionHandler } from "./utilities/SessionHandler";
import { CheckoutSummary } from "./pages/checkout/CheckoutSummary";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionHandler>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/meal/:id" element={<Meal />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/user/me" element={<LoggedUserMenu />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/checkout/" element={<CheckoutSummary />} />
            </Routes>
          </BrowserRouter>
        </div>
      </SessionHandler>
    </QueryClientProvider>
  );
}

export default App;
