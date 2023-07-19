!(function () {
  // GLOBALS
  let nn; // Var <nn> --> number of seconds or questions; triggers session end
  let op; // Var <op> --> user choice from options: "add" is add/sub, "mult" is mult/div, "any" is any
  let arr = []; // Array holds questions and user responses, and x or check mark
  let timed = false; // Var <timed> --> true/false: is the session by time or by number of questions
  let int; // Var <int> --> timer for timed session nn, op;
  // Globals for DOM traversal & manipulation
  const intro = document.getElementById("intro_page");
  const skills = document.getElementById("skills");
  const check = document.getElementById("ready_check");
  const practice = document.getElementById("practice");
  const stats = document.getElementById("stats");
  const list = document.getElementById("list");
  const qq = document.getElementById("question");
  const pr = document.getElementById("progress");
  // Sound files
  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  // Globals for response behavior
  let sound = document.getElementById("sound");
  let vibes = document.getElementById("vibes");
  let score = 0;// Global for score
  let num = 0;// Global for number of questions asked in timed practice
  let Q; // Global question
  let A;// Global for answer to question
  let isReset = false; // Global for practicing again route

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

  // SAVE OPTIONS
  document.getElementById("set_options").addEventListener("click", function () {
    document.getElementsByName("time").forEach(t => { if (t.checked) nn = t.value }); // Updates var <nn> with either time units in seconds or number of questions
    timed === true ? nn *= 60 : nn *= 30;
    document.querySelectorAll("input[name=operation]").forEach(o => { if (o.checked) op = o.value; }); // Updates var <op> with operation set name
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
    options.classList.remove("none");
    isReset = true;
    arr = [];
  });

  // PRACTICE START
  document.getElementById("lets_go").addEventListener("click", letsGo);
  function letsGo() {

    // Interval for timed session updates progress bar on each tick; or, sets progress bar value to 1, for first question
    timed === true ? int = setInterval(() => { pr.value < pr.max ? pr.value++ : endPractice() }, 1000) : int = int;
    if (timed === false) pr.value = 1;

    // Elements in DOM listening for user input, i.e. answering questions
    if (isReset === false) {
      document.getElementById("nnn").addEventListener("click", () => ans(-1));
      document.getElementById("zzz").addEventListener("click", () => ans(0));
      document.getElementById("ppp").addEventListener("click", () => ans(1));
    }

    check.classList.add("none"); // Switch visible pages
    practice.classList.remove("none");
    ask();
  } // End of function letsGo


  function ask() {
    let a = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1); // First number in question
    let b = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1); // Second number in question
    let bb = Math.random() < .5 ? b : `(${b})`; // Text of numbers; either put grouping around second number or don't
    let thisop; // Operation for this question (each question)
    let sym; // Symbol for multiplication and division question
    if (timed === true) num++; // Increment number of questions asked on a timed practice
    if (op === "add") Math.random() < .5 ? thisop = "sub" : thisop = "add"; // Pick addition or subtraction when var <op> is "add"
    if (op === "mul") Math.random() < .5 ? thisop = "mul" : thisop = "div"; // Pick multiplication or division when var <op> is "mul"
    if (op === "any") { // When var <op> (operation) is "any" (choice from options), choose for this question
      let t = Math.floor(Math.random() * 4); // temp var
      switch (true) {
        case (t === 0): thisop = "add"; break;
        case (t === 1): thisop = "sub"; break;
        case (t === 2): thisop = "mul";
          let ts = Math.random();
          switch (true) {
            case (ts < .33): sym = "*"; break;
            case (ts >= .33 && ts < .66): sym = "•"; break;
            case (ts >= .66): sym = "×"; break;
            default: break;
          }; break;
        case (t === 3): thisop = "div"; sym = Math.random() < .5 ? "/" : "÷";; break;
        default: break;
      }
    }

    switch (thisop) { // Create question and answer
      case "sub": Q = `${a} - ${bb}`; A = a - b; break;
      case "add": Q = `${a} + ${bb}`; A = a + b; break;
      case "mul": Q = `${a} ${sym} ${bb}`; A = a * b; break;
      case "div":
        if (b === 0) { // Case where divisor would be 0
          b = Math.floor(Math.random() * 9) + 1; // Switch b to a number > 0
          bb = Math.random() < .5 ? b : `(${b})`;
        };
        Q = `${a} ${sym} ${bb}`;
        A = a / b; break;
      default: break;
    }
    qq.innerHTML = Q;
    console.log(pr.value,Q, A);
  }

  function ans(val) { // Evaluate answers
    if ((val === 1 && A > 0) || (val === 0 && A === 0) || (val === -1 && A < 0)) { // Correct answer
      if (sound.checked) right.play();
      if (vibes.checked) navigator.vibrate(100);
      arr.push(`✅${Q} = ${A}`);
      score++;
    }
    else { // Incorrect answer
      if (sound.checked) wrong.play();
      if (vibes.checked) {
        navigator.vibrate(100);
        setTimeout(navigator.vibrate(100), 50);
      }
      arr.push(`❌${Q} = ${A}`);
    }
    if (pr.value < pr.max) {
      if (timed === false) pr.value++;
      ask();
    } else {
      endPractice();
    }
  } // End of function ans

  function endPractice() { // End practice session and display stats page
    console.log("arr.length", arr.length);
    if (timed === true) clearInterval(int);
    const frag = new DocumentFragment(); // Write answers array to DOM
    for (let i = 0; i < arr.length; i ++) {
      let ele = document.createElement("li");
      ele.textContent = `${arr[i]}`;
      frag.appendChild(ele);
    }
    list.appendChild(frag); // Update DOM
    document.getElementById("correct").innerHTML = score;
    document.getElementById("total").innerHTML = (timed === false ? pr.max : num - 1);
    document.getElementById("percent").innerHTML = `${Math.floor(score / (timed === false ? pr.max : num - 1) * 100)} %`;
    practice.classList.add("none"); // Switch visible pages
    stats.classList.remove("none");
  } // End of function endPractice

})();