export function mathfacts() {
  console.log("running math facts");
  document.getElementById("keyboard").classList.remove("none"); // Unhide keyboard
  document.querySelectorAll("#keyboard>div").forEach(key => key.addEventListener("click", evalKey));
  const right = new Audio("./assets/sounds/right.mp3");
  const wrong = new Audio("./assets/sounds/wrong.mp3");
  const qqq = document.getElementById("question");
  const aaa = document.getElementById("answer");
  const vtt = document.getElementById("vtt");
  const vff = document.getElementById("vff");
  let timed = document.getElementById("tt").checked;
  let vibes = document.getElementById("vibes").checked;
  let sound = document.getElementById("sound").checked;
  let pr = document.getElementById("progress");
  let int, Q, A, arr = [], score = 0, num = 0;
  const rn = (z) => { return Math.floor(Math.random() * z); }
  // Interval for timed session updates progress bar on each tick; or, sets progress bar value to 1, for first question
  timed === true ? int = setInterval(() => { pr.value < pr.max ? pr.value++ : endPractice() }, 1000) : int = int;
  if (!timed) pr.value = 1;

  function ask() {
    let a = rn(11);
    let b = rn(11);
    Q = `${a} × ${b}`;
    A = a * b;
    if (timed) num++; // increments the number of questions asked in timed practice
    qqq.innerHTML = Q;
  } ask();

  function evalKey() {
    let key = this.id.toString().charAt(1);
    switch (key) {
      case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0": aaa.innerHTML += key; break;
      case "c": if (aaa.innerHTML.length > 0) ans(); break;
      case "b": let ai = aaa.innerHTML.toString(); aaa.innerHTML = ai.slice(0, ai.length - 1); break;
      default: break;
    }
  }

  function ans() {

    if (parseInt(aaa.innerText) === A) { // Correct answer
      arr.push(`[${aaa.innerHTML}] ✅ ${Q} = ${A}`);
      score++;
      if (sound) right.play();
      vtt.style.display = "flex";
      setTimeout(() => {
        vtt.style.display = "none";
        aaa.innerHTML = "";
        stayOrGo();
      }, 250);
      if (vibes) navigator.vibrate(100);
    }
    else { // Incorrect answer
      arr.push(`[${aaa.innerHTML}] ❌ ${Q} = ${A}`);
      if (sound) wrong.play();
      vff.style.display = "flex";
      setTimeout(() => {
        vff.style.display = "none";
        aaa.innerHTML = "";
        stayOrGo();
      }, 250);
      if (vibes) {
        navigator.vibrate(100);
        setTimeout(navigator.vibrate(100), 50);
      }
    }
    
    function stayOrGo() {
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


}