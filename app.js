const db = firebase.firestore();
const card = document.getElementById("informacion");

const getPlanes = () => db.collection("planes").get();
const nombreCompleto = document.getElementById("texto-nombre");
const cedulaU = document.getElementById("texto-cedula");
const numTarjeta = document.getElementById("texto-tarjeta");
const email = document.getElementById("texto-correo");
const contrasenia = document.getElementById("texto-contrasenia");
const nombrePlan = document.getElementById("texto-plan");
const alerta = document.getElementById("verificacion");
const textoValidacion = document.getElementById("textoValidacion");

var myModal1 = new bootstrap.Modal(document.getElementById('modal'), {
  keyboard: false
})
window.addEventListener("DOMContentLoaded", async (e) => {
  const querySnapshot = await getPlanes();
  querySnapshot.forEach((doc) => {
    plan = doc.data();
    plan.id = doc.id;

    card.innerHTML += ` <div class="col-lg-4">
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
           <button class="btn btn-block btn-primary text-uppercase" onclick="mostrarPlan('${plan.nombre}')">Comprar</button>
         </div>
       </div>
     </div>`;
  });
});

async function obtenerPlan() {
 
  const resultado = await db
    .collection("usuario")
    .where("correo", "==", email.value)
    .get();

    var validacion= validarCampos();

   if (validacion == false) {
   
    alerta.style.display = "block";
    textoValidacion.innerHTML = "Complete todos los campos ";
   
  } else{
   
    if (resultado.size == 0 && validacion != false)  {
      var beneficiarios=new Array(0);
      db.collection("usuario").add({
        nombre: nombreCompleto.value,
        cedula: cedulaU.value,
        correo: email.value,
        password: contrasenia.value,
        tarjeta: numTarjeta.value,
        plan: nombrePlan.value,
        beneficiarios : beneficiarios
      });

      auth
        .createUserWithEmailAndPassword(email.value, contrasenia.value)
        .then(userCredential =>  {
          limpiar();
          myModal1.hide()
        })
      
    } else {
      limpiar();
      alerta.style.display = "block";
      textoValidacion.innerHTML = "Ya esta registrado con un plan";
    }
   }
  
}

function limpiar() {
  nombreCompleto.value = "";
  cedulaU.value = "";
  numTarjeta.value = "";
  email.value = "";
  contrasenia.value = "";
  alerta.style.display = "none";
  myModal1.hide()
}

function mostrarPlan(plan) {
  document.getElementById("texto-plan").value = plan;
  myModal1.show()
}

//Login Check
const loggedOut = document.querySelectorAll('.logged-out')
const loggedIn = document.querySelectorAll('.logged-in')
const loginCheck = user => {
    if(user){
        loggedIn.forEach(link => link.style.display = 'block');
        loggedOut.forEach(link => link.style.display = 'none');

    } else {
        loggedIn.forEach(link => link.style.display = 'none');
        loggedOut.forEach(link => link.style.display = 'block');
    }
}

// Login 
const loginForm = document.querySelector('#login-form')
  
var myModal2 = new bootstrap.Modal(document.getElementById('loginModal'), {
  keyboard: false
})

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email= document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {

     //Clear the Form
     loginForm.reset();

     //Close Modal 
     myModal2.hide()
     console.log('Logueado');
    })
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