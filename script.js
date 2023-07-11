!(function () {

  const begin = document.getElementById("begin");
  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  let question, answer, diff = "med", n = 1, arr = [];
  

  // DARK MODE TOGGLE
  // let lights = false;
  // document.getElementById("lights").addEventListener("click", () => {
  //   const r = document.querySelector(':root');
  //   r.style.setProperty('--lite', lights === true ? '#fff' : '#000');
  //   r.style.setProperty('--dark', lights === true ? '#000' : '#fff');
  //   lights === true ? lights = false : lights = true;
  // });

  // START TIMER
  begin.addEventListener("click", () => {
    const pr = document.getElementById("progress");
    // set attribute max on pr for duration
    const int = setInterval(() => { pr.value < 60 ? pr.value++ : clearInterval(int); }, 1000);
    gameStart();
  });

  // JUST SIGNS
  function gameStart() {
    begin.style.visibility = document.getElementById("subtitle").style.visibility = "hidden";
    const qq = document.getElementById("qq");
    document.getElementById("pos").addEventListener("click", ()=> ans(1));
    document.getElementById("neg").addEventListener("click", ()=> ans(-1));
    
    function ask() {
      let a = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1);
      let b = Math.floor(Math.random() * 10); console.log(b);
      if (diff === "med") b *= Math.random() < .5 ? -1 : 1;
      let op = Math.random() < .5 ? "-" : "+";
      answer = op === "+" ? a + b : a - b;
      question = `${a} ${op} ${b}`;
      if (op === "-" && b < 0 && Math.random() < .5) question = `${a} ${op} (${b})`;
      
      // arr.push(n, `${question} = ${answer}`);
      console.log(n, `${question} = ${answer}`);
      qq.innerHTML = question;
      n++;
    } ask();

    function ans(val) {
      if ((answer >= 0 && val === 1) || answer < 0 && val === -1) {
        right.play();
      } else {
        wrong.play();
      }
      ask();
    }
  }

})();