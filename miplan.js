const db2 = firebase.firestore();
const getUser = () => db2.collection("usuario").get();
const getPlanes = () => db2.collection("planes").get();
const card = document.getElementById("info-card");
const cardPer = document.getElementById("infoPer-card");
const cardUser = document.getElementById("user-card");
const cardCuenta = document.getElementById("cuenta-card");
const cardBeneficiarios= document.getElementById("beneficiarios-card")
const divAlerta= document.getElementById("Alerta-Plan")
const cardPlanes = document.getElementById("planes");
const contenedorPlanes = document.getElementById("contenedor-infoPlan");
//Login Check
const loggedOut = document.querySelectorAll('.logged-out')
const loggedIn = document.querySelectorAll('.logged-in')

//Cambiar plan
const numTarjeta = document.getElementById("texto-Tarjeta");
const nombrePlan = document.getElementById("texto-plan");
const alerta = document.getElementById("verificacion");
//modal
var myModal2 = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
  })

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

                        cardUser.innerHTML += `<h1>Hola ${usuario.nombre}!</h1>`;
                        cardCuenta.innerHTML += `<h7>Correo:${usuario.correo}</h7>`;
                        cardBeneficiarios.innerHTML += `<h7>Tu plan te permite registrar esta cantidad de beneficiarios:${plan.data().cantBeneficiarios}</h7>`;
                        card.innerHTML += `  
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Tipo de Plan : </h7><h7>${plan.data().nombre} - ${plan.data().calidadServicioMedico}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Descripción : </h7><h7>${plan.data().descripcion}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Cobertura : </h7><h7>${plan.data().cobertura}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Beneficiarios (${usuario.beneficiarios.length} de ${plan.data().cantBeneficiarios} permitidos) : </h7><h7>${usuario.beneficiarios}</h7>
                            <div class="my-2"><button type="button" class="btn btn-primary" onclick="agregarBeneficiario()">Agregar Beneficiario</button>
                            <button type="button" class="btn btn-danger" onclick="eliminarBeneficiario()">Eliminar Beneficiario</button></div></li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Precio : </h7><h7>${plan.data().precio} COP</h7></li>
                            </ul>
                            `;
                        
                        cardPer.innerHTML += `
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Cedula : </h7><h7>${usuario.cedula}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Correo : </h7><h7>${usuario.correo}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Tarjeta : </h7><h7>${usuario.tarjeta}</h7> </li>
                            </ul>
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
            var nuevoArreglo= miUsuario.beneficiarios;  nuevoArreglo.push('1');
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
                divAlerta.innerHTML+= ` <div class="container-fluid"><div class="row">
            <div class="card text-white bg-danger mb-3">
                <h4 class="card-header">Ya no puedes agregar más beneficiarios!</h4>
                <div class="card-body">
                  <h6 class="card-title">Actualiza tu plan si deseas registrar mas beneficiarios en tu cuenta</h5>
                </div>
              </div></div></div>`;
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
            var nuevoArreglo= miUsuario.beneficiarios;  nuevoArreglo.pop('1');
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
                divAlerta.innerHTML+= `<div class="container-fluid"><div class="row">
            <div class="card text-white bg-warning mb-3">
                <h4 class="card-header">Ya no tienes beneficiarios!</h4>
                <div class="card-body">
                  <h6 class="card-title">Agrega beneficiarios para registrarlos en tu cuenta</h5>
                </div>
              </div></div></div>`;
            }
           
        }
    })
}

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

async function cambiarPlan()
{ 
    document.getElementById("titulo").style.display="block";
    contenedorPlanes.style.display="none";
        const querySnapshot =  await getPlanes();
        querySnapshot.forEach((doc) => {
          plan = doc.data();
          plan.id = doc.id;
          
          cardPlanes.innerHTML += ` <div class="col-lg-4">
             <div class="card mb-5 mb-lg-0">
               <div class="card-body">
                 <h5 class="card-title text-muted text-uppercase text-center">${plan.nombre}</h5>
                 <h6 class="card-price text-center">${plan.precio}<span class="period">/month</span></h6>
                 <hr>
                 <ul class="fa-ul">
                   <li><span class="fa-li"><i class="fas fa-check"></i></span>Descripcion : ${plan.descripcion}</li>
                   <li><span class="fa-li"><i class="fas fa-check"></i></span>Calidad de servicio medico: ${plan.calidadServicioMedico}</li>
                   <li><span class="fa-li"><i class="fas fa-check"></i></span>Cantidad de beneficiarios: ${plan.cantBeneficiarios}</li>
                   <li><span class="fa-li"><i class="fas fa-check"></i></span>Cobertura de plan : ${plan.cobertura}</li>
                 </ul>
                 <button class="btn btn-block btn-primary text-uppercase" onclick="mostrarNuevoPlan('${plan.nombre}')">Seleccionar</button>
               </div>
             </div>
           </div>`;
        });
}

function mostrarNuevoPlan(nombreNuevoPlan)
{
    document.getElementById("nombrePlan").innerHTML= nombreNuevoPlan;
    nombrePlan.value = nombreNuevoPlan
    myModal2.show()
}

async function modificarPlan() {

    var correo = cardCuenta.textContent
    var correoArray= correo.split(":")
    correo= correoArray[1]

    const resultado = await db2
      .collection("usuario")
      .where("correo", "==", correo)
      .get();
  
      

      var validacion= validarCampo();
  
     if (validacion == false) {
     
      alerta.style.display = "block";
      textoValidacion.innerHTML = "Complete los campos ";
     
    } else{
     
      if (resultado.size != 0  && validacion != false)  {
          
        resultado.docs.forEach( async (doc)=>{
            console.log(doc.id)

           var info =  db2. collection("usuario").doc(doc.id)
           
           info.update({                   
            
                tarjeta: numTarjeta.value,
                plan: nombrePlan.value,
                beneficiarios: []
                });
        })
    
        limpiar();
        myModal2.hide()
        
      } else {
        limpiar();
        alerta.style.display = "block";
      }
     }
    }

    function limpiar() { 
    
        numTarjeta.value = "";
        myModal2.hide()
        alerta.style.display = "none";
      }