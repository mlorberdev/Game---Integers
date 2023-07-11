!(function () {

  const settings = document.getElementById("settings");
  const stats = document.getElementById("stats");
  const begin = document.getElementById("begin");
  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  let sound = document.getElementById("sound").checked;
  let vibes = document.getElementById("vibes").checked;
  let question, answer, diff = "med", n = 1, arr = [];
  
  // SETTINGS
  settings.addEventListener("click", () => {
    const opts = document.getElementById("options");
    opts.style.left = 0;
    document.getElementById("closeOptions").addEventListener("click", () => opts.style.left = "100vw");
  });

  // STATS
  document.getElementById("closeStats").addEventListener("click", () => stats.style.left = "100vw");


  // DARK MODE TOGGLE
  // let lights = false;
  // document.getElementById("lights").addEventListener("click", () => {
  //   const r = document.querySelector(':root');
  //   r.style.setProperty('--lite', lights === true ? '#fff' : '#000');
  //   r.style.setProperty('--dark', lights === true ? '#000' : '#fff');
  //   lights === true ? lights = false : lights = true;
  // });

  // TIMER
  begin.addEventListener("click", () => {
    const pr = document.getElementById("progress");
    // set attribute max on pr for duration
    const int = setInterval(() => { pr.value < 60 ? pr.value++ : dostats() }, 1000);
    function dostats() {
      clearInterval(int);
      // stats.innerHTML += arr;
      const frag = new DocumentFragment();
      for (let i = 0; i < arr.length - 1; i+=2) {
        let ele = document.createElement("li");
        ele.textContent = `${arr[i]} ${arr[i+1]}`;
        frag.appendChild(ele);
      }
      document.getElementById("list").appendChild(frag);
      setTimeout(() => stats.style.left = 0, 500);
    }
    gameStart();
  });

  // JUST SIGNS
  function gameStart() {
    begin.style.visibility = document.getElementById("subtitle").style.visibility = "hidden";
    const qq = document.getElementById("qq");
    document.getElementById("pos").addEventListener("click", () => ans(1));
    document.getElementById("zer").addEventListener("click", () => ans(0));
    document.getElementById("neg").addEventListener("click", ()=> ans(-1));
    
    function ask() {
      let a = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1);
      let b = Math.floor(Math.random() * 10);
      if (diff === "med") b *= Math.random() < .5 ? -1 : 1;
      let op = Math.random() < .5 ? "-" : "+";
      answer = op === "+" ? a + b : a - b;
      question = `${a} ${op} ${b}`;
      if (op === "-" && b < 0 && Math.random() < .5) question = `${a} ${op} (${b})`;
      
      arr.push(`${question} = ${answer}`);
      qq.innerHTML = question;
      n++;
    } ask();

    function ans(val) {
      if ((answer >= 0 && val === 1) || answer < 0 && val === -1 || answer === 0 && val === 0) {
        if (sound) right.play();
        if (vibes) navigator.vibrate(100);
        arr.push("✅");
      } else {
        if (sound) wrong.play();
        arr.push("❌");
      }
      ask();
    }
  }

})();