import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async dispatch => {
  console.log(data);
  const {name, instaUserName, bio, email, password, country, image} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log('User account created & signed in!');
      console.log(data);

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          instaUserName,
          country,
          image,
          bio,
          uid: data.user.uid,
        })
        .then(() => console.log('DATA SET SUCCESS'));
      Snackbar.show({
        text: 'Account created!!',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'SignUp failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log(data);
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('SUCCESS');
      Snackbar.show({
        text: 'Sign in !!',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'SignIn Failed!!',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('SUCCESS');
      Snackbar.show({
        text: 'Sign out success !!',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'SignOut failed!!',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    });
};
