console.log("cargado correctamente cartelera - section");

document.addEventListener("DOMContentLoaded", () => {
  const genero = document.getElementById("filtro-genero");
  const fecha = document.getElementById("filtro-fecha");
  const ubicacion = document.getElementById("filtro-ubicacion");
  const obras = document.querySelectorAll(".obra-card");
  const alertContainer = document.getElementById("alert-container");

  document.querySelectorAll(".mini-calendario").forEach(cal => {
    const fechaEvento = new Date(cal.dataset.fechas);
    const dia = fechaEvento.getDate();
    const dias = Array.from({ length: 7 }, (_, i) => i + dia - 3);
    dias.forEach(d => {
      const span = document.createElement("span");
      span.textContent = d > 0 ? d : "";
      if (d === dia) span.classList.add("activo");
      cal.appendChild(span);
    });
  });

  function filtrar() {
    let found = false;

    obras.forEach(card => {
      const matchGenero = !genero.value || card.dataset.genero === genero.value;
      const matchFecha = !fecha.value || card.dataset.fecha.startsWith(fecha.value);
      const matchUbicacion = !ubicacion.value || card.dataset.ubicacion === ubicacion.value;

      const match = matchGenero && matchFecha && matchUbicacion;
      card.style.display = match ? "" : "none"; 




      if (match) found = true;
    });

    if (!found) {
      alertContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          No se encontraron carteleras disponibles con los filtros seleccionados.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    } else {
      alertContainer.innerHTML = "";
    }
  }

  [genero, fecha, ubicacion].forEach(el => {
    if(el) el.addEventListener("change", filtrar);
  });

  filtrar(); 

  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalImg = document.getElementById("modal-img");

  document.querySelectorAll(".ver-mas").forEach(btn => {
    btn.addEventListener("click", () => {
      modalTitle.textContent = btn.dataset.title;
      modalDesc.textContent = btn.dataset.desc;
      modalImg.src = btn.dataset.img;
    });
  });
});
