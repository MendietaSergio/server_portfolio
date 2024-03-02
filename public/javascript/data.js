window.addEventListener("load", () => {
  console.log("asdasd");
  let rutaActual = document.querySelector("#ruta_actual");
  let year = document.querySelector("#footer_year")
  const moonLanding = new Date();
  console.log(window.location.href);

  rutaActual.innerHTML = window.location.href;
  year.innerHTML = moonLanding.getFullYear();
  console.log(moonLanding.getFullYear());
});
