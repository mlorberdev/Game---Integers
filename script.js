!(function () {

  // VARS
  let tt = document.getElementById("time");


  // LISTENERS
  document.getElementById("multiplication").addEventListener("click", () => {
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("options-page").style.display = "inherit";
  });
  document.getElementById("addition").addEventListener("click", () => {
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("options-page").style.display = "inherit";
  });
  document.getElementById("begin").addEventListener("click", () => {
    document.getElementsByName("time").forEach(t => { if (t.checked) tt.innerHTML = 60 * t.value; });
    document.getElementById("options-page").style.display = "none";
    document.getElementById("working-page").style.display = "inherit";
  });

})();