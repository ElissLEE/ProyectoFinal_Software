const db2 = firebase.firestore();
const getUser = () => db2   .collection("usuario").get();
const getPlanes = () => db2.collection("planes").get();
const card = document.getElementById("InfoPlan");
//Login Check
const loggedOut = document.querySelectorAll('.logged-out')
const loggedIn = document.querySelectorAll('.logged-in')



const loginCheck = async (user) => {
    if(user){
        console.log(user.email)
        const querySnapshot = await getUser();

        querySnapshot.docs.forEach( async (doc) => {

            if(user.email.toUpperCase() == doc.data().correo.toUpperCase()){

                usuario = doc.data()
                console.log(usuario.plan)

                const querySnapshot2 = await getPlanes();

                querySnapshot2.docs.forEach((plan) => {

                    if(usuario.plan == plan.data().nombre){

                        console.log(plan.data().nombre)
                        card.innerHTML += `
                            
                            ${plan.data().nombre}
                            
                            
                            `;
                    }

                });

            }

        });
    } 
}

// Login 
const loginForm = document.querySelector('#login-form')
  
var myModal2 = new bootstrap.Modal(document.getElementById('loginModal'), {
  keyboard: false
})


//Logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('Cerrar Sesión');
    })
})

//Events
//Estado usuario logueado
auth.onAuthStateChanged(user => {
  if(user){
          loginCheck(user);
  } else {
      loginCheck(user);
  }
})