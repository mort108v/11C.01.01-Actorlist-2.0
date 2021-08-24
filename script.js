  let json;
  let actor;
  let temp = document.querySelector("template");

  let filter = "all";

  let listPointer = document.querySelector(".list");

  let buttonActive = document.querySelector("button.filter.active");
  console.log(buttonActive);

  document.addEventListener("DOMContentLoaded", getData);

  const link = "actors.json";

  async function getData() {
      const response = await fetch(link);
      json = await response.json();
      addEventListenerToButtons();
      show(json);
  }

  function show() {

      listPointer.innerHTML = "";

      //Run through array "actors"
      json.forEach(actor => {

          if (filter == "home" || filter == actor.info) {
              console.log(filter);

              const clone = temp.cloneNode(true).content;
              clone.querySelector("h3").textContent = actor.fullname;
              clone.querySelector(".in-movie").textContent = actor.movie;

              clone.querySelector("article").addEventListener("click", () => showPopUp(actor));

              listPointer.appendChild(clone);
          };
      })
  }

  let popUp = document.querySelector("#popup");
  //close PopUp on click --> close
  document.querySelector("#close").addEventListener("click", () => popup.style.display = "none");

  //Show PopUp in detail from API 
  function showPopUp(actor) {
      console.log(actor);

      popup.style.display = "block";
      popup.querySelector("h3").textContent = actor.fullname;
      popup.querySelector(".in-movie").textContent = actor.movie;
  }

  function addEventListenerToButtons() {
      document.querySelectorAll(".filter").forEach((btn) => {
          btn.addEventListener("click", filterBTNs);
      });
  }

  function filterBTNs() {
      filter = this.dataset.actor;
      document.querySelector("h2").textContent = this.innerHTML;
      document.querySelectorAll(".filter").forEach((btn) => {
          btn.classList.remove("active");
      })
      this.classList.add("active");

      buttonActive = document.querySelector("button.filter.active");

      show(json);
  }

  getData();