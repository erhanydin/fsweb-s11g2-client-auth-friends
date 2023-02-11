import './App.css';
import FriendsList from './components/FriendsList';
import LoginForm from './components/LoginForm';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import AddFriend from './components/AddFriend';

function App() {
  const history = useHistory();

  let tokenControl = null;
  let isValid = false;
  useEffect(() => {
    tokenControl = localStorage.getItem("token");
    isValid = tokenControl ? true : false;
  })

  const handleClick = () => {
    localStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <div className="App">
      <div className='nav-container'>
        <h1 className='nav-header'>Friends Database</h1>

        <div className='buttons-container'>
          {isValid ? <Link onClick={handleClick()} className='buttons' to="/logout">Logout</Link>
            : <Link className='buttons' to="/login">Login</Link>}
          <Link className='buttons' to="/friends-list">Friends List</Link>
          <Link className='buttons' to="/add-friend">Add Friends</Link>

        </div>
      </div>


      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/friends-list">
          <FriendsList />
        </Route>
        <Route path="/add-friend" component={AddFriend} />

      </Switch>

    </div>
  );
}

export default App;
