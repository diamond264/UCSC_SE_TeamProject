import * as firebase from 'firebase';


let database;
const firebaseConfig = {
  apiKey: "AIzaSyB7VteczvWn6nq2IZkgu8LFHNcURcmsq-0",
  authDomain: "amazino-3b363.firebaseapp.com",
  databaseURL: "https://amazino-3b363.firebaseio.com",
  projectId: "amazino-3b363",
  storageBucket: "amazino-3b363.appspot.com",
  messagingSenderId: "628330225290",
  appId: "1:628330225290:web:47cbe90f36f59743"
};

export const fire = () => {

  firebase.initializeApp(firebaseConfig);


	database = firebase.database();
}

export const uploadItem = async (seller, name, price, category, duedate, description) => {
  var itemData = {
      seller: seller,
      name : name,
      price : price,
      bets : [],
      dueDate: duedate,
      postDate: new Date(),
      category: category,
      description: description,
      itemImg: ""
  };

  var newItemKey = database.ref().child('items').push().key;
  var updates = {};
  updates['/items/' + newItemKey] = itemData;

  return database.ref().update(updates);
};

export const getAllItems = () => {
    return database.ref('items/').once('value');
};

export const getItemFromID = (itemID) => {
    return database.ref('items/' + itemID).once('value');
};

export const getUserDataFromID = (uid) => {
  // firebase.database().ref('users/'+ uid).once('value')
  //   .then(user => {
  //     return user;
  //   })
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').child(uid).once('value').then(user => {
      return resolve(user);
    }).catch((err) => {
      console.log(err);
      return reject(err);
    })
  })
}

export const getItemFromKVPair = (key, value) => {
    var itemRef = database.ref('items/');
    var itemQuery = itemRef.orderByChild(key).equalTo(value);
    return itemQuery.once('value');
};

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      return resolve(firebase.auth().currentUser);
    }).catch((err) => {
      console.log(err);
      return reject(err);
    })
  })
}

export const signUp = (email, password, displayName) => {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(()=> {
      console.log('then');
      var user = firebase.auth().currentUser;
      var uid = user.uid
      database.ref("/").child("users/"+uid).set({
        displayName,
        email: email,
        balance: 10
      })
      return resolve(user);
    }).catch((err) => {
      console.log(err);
      return reject(err);
    })
  })
  
}

export const signOut = () => {
  firebase.auth.signOut().then(function() {
    console.log("signed out");
  }).catch(function(err) {
    console.log(err);
  })
}

export const isSignIn = () => {
  if (firebase.auth().currentUser) return true;
  else return false;

  
}

export const getBalance = async () => {
  return new Promise((resolve, reject) => {
    database.ref('users/332kxRhgNodHzIzdMNhhsScGIpG2').once('value', (snap) => {
      return resolve(snap.val().balance);
    })
  })
}

export const updateBalance = (bal) => {
  database.ref('users/332kxRhgNodHzIzdMNhhsScGIpG2').update({
    balance: bal
  })
}