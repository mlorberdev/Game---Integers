export function integers(isReset, op, timed, vtt, vff) {
  document.getElementById("signs_pad").classList.remove("none");
  let arr = []; // Array holds questions and user responses, and x or check mark
  let int; // Var <int> --> timer for timed session nn, op;
  // Globals for DOM traversal & manipulation
  const practice = document.getElementById("practice");
  const stats = document.getElementById("stats");
  const list = document.getElementById("list");
  const pr = document.getElementById("progress");
  // Sound files
  const right = new Audio("./assets/sounds/right.mp3");
  const wrong = new Audio("./assets/sounds/wrong.mp3");
  // Globals for response behavior
  let sound = document.getElementById("sound");
  let vibes = document.getElementById("vibes");
  let score = 0;// Global for score
  let num = 0;// Global for number of questions asked in timed practice
  let Q; // Global question
  let A;// Global for answer to question
  
    // Interval for timed session updates progress bar on each tick; or, sets progress bar value to 1, for first question
    timed === true ? int = setInterval(() => { pr.value < pr.max ? pr.value++ : endPractice() }, 1000) : int = int;
    if (timed === false) pr.value = 1;

    // Elements in DOM listening for user input, i.e. answering questions
    if (isReset === false) {
      document.getElementById("nnn").addEventListener("click", () => ans(-1));
      document.getElementById("zzz").addEventListener("click", () => ans(0));
      document.getElementById("ppp").addEventListener("click", () => ans(1));
    }


  function ask_integer() {
    let a = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1); // First number in question
    let b = Math.floor(Math.random() * 10) * (Math.random() < .5 ? -1 : 1); // Second number in question
    let bb = Math.random() < .5 ? b : `(${b})`; // Text of numbers; either put grouping around second number or don't
    let thisop; // Operation for this question (each question)
    let sym; // Symbol for multiplication and division question
    let temp; // Temp variable
    if (timed === true) num++; // Increment number of questions asked on a timed practice
    if (op === "add") Math.random() < .5 ? thisop = "sub" : thisop = "add"; // Pick addition or subtraction when var <op> is "add"
    if (op === "mul") { Math.random() < .5 ? thisop = "mul" : thisop = "div"; getSymbol(); } // Pick multiplication or division when var <op> is "mul"
    if (op === "any") { // When var <op> (operation) is "any" (choice from options), choose for this question
      temp = Math.floor(Math.random() * 4); // temp var
      switch (temp) {
        case 0: thisop = "add"; break;
        case 1: thisop = "sub"; break;
        case 2: thisop = "mul"; getSymbol(); break;
        case 3: thisop = "div"; getSymbol(); break;
        default: break;
      }
    }
    function getSymbol () {
      if (thisop === "mul") {
        temp = Math.floor(Math.random() * 3);
        switch (temp) {
          case 0: sym = "*"; break;
          case 1: sym = "•"; break;
          case 2: sym = "×"; break;
          default: break;
        }
      } else {
        sym = Math.random() < .5 ? "/" : "÷";
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
    document.getElementById("question").innerHTML = Q; console.log(Q, A);
  }

  function ans(val) { // Evaluate answers
    const sign = (sn) => {
      let temp;
      switch (true) {
        case (sn < 0): temp = "-"; break;
        case (sn == 0): temp = "0"; break;
        case (sn > 0): temp = "+"; break;
        default: break;
      }
      return temp;
    }
    if ((val === 1 && A > 0) || (val === 0 && A === 0) || (val === -1 && A < 0)) { // Correct answer
      if (sound.checked) right.play();
      vtt.style.display = "flex";
      setTimeout(()=> vtt.style.display = "none", 300);
      if (vibes.checked) navigator.vibrate(100);
      arr.push(`${sign(A)} ✅ ${Q} = ${A}`);
      score++;
    }
    else { // Incorrect answer
      if (sound.checked) wrong.play();
      vff.style.display = "flex";
      setTimeout(()=> vff.style.display = "none", 300);
      if (vibes.checked) {
        navigator.vibrate(100);
        setTimeout(navigator.vibrate(100), 50);
      }
      arr.push(`${sign(A)} ❌${Q} = ${A}`);
    }
    if (pr.value < pr.max) {
      if (timed === false) pr.value++;
      ask_integer();
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

  ask_integer();
}