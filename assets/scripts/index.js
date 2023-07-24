!(function mathfacts() {
  // VARS
  const intro = document.getElementById("intro_page");
  const skills = document.getElementById("skills");
  const check = document.getElementById("ready_check");
  let nn; // Var <nn> --> number of seconds or questions; triggers session end
  let isReset = false; // Global for practicing again route
  let op; // Var <op> --> user choice from options: "add" is add/sub, "mult" is mult/div, "any" is any
  const right = new Audio("./assets/sounds/right.mp3");
  const wrong = new Audio("./assets/sounds/wrong.mp3");
  const qqq = document.getElementById("question");
  const aaa = document.getElementById("answer");
  const neg = document.getElementById("neg");
  const vtt = document.getElementById("vtt");
  const vff = document.getElementById("vff");
  let timed = document.getElementById("tt").checked;
  let vibes = document.getElementById("vibes").checked;
  let sound = document.getElementById("sound").checked;
  let pr = document.getElementById("progress");
  let a, b, c, int, Q, A, arr = [], score = 0, num = 0, kbd, kk;
  const rn = (z, plus) => { plus ||= 0; return Math.floor(Math.random() * z) + plus; }
  const pn = () => { return Math.random() < .5 ? -1 : 1; }

  // Listens to options page choices and updates DOM options page radio group
  // If the option for a timed session is chosen, updates the var <timed>
  document.querySelectorAll("input[name=torn]").forEach(e => e.addEventListener("click", function () {
    this.id === "nn" ? timed = false : timed = true;
    for (let i = 0; i < 3; i++) document.getElementsByClassName("qts")[i].innerHTML = timed === false ? ` ${30 * (i + 1)} q` : ` ${60 * (i + 1)} s`;
  }));

  // FULLSCREEN
  // document.getElementById("fullscreen").addEventListener("click", () => { document.body.requestFullscreen(); });

  // EXIT INTRO
  document.getElementById("start").addEventListener("click", function () {
    intro.classList.add("none"); // Switch to next screen
    skills.classList.remove("none");
  });

  // CLOSE SKILLS & OPEN OPTIONS
  document.getElementById("set_skills").addEventListener("click", function () {

    // if (document.getElementById("f1").checked) { // f1 is timestable
    // document.getElementById("ttt").style.display = "none";
    // }
    skills.classList.add("none");// Switch to next screen
    options.classList.remove("none");
  });

  // SAVE OPTIONS
  document.getElementById("set_options").addEventListener("click", function () {
    document.getElementsByName("time").forEach(t => { if (t.checked) nn = t.value }); // Updates var <nn> with either time units in seconds or number of questions
    timed === true ? nn *= 60 : nn *= 30;
    document.getElementById("byTime").innerHTML = nn; // Updates DOM on options confirmation page and progress bar max
    document.getElementById("units").innerHTML = timed === true ? " seconds / segondos" : " questions / preguntas";
    document.getElementById("progress").max = nn;
    options.classList.add("none");// Switch to next screen
    check.classList.remove("none");
  });

  // GO BACK TO SKILLS
  document.getElementById("goback_toskills").addEventListener("click", function () {
    options.classList.add("none"); // Switch to previous screen
    skills.classList.remove("none");
  })

  // GO BACK TO OPTIONS
  document.getElementById("goback").addEventListener("click", function () {
    check.classList.add("none"); // Switch to previous screen
    options.classList.remove("none");
  })

  // PRACTICE AGAIN
  document.getElementById("go_again").addEventListener("click", function () {
    if (isReset === false) { document.getElementById("lets_go").addEventListener("click", letsGo); }
    // list.innerHTML += "<hr class='width'>"; // Visually separate new list
    pr.value = 0;
    list.innerHTML = "";
    score = 0;
    num = 0;
    stats.classList.add("none"); // Switch to options screen
    skills.classList.remove("none");
    isReset = true;
    arr = [];
  });

  // PRACTICE START
  document.getElementById("lets_go").addEventListener("click", function () {
    check.classList.add("none"); // Switch visible pages
    document.querySelectorAll("input[name=skill]").forEach(o => { if (o.checked) { op = o.value; } }); // Updates var <op> with operation set name
    console.log(op);
    mathfacts();
    practice.classList.remove("none");
  });




  // Interval for timed session updates progress bar on each tick; or, sets progress bar value to 1, for first question
  timed === true ? int = setInterval(() => { pr.value < pr.max ? pr.value++ : endPractice() }, 1000) : int = int;
  if (!timed) pr.value = 1;
  // Check for practice type
  document.querySelectorAll("input[name=skill]").forEach(s => { if (s.checked) op = s.value });
  op === "mul_int" ? (kbd = "signs_pad", kk = "#signs_pad>div") : (kbd = "keyboard", kk = "#keyboard>div");
  document.getElementById(kbd).classList.remove("none"); // Unhide keyboard
  document.querySelectorAll(kk).forEach(key => key.addEventListener("click", evalKey));

  function ask() {
    let sym;
    switch (op) {
      case "add_int":
        showNeg();
        a = rn(10) * pn();
        b = rn(10) * pn();
        c = pn() === 1 ? b : `(${b})`;
        if (pn() === 1) { Q = `${a} + ${c}`; A = a + b; }
        else { Q = `${a} - ${c}`, A = a - b; }
        break;
      case "mul_int":
        a = rn(10) * pn();
        b = rn(10) * pn();
        switch (rn(8)) {
          case 0: sym = "•"; break;
          case 1: sym = "*"; break;
          case 2: sym = "×"; break;
          case 3: sym = "0"; break;
          case 4: case 5: sym = "/"; if (b === 0) b = 1; break;
          case 6: case 7: sym = "÷"; if (b === 0) b = 1; break;
          default: break;
        }
        Q = sym === "0" ? `(${a})(${b})` : `${a} ${sym} ${b}`;
        A = (sym === "/" || sym === "÷") ? a / b : a * b;
        break;
      case "timestable":
        a = rn(11);
        b = rn(11);
        Q = `${a} × ${b}`;
        A = a * b;
        break;
      case "numberfamilies":
        a = rn(10) + 1;
        b = rn(10) + 1;
        Q = `${a} , ${a * b}`;
        A = b;
        break;
      case "maketens":
        a = rn(11);
        Q = `${a}`;
        A = 10 - a;
        break;
      case "onestep":
        showX();
        a = rn(10) + 1; // Else questions such as 0x = 0 would be asked, where x can be anything
        b = rn(10) + 1;
        sym = rn(2); // nb: can use for symbols ie prob types
        switch (sym) {
          case 0: Q = `${a}x = ${a * b}`; A = b; break; // div prop
          case 1: Q = `${a * b} = ${a}x`; A = b; break; // div prop
          default: break;
        }
      case "twostep":
      // Q = `${a}x = ${a * b}x<sup>2</sup> ; x = ...`; A = b; break; // div prop
      default: break;
    }
    if (timed) num++; // increments the number of questions asked in timed practice
    qqq.innerHTML = Q;
  } ask();

  function showX() { document.getElementById("showx").classList.remove("none"); }
  function showNeg() { document.querySelectorAll(".int_key").forEach(e => e.classList.remove("none")); }

  function evalKey() {
    let key = this.id.toString().charAt(1);
    switch (key) {
      case "n": neg.innerHTML === "-" ? neg.innerHTML = "" : neg.innerHTML = "-"; break;
      case "p": if (neg.innerHTML === "-") neg.innerHTML = ""; break;
      case "c": if (aaa.innerHTML.length > 0) ans(); break;
      case "b": let ai = aaa.innerHTML.toString(); aaa.innerHTML = ai.slice(0, ai.length - 1); break;
      case "N": case "Z": case "P": ans(key); break;
      default: aaa.innerHTML += key; break;
    }
  }

  function ans(u) {
    let aa = parseInt(aaa.innerText);
    let zz = neg.innerHTML;
    switch (true) {
      case (aa === A && zz === ""):
      case (aa === -A && zz === "-" && A !== 0):
      case (u === "N" && A < 0):
      case (u === "Z" && A === 0):
      case (u === "P" && A > 0):
        arr.push(`[${aaa.innerHTML}] ✅ ${Q} = ${A}`);
        score++;
        if (sound) right.play();
        vtt.style.display = "flex";
        setTimeout(() => {
          vtt.style.display = "none";
          stayOrGo();
        }, 250);
        if (vibes) navigator.vibrate(100);
        break;
      default:
        arr.push(`[${aaa.innerHTML}] ❌ ${Q} = ${A}`);
        if (sound) wrong.play();
        vff.style.display = "flex";
        setTimeout(() => {
          vff.style.display = "none";
          stayOrGo();
        }, 250);
        break;
    }

    function stayOrGo() {
      aaa.innerHTML = "";
      neg.innerHTML = "";
      if (pr.value < pr.max) {
        if (timed === false) pr.value++;
        ask();
      } else {
        endPractice();
      }
    }

  }

  function endPractice() { // End practice session and display stats page
    if (timed) clearInterval(int);
    const frag = new DocumentFragment(); // Write answers array to DOM
    for (let i = 0; i < arr.length; i++) {
      let ele = document.createElement("li");
      ele.textContent = `${arr[i]}`;
      frag.appendChild(ele);
    }
    document.getElementById("list").appendChild(frag); // Update DOM
    document.getElementById("correct").innerHTML = score;
    document.getElementById("total").innerHTML = (timed === false ? pr.max : num - 1);
    document.getElementById("percent").innerHTML = `${Math.floor(score / (timed === false ? pr.max : num - 1) * 100)} %`;
    document.getElementById("practice").classList.add("none"); // Switch visible pages
    document.getElementById("stats").classList.remove("none");
  } // End of function endPractice


})();