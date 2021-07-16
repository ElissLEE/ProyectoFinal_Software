const nombre = document.getElementById("texto-nombre");
const cedula = document.getElementById("texto-cedula");
const tarjeta = document.getElementById("texto-tarjeta");
const correo = document.getElementById("texto-correo");
const password = document.getElementById("texto-contrasenia");
const alertav = document.getElementById("verificacion");
const texto = document.getElementById("textoValidacion");
const tarjeta2 = document.getElementById("texto-Tarjeta");

function soloLetras(e){

  key= e.keyCode || e.which;
  tecla= String.fromCharCode(key).toString();
  letras="abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (letras.indexOf(tecla)== -1) {
     alerta.style.display = "block";
     textoValidacion.innerHTML = "ingrese solo letras ";
  }
  else{
    alerta.style.display = "none";
  }
}

function soloNumeros(e){

  key= e.keyCode || e.which;
  tecla= String.fromCharCode(key).toString();
  letras="0123456789";

  if (letras.indexOf(tecla)== -1) {
    alerta.style.display = "block";
    textoValidacion.innerHTML = "ingrese solo numeros";
  }
  else{
    alerta.style.display = "none";
  }
}

function limpia() {

  var val = document.getElementById("texto-nombre").value;
  var tam = val.length;
 
  for(i = 0; i < tam; i++) {
      if(isNaN(val[i]))
          document.getElementById("texto-nombre").value = '';
  }
 
}

function validarCampos(){

    if ( correo.value!= "" && nombre.value !="" && cedula.value !="" && tarjeta.value !=""  && password.value !="")  {
      return true;
    } 
    return false;  
  }

  function validarCampo(){

    if ( tarjeta2.value !="")  {
      return true;
    } 
    return false;  
  }
