!(function () {


  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  

  // DARK MODE TOGGLE
  // let lights = false;
  // document.getElementById("lights").addEventListener("click", () => {
  //   const r = document.querySelector(':root');
  //   r.style.setProperty('--lite', lights === true ? '#fff' : '#000');
  //   r.style.setProperty('--dark', lights === true ? '#000' : '#fff');
  //   lights === true ? lights = false : lights = true;
  // });

  // START TIMER
  document.getElementById("begin").addEventListener("click", () => {
    const pr = document.getElementById("progress");
    // set attribute max on pr for duration
    const int = setInterval(() => { pr.value < 60 ? pr.value++ : clearInterval(int); }, 1000);
    gameStart();
  });

  // JUST SIGNS
  function gameStart() {
    const qq = document.getElementById("qq");
    let p = document.getElementById("pos");
    let n = document.getElementById("neg");
    
    function askQ() {
      let a = Math.floor(Math.random() * 10);
      let b = Math.floor(Math.random() * 10);
      let o = Math.random() < .5 ? "-" : "+";
      let s = 0 === "-" ? a - b : a + b; console.log(s);
      qq.innerHTML = `${a.toString()} ${o} ${b.toString()}`;
      p.addEventListener("click", () => {
        s > 0 ? right.play() : wrong.play();
      });
      n.addEventListener("click", () => {
        s < 0 ? right.play() : wrong.play();
      });
    } askQ();
  }

})();