const URLepisodio = "https://rickandmortyapi.com/api/episode/";
$("#episodio").click(() => {
  $.get(
    URLepisodio + Math.floor(Math.random() * (52 - 1) + 1),
    function (res, req) {
      if (req === "success") {
        let informacion = res;
        console.log(informacion);

        $("#capitulos").prepend(`
        <div class="capitulo">

          <strong>Title: </strong> ${informacion.name}
          <br />
          <strong>Episode: </strong> ${informacion.episode}
          <br />
          <strong>Air-date: </strong> ${informacion.air_date}
          <br />
        </div>
        `);
      }
    }
  );
});
