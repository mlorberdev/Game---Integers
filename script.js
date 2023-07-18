!(function () {


  document.querySelectorAll("input[name=torn]").forEach(e => e.addEventListener("click", function () {
    this.id === "nn" ? timed = false : timed = true;
    const qts = document.getElementsByClassName("qts");
    for (let i = 0; i < 3; i++) qts[i].innerHTML = timed === false ? ` ${30 * (i + 1)}q` : ` ${60 * (i + 1)}s`;
  }));

  

  const intro = document.getElementById("intro_page");
  const practice = document.getElementById("practice");
  const check = document.getElementById("ready_check");
  const pr = document.getElementById("progress");
  const stats = document.getElementById("stats");
  let op;
  document.querySelectorAll("input[name=operation]").forEach(o => { if (o.checked) op = o.value; });
  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  const arr = [];
  let sound = document.getElementById("sound");
  let vibes = document.getElementById("vibes");
  let timed;
  
  function progressSetup() {
    
  }

// go back
  // FULLSCREEN
  // document.getElementById("fullscreen").addEventListener("click", () => { document.body.requestFullscreen(); });

  // EXIT INTRO
  document.getElementById("start").addEventListener("click", function () {
    intro.classList.add("none");
    options.classList.remove("none");
  });

  // EXIT OPTIONS
  document.getElementById("set_options").addEventListener("click", function () {
    options.classList.add("none");
    check.classList.remove("none");
  });

  // READY CHECK
  document.getElementById("ready_check").addEventListener("click", function () {
    check.classList.add("none");
    practice.classList.remove("none");
  });

  // PRACTICE START
  document.getElementById("lets_go").addEventListener("click", function () {
    check.classList.add("none");
    practice.classList.remove("none");
    const int = setInterval(() => { pr.value < tt ? pr.value++ : stopTimer(int) }, 1000);
    const qq = document.getElementById("question");
    document.getElementById("nn").addEventListener("click", () => ans(-1));
    // document.getElementById("zz").addEventListener("click", () => ans(0));
    document.getElementById("pp").addEventListener("click", () => ans(1));


    function ask() {
      let a = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1);
      let b = Math.floor(Math.random() * 10);
      let Q, A, oo;
      if (diff === "med") b *= Math.random() < .5 ? -1 : 1;
      
      switch (op) {
        case "add": Q = `${a} + ${b}`; A = a + b; break;
        case "sub": Q = `${a} - ${b}`; A = a - b; break;
        case "aos":
          oo = Math.random() < .5 ? "-" : "+";
          Q = `${a} ${oo} ${b}`;
          A = oo === "-" ? A - B : A + B;
          break;
        case "mmm": Q = `${a} * ${b}`; A = a * b; break;
        case "ddd": Q = `${a} / ${b}`; A = a / b; break;
        case "mod":
          oo = Math.random() < .5 ? "*" : "/";
          Q = `${a} ${oo} ${b}`;
          A = oo === "*" ? A * B : A / B;
          break;
        default: 
      }

      arr.push(`${Q} = ${A}`);
      qq.innerHTML = Q;
      n++;
    } ask();

    function ans(val) {
      if ((answer >= 0 && val === 1) || answer < 0 && val === -1 || answer === 0 && val === 0) {
        if (sound.checked) right.play();
        if (vibes.checked) navigator.vibrate(100);
        arr.push("✅");
      } else {
        if (sound.checked) wrong.play();
        arr.push("❌");
      }
      ask();
    }

    // STOP TIMER AND UPDATE STATS PAGE
    function stopTimer(int) {
      clearInterval(int);
      const frag = new DocumentFragment();
      for (let i = 0; i < arr.length - 1; i += 2) {
        let ele = document.createElement("li");
        ele.textContent = `${arr[i]} ${arr[i + 1]}`;
        frag.appendChild(ele);
      }
      document.getElementById("list").appendChild(frag);
      setTimeout(() => stats.style.left = 0, 500);
    }

    // HELPERS
  });



})();