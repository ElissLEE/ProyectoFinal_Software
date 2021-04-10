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
             <li><span class="fa-li"><i class="fas fa-check"></i></span>cantidad de beneficiarios: ${plan.cantBeneficiarios}</li>
             <li><span class="fa-li"><i class="fas fa-check"></i></span>5GB Storage</li>
             <li><span class="fa-li"><i class="fas fa-check"></i></span>Unlimited Public Projects</li>
             <li><span class="fa-li"><i class="fas fa-check"></i></span>Community Access</li>
             <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Unlimited Private Projects</li>
             <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Dedicated Phone Support</li>
             <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Free Subdomain</li>
             <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Monthly Status Reports</li>
           </ul>
           <button class="btn btn-block btn-primary text-uppercase" onclick="mostrarPlan('${plan.id}')">Comprar</button>
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

  if (resultado.size == 0) {
    db.collection("usuario").add({
      nombre: nombreCompleto.value,
      cedula: cedulaU.value,
      correo: email.value,
      password: contrasenia.value,
      tarjeta: numTarjeta.value,
      plan: nombrePlan.value,
    });

    limpiar();
    $("#modal").modal("hide");
    
  } else {
   
    alerta.style.display = "block";
    textoValidacion.innerHTML = "Ya esta registrado con un plan";
  }
}

function limpiar() {
  nombreCompleto.value = "";
  cedulaU.value = "";
  numTarjeta.value = "";
  email.value = "";
  contrasenia.value = "";

  alerta.style.display = "none";
}

function mostrarPlan(plan) {
  document.getElementById("texto-plan").value = plan;

  $("#modal").modal("show");
}
