!(function () {

  // OVERVIEW
  // Var <timed> --> true/false, is the session by time or by number of questions
  let timed = false;
  // Var <int> --> timer for timed session
  let int = false;
  // Var <nn> --> number of seconds or questions; triggers session end
  let nn = 0;
  // Var <op> --> mathematical operation performed in each question
  let op;
  // User response and question array
  const arr = [];
  // Answer to each question
  let A;

  // Listens to options page choices and updates DOM options page radio group
  // If the option for a timed session is chosen, updates the var <timed>
  document.querySelectorAll("input[name=torn]").forEach(e => e.addEventListener("click", function () {
    this.id === "nn" ? timed = false : timed = true;
    for (let i = 0; i < 3; i++) document.getElementsByClassName("qts")[i].innerHTML = timed === false ? ` ${30 * (i + 1)}q` : ` ${60 * (i + 1)}s`;
  }));

  // Globals for DOM traversal & manipulation
  const intro = document.getElementById("intro_page");
  const practice = document.getElementById("practice");
  const check = document.getElementById("ready_check");
  const stats = document.getElementById("stats");
  const qq = document.getElementById("question");
  const pr = document.getElementById("progress");
  // Sound files
  const right = new Audio("./right.mp3");
  const wrong = new Audio("./wrong.mp3");
  // Globals for response behavior
  let sound = document.getElementById("sound");
  let vibes = document.getElementById("vibes");
  // Global for score
  let score = 0;

  // FULLSCREEN
  // document.getElementById("fullscreen").addEventListener("click", () => { document.body.requestFullscreen(); });

  // EXIT INTRO
  document.getElementById("start").addEventListener("click", function () {
    // Switch to next screen
    intro.classList.add("none");
    options.classList.remove("none");
  });

  // SAVE OPTIONS
  document.getElementById("set_options").addEventListener("click", function () {

    // Updates var <nn> with either time units in seconds or number of questions
    document.getElementsByName("time").forEach(t => { if (t.checked) nn = t.value });
    timed === true ? nn *= 60 : nn *= 30;

    // Updates var <op> with operation set name
    document.querySelectorAll("input[name=operation]").forEach(o => { if (o.checked) op = o.value; });

    // Updates DOM on options confirmation page and progress bar max
    document.getElementById("byTime").innerHTML = nn;
    document.getElementById("units").innerHTML = timed === true ? " seconds / segondos" : " questions / preguntas";
    document.getElementById("progress").max = nn;

    // Switch to next screen
    options.classList.add("none");
    check.classList.remove("none");
  });

  // GO BACK TO OPTIONS
  document.getElementById("goback").addEventListener("click", function () {

    // Switch to previous screen
    check.classList.add("none");
    options.classList.remove("none");
  })

  // PRACTICE START
  document.getElementById("lets_go").addEventListener("click", function () {
    console.log(timed); return;
    // Interval for timed session; updates progress bar on each tick
    timed === true ? int = setInterval(() => { pr.value < tt ? pr.value++ : stopTimer(int) }, 1000) : int = int;

    // Elements in DOM listening for user input, i.e. answering questions
    document.getElementById("nnn").addEventListener("click", () => ans(-1));
    document.getElementById("zzz").addEventListener("click", () => ans(0));
    document.getElementById("ppp").addEventListener("click", () => ans(1));

    // Ask questions
    function ask() {
      // Operation for this question (each question)
      let thisop;
      // Symbol for multiplication and division question
      let sym;

      // When var <op> (operation) is "any" (choice from options), choose
      if (op === "any") {
        let t = Math.floor(Math.random() * 4);
        switch (true) {
          case (t === 0): thisop = "add"; break;
          case (t === 1): thisop = "sub"; break;
          case (t === 2): thisop = "mul"; pickMul(); break;
          case (t === 3): thisop = "div"; pickDiv(); break;
          default: break;
        }
      }

      // Pick addition or subtraction when var <op> is "add", by changing "add" to "sub"
      if (op === "add") {
        if (Math.random() < .5) {
          thisop = "sub";
        } else {
          thisop = "add";
        }
      }

      // Pick multiplication or division when var <op> is "mul", by changing "mul" to "div"
      if (op === "mul") {
        if (Math.random() < .5) {
          thisop = "mul";
          pickMul();
        } else {
          thisop = "div";
          pickDiv();
        }
      }

      // Pick multiplication symbol
      function pickMul() {
        let ts = Math.random();
        switch (true) {
          case (ts < .33): sym = "*"; break;
          case (ts >= .33 && ts < .66): sym = "•"; break;
          case (ts >= .66): sym = "×"; break;
          default: break;
        }
      }

      // Pick division symbol
      function pickDiv() {
        sym = Math.random() < .5 ? "/" : "÷";
      }

      // Numbers a, first, and b, second; randomly, can be positive or negative
      let a = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1);
      let b = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1);

      // Text of numbers; either put grouping around second number or don't
      let bb = Math.random() < .5 ? b : `(${b})`;

      // Create question <Q> and answer <A>
      let Q;
      switch (thisop) {
        case "sub": Q = `${a} - ${bb}`; A = a - b; break;
        case "add": Q = `${a} + ${bb}`; A = a + b; break;
        case "mul": Q = `${a} ${sym} ${bb}`; A = a * b; break;
        case "div":
          if (b === 0) {
            b = Math.floor(Math.random() * 9) + 1;
            bb = Math.random() < .5 ? b : `(${b})`;
          };
          Q = `${a} ${sym} ${bb}`;
          A = a / b; break;
        default: break;
      }

      arr.push(`${Q} = ${A}`);
      qq.innerHTML = Q;
    } ask();

    function ans(val) {
      if ((val === 1 && A > 0) || (val === 0 && A === 0) || (val === -1 && A < 0)) {
        if (sound.checked) right.play();
        if (vibes.checked) navigator.vibrate(100);
        arr.push("✅");
        score++;
      }
      else {
        if (sound.checked) wrong.play();
        if (vibes.checked) {
          navigator.vibrate(100);
          setTimeout(navigator.vibrate(100), 50);
        }
        arr.push("❌");
      }
      if (pr.value < pr.max) {
        if (timed === false) pr.value++;
        ask();
      } else {
        endPractice();
      }
    }

    // End practice session and display stats page
    function endPractice() {
      // clearInterval(int);
      const frag = new DocumentFragment();
      for (let i = 0; i < arr.length - 1; i += 2) {
        let ele = document.createElement("li");
        ele.textContent = `${arr[i]} ${arr[i + 1]}`;
        frag.appendChild(ele);
      }
      document.getElementById("list").appendChild(frag);
      document.getElementById("correct").innerHTML = score;
      document.getElementById("total").innerHTML = pr.max;
      document.getElementById("percent").innerHTML = `${Math.floor(score / pr.max * 100)} %`;


      // Switch pages
      practice.classList.add("none");
      stats.classList.remove("none");
    }

    // Switch pages
    check.classList.add("none");
    practice.classList.remove("none");
  });

  



})();