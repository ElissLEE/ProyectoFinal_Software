const db2 = firebase.firestore();
const getUser = () => db2.collection("usuario").get();
const getPlanes = () => db2.collection("planes").get();
const card = document.getElementById("InfoPlan");
const cardCuenta = document.getElementById("cuenta-card");
const cardBeneficiarios= document.getElementById("beneficiarios-card")
const divAlerta= document.getElementById("Alerta-Plan")
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

                        cardCuenta.innerHTML += `<h1>Cuenta :${usuario.correo}</h1>`;
                        cardBeneficiarios.innerHTML += `<h4>Tu plan te permite registrar esta cantidad de beneficiarios :${plan.data().cantBeneficiarios}</h4>`;
                        card.innerHTML += `
                        
                        <div class="row justify-content-md-center">
                            <div class="col col-md-8">
                                <p>
                                <h3> Tipo de Plan : ${plan.data().nombre}</h3> 
                              <div id="beneficiarios-div"> <h3> Cantidad de Beneficiarios Permitidos :${plan.data().cantBeneficiarios} </div></h3>
                                <h3> Beneficiarios Registrados : ${usuario.beneficiarios.length}
                                </p>
                            </div>    
                         </div>
    
                            `;
                    }

                });

            }

        });
    } 
}



async function agregarBeneficiario()
{
    var correo = cardCuenta.textContent
    var correoArray= correo.split(":")
    var benef= cardBeneficiarios.textContent
    var benefArray= benef.split(":")

    correo= correoArray[1]
    benef= benefArray[1]
    
    var permitido = parseInt(benef) 

    console.log(permitido)
   const usuarios = await getUser(); 
   
   usuarios.forEach((doc) => {
    
        usuario=doc.data()
        
        if(correo.toUpperCase() == usuario.correo.toUpperCase())
        {
            if(usuario.beneficiarios.length < permitido)
            { 
            var miUsuario = usuario;
            var nuevoArreglo= miUsuario.beneficiarios;  nuevoArreglo.push('');
            var usuarioRef = db2.collection("usuario").doc(doc.id);
            console.log(miUsuario)
             db2.runTransaction((transaction) => {
                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(usuarioRef).then((sfDoc) => {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
            
                    // Add one person to the city population.
                    // Note: this could be done without a transaction
                    //       by updating the population using FieldValue.increment()      
                    transaction.update(usuarioRef, { beneficiarios: nuevoArreglo });
                });
            }).then(() => {
                console.log("Transaction successfully committed!");
                location.reload();
            }).catch((error) => {
                console.log("Transaction failed: ", error);
            });
           
            }else{
                divAlerta.innerHTML+= `
            <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                <h4 class="card-header"> Ya no puedes agregar mas beneficiarios !!!!</h4>
                <div class="card-body">
                  <h6 class="card-title">Actualiza tu plan si deseas registrar mas beneficiarios en tu cuenta</h5>
                </div>
              </div>`;
            }
           
        }
    })
   
}
async function eliminarBeneficiario()
{
    var correo = cardCuenta.textContent
    var correoArray= correo.split(":")
    var benef= cardBeneficiarios.textContent
    var benefArray= benef.split(":")

    correo= correoArray[1]
    benef= benefArray[1]

    const usuarios = await getUser(); 
   
    usuarios.forEach((doc) => {
     
         usuario=doc.data()
         
         if(correo.toUpperCase() == usuario.correo.toUpperCase())
        {
            if(usuario.beneficiarios.length != 0)
            { 
            var miUsuario = usuario;
            var nuevoArreglo= miUsuario.beneficiarios;  nuevoArreglo.pop('');
            var usuarioRef = db2.collection("usuario").doc(doc.id);
            console.log(miUsuario)
             db2.runTransaction((transaction) => {
                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(usuarioRef).then((sfDoc) => {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
            
                    // Add one person to the city population.
                    // Note: this could be done without a transaction
                    //       by updating the population using FieldValue.increment()      
                    transaction.update(usuarioRef, { beneficiarios: nuevoArreglo });
                });
            }).then(() => {
                console.log("Transaction successfully committed!");
                location.reload();
            }).catch((error) => {
                console.log("Transaction failed: ", error);
            });
           
            }else{
                divAlerta.innerHTML+= `
            <div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
                <h4 class="card-header"> Ya no tienes ningun beneficiario !!!!</h4>
                <div class="card-body">
                  <h6 class="card-title">Agrega beneficiarios para registrarlos a tu cuenta</h5>
                </div>
              </div>`;
            }
           
        }
    })
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