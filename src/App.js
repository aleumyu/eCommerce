import React, { useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'; // setCurrentUserAction

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props; // setCurrentUserProps

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            // setCurrentUserProps
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth); // setCurrentUserProps
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => {
    // setCurrentUserProps

    dispatch(setCurrentUser(user)); // setCurrentUserAction
  },
});
// in fact above code is as same as doing: export default connect(null,{setCurrentUser})(App);
// the different is between mapDispatchToProps as function or mapDispatchToProps as object
//with the function form you can do more  customization inside the function
//https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object
export default connect(mapStateToProps, mapDispatchToProps)(App);

//So connect(), is the function that React-Redux exported to us to bind store, and action, in order to interact with the "states" saved in store,
// and it needs two parameters, the first one is to read from store, and the second parameter is to modify the states in store.
//The second parameter needs to be a function that returns a JSON object (because Redux defined it this way). In this JSON object, the key must refer to a function which will then specify the correspondent action type and action payload (as a JSON object).
//(because, it is required by React-Redux). We pass in the action object via the parameter that mapDispatchToProps take, which is a function that will take the action as a parameter.

//so you're almost there, but I think you're confusing a bit about the mapDispatchToProps function itself. So mapDispatchToProps is a function connect expects to return a JSON object with keys that map to functions that are going to get passed to the component as part of its props. The key will be the name of the prop being passed in, and the function will be the value of that prop. These functions have access to the dispatch parameter that react-redux passes to mapDispatchToProps, you want to use dispatch inside these functions so that you can update the redux store. dispatch ONLY takes actions (which are JSON objects with two keys: values, type and payload). Whenever dispatch is called (by your component invoking any of the functions that you defined in mapDispatchToProps), it will pass this action object to every reducer that composes your redux store.

//The connect function is a HOC, a higher order component.
//It takes our component and returns a new component with state and dispatch available in the new components props.
