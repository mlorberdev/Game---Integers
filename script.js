!(function () {

  const burger = document.getElementById("hamburger");
  const stats = document.getElementById("stats");
  const begin = document.getElementById("start");
  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  const arr = [];
  let sound = document.getElementById("sound");
  let vibes = document.getElementById("vibes");
  let question,
    answer,
    diff = "med",
    n = 1,
    tt;
  
  // OPTIONS
  burger.addEventListener("click", function () {
    const opts = document.getElementById("options");
    if (this.classList.contains("rotate")) {
      this.classList.remove("rotate");
      opts.style.left = 0;
      open = true;
    } else {
      this.classList.add("rotate");
      opts.style.left = "100vw";
      open = false;
    }
  });

  // TIMER
  begin.addEventListener("click", () => {
    const pr = document.getElementById("progress");
    document.querySelectorAll("[name=timer]").forEach(t => {
      if (t.checked) {
        tt = t.value;
        pr.setAttribute("max", tt);
      }
    });
    const int = setInterval(() => { pr.value < tt ? pr.value++ : dostats(int) }, 1000);
    gameStart();
  });

  // JUST SIGNS
  function gameStart() {
    begin.style.visibility = document.getElementById("subtitle").style.visibility = "hidden";
    const qq = document.getElementById("question");
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
        if (sound.checked) right.play();
        if (vibes.checked) navigator.vibrate(100);
        arr.push("✅");
      } else {
        if (sound.checked) wrong.play();
        arr.push("❌");
      }
      ask();
    }
  }

  // UPDATE STATS PAGE
  function dostats(int) {
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

})();