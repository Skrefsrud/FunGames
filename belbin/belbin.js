function showModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  }

  document.getElementById("openModal1").addEventListener("click", function () {
    showModal("modal1");
  });
  document.getElementById("openModal2").addEventListener("click", function () {
    showModal("modal2");
  });
  document.getElementById("openModal3").addEventListener("click", function () {
    showModal("modal3");
  });
  document.getElementById("openModal4").addEventListener("click", function () {
    showModal("modal4");
  });
  document.getElementById("openModal5").addEventListener("click", function () {
    showModal("modal5");
  });
  document.getElementsByClassName("close")[0].addEventListener("click", function () {
    closeModal("modal1");
  });
  document.getElementsByClassName("close")[1].addEventListener("click", function () {
    closeModal("modal2");
  });
  document.getElementsByClassName("close")[2].addEventListener("click", function () {
    closeModal("modal3");
  });
  document.getElementsByClassName("close")[3].addEventListener("click", function () {
    closeModal("modal4");
  });
  document.getElementsByClassName("close")[4].addEventListener("click", function () {
    closeModal("modal5");
  });