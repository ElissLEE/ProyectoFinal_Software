const db = firebase.firestore();
const card= document.getElementById("informacion");


const getPlanes= () => db.collection('planes').get();

window.addEventListener('DOMContentLoaded', async (e) => {

    const querySnapshot = await getPlanes();
     querySnapshot.forEach(doc => {
         plan= doc.data();
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
           <a href="#" class="btn btn-block btn-primary text-uppercase">Comprar</a>
         </div>
       </div>
     </div>`
    })
})