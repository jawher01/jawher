import { useEffect } from "react";
import Signup from "./Components/Signup/signup";
import { Switch, Route} from "react-router-dom";
import Dashbord from "./Components/Dashbord/Dashbord";
import PrivateRoute from "./Components/router/PrivateRoute";
import { useDispatch } from "react-redux";
import { current } from "./js/actions/user";
import Publication from "./Components/publication/PublicatinList"
import User from "./Components/publication/userList"
import "./App.css";
import Add from "./Components/publication/Add";
import vue from "./Components/vue"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={vue} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute path="/dashbord" component={Dashbord} />
        <PrivateRoute exact path="/publication" component={Publication} />
        <PrivateRoute path={["/publication/add", "/publication/edit/:id"]} component={Add} />
        <PrivateRoute exact path="/admin" component={User} />
      </Switch>



    </div >
  );
}

export default App;
