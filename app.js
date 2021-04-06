const db = firebase.firestore();
const card= document.getElementById("informacion");


const getPlanes= () => db.collection('planes').get();

