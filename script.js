!(function () {

  ////////////// VARS
  const tt = document.getElementById("timer");
  let t;


  ////////////// LISTENERS

  // MULT-DIV
  document.getElementById("multiplication").addEventListener("click", () => {
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("options-page").style.display = "inherit";
  });
  // ADD-SUB
  document.getElementById("addition").addEventListener("click", () => {
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("options-page").style.display = "inherit";
  });
  // START TIMER
  document.getElementById("begin").addEventListener("click", () => {
    document.getElementsByName("time").forEach(c => {
      if (c.checked) {
        t = 60 * c.value;
      }
    });
    document.getElementById("options-page").style.display = "none";
    document.getElementById("working-page").style.display = "inherit";
    timer();
  });

  ///////////// TIMER
  function timer() {
    tt.innerHTML = t;
    const int = setInterval(() => { t > 0 ? tick() : clearInterval(int); }, 1000);
    const tick = () => { t--; tt.innerHTML = t; }
  }

  

})();