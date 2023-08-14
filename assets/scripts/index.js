!(function mathfacts() {
  // VARS
  let isReset = false; // Global for practicing again route
  let op; // Var <op> --> user choice from options: "add" is add/sub, "mult" is mult/div, "any" is any
  const right = new Audio("./assets/sounds/right.mp3");
  const wrong = new Audio("./assets/sounds/wrong.mp3");
  const qqq = document.getElementById("question");
  const aaa = document.getElementById("answer");
  const neg = document.getElementById("neg");
  const kb = document.getElementById("kb");
  let vibes = document.getElementById("vibes").checked;
  let sound = document.getElementById("sound").checked;
  let pr = document.getElementById("progress");
  let a, b, c, nn, Q, A, arr = [], tta = [], score = 0, kbd, kbds, aa, zz, sm, sym, start_time, end_time;
  const rn = (z, plus) => { plus ||= 0; return Math.floor(Math.random() * z) + plus; }
  const pn = () => { return Math.random() < .5 ? -1 : 1; }
  document.querySelectorAll(".key").forEach(key => key.addEventListener("click", evalKey)); // Add listeners to keys
  for (let i = 0; i <= 12; i++) for (let j = 0; j <= 12; j++) if (j >= i) tta.push([`${i} × ${j}`, i * j]); // Make times table

  // FULLSCREEN
  // document.getElementById("fullscreen").addEventListener("click", () => { document.body.requestFullscreen(); });

  // EXIT INTRO
  document.getElementById("start").addEventListener("click", function () {
    document.getElementById("intro_page").classList.add("none"); // Switch to next screen
    document.getElementById("skills").classList.remove("none");
  });

  // CLOSE SKILLS & OPEN READY CHECK & SET TIMES TABLE IF NEEDED
  document.getElementById("set_skills").addEventListener("click", function () {
    document.querySelectorAll("input[name=skill]").forEach(s => { if (s.checked) op = s.value });
    // Add instructions to ready check page
    let ws, ins;
    let add_def = "Addition and subtraction are useful for many activities of everyday life, and prepares you for learning about other math topics in school, including multiplication and division.<br><br>Practice addition and subtraction in your head to make math much easier! Did you know mental math actually keeps our brains quick and sharp? The brain, like the muscles, gets stronger and more efficient with use. Mental math also greatly improves a person ability to understand the relationships between quantities. There are many great strategies for mental math; ask your teacher!";
    switch (op) {
      case "mul_int": ws = "Multiply Integers"; ins = "The rules for multiplying integers are simple:<br><br>If the signs are the same, the answer is positive.<br>If they are different, the answer is negative.<br>If one number is zero, the answer is zero.<br><br>You won't have to do the multiplying or dividing in this exercise. Just give the correct sign."; break;
      case "add_int": ws = "Add Integers"; ins = "The rules for adding integers are simple:<br><br>Adding two positive integers results in a positive integer.<br>Adding two negative integers results in a negative integer.<br>Adding different signed integers is always subtraction; give the answer the sign of the bigger integer.<br><br>When subtracting integers, change the question to addition and change the sign on the second number to its opposite. Then follow the rules for addition.<br><br>Be sure to include the negative sign if your answer is negative."; break;
      case "onestep": ws = "One Step Equations"; break;
      case "twostep": ws = "Two Step Equations"; break;
      case "addition32": ws = "Addition 3"; ins = add_def; break;
      case "addition21": ws = "Addition 2"; ins = add_def; break;
      case "addition11": ws = "Addition 1"; ins = add_def; break;
      case "timestable": ws = "Times Table"; ins = "Memorising times tables makies it far quicker and easier for you to work out math problems in your head! Moving beyond using your fingers or other tools to work out answers, you'll be able to use this knowledge to quickly solve any multiplication or division question!<br><br>To learn your times tables up to 12s, there are only 91 facts to learn because multiplication works two ways! For example, 1 x 3 is the same as 3 x 1!!"; break;
      case "maketens": ws = "Make Tens"; ins = "The make-tem strategy is great for addition! It helps you to understand place value and the relationships between numbers because our number system is based on making groups of ten!<br><br>The question will be one number from 0-10.<br>Your answer should be the number you need to add to make 10!"; break;
      default: break;
    }
    document.getElementById("what_skill").innerHTML = ws; // Set skill name
    document.getElementById("instructions").innerHTML = ins; // Set instructions
    document.getElementById("skills").classList.add("none");// Switch to next screen
    document.getElementById("ready_check").classList.remove("none");
  });

  // GO BACK TO SKILLS
  document.getElementById("goback").addEventListener("click", function () {
    document.getElementById("ready_check").classList.add("none"); // Switch to previous screen
    document.getElementById("skills").classList.remove("none");
  });

  // CLOSE READY CHECK; SET UP & OPEN PRACTICE
  document.getElementById("lets_go").addEventListener("click", function () {
    kbds = document.querySelectorAll(".kbds"); // All keyboards
    if (op === "mul_int") { kbd = "signs_pad" } else { kbd = "keyboard" } // Set required keyboard
    if (op === "timestable") { nn = 0; tta.sort(() => Math.random() - 0.5); } // Randomly shuffle timestable array and reset counter
    // Hide -,+ keys when not needed
    if (op === "add_int") {
      if (!kb.classList.contains("very_wide_key")) kb.classList.add("very_wide_key"); // Upsize backspace a lot
      if (document.getElementById("kn").classList.contains("none")) document.getElementById("kn").classList.remove("none");
      if (document.getElementById("kp").classList.contains("none")) document.getElementById("kp").classList.remove("none");
    } else {
      if (kb.classList.contains("very_wide_key")) kb.classList.remove("very_wide_key"); // Downsize backspace if needed
      if (!document.getElementById("kn").classList.contains("none")) document.getElementById("kn").classList.add("none");
      if (!document.getElementById("kp").classList.contains("none")) document.getElementById("kp").classList.add("none");
    }
    for (let i = 0; i < kbds.length; i++) if (!kbds[i].classList.contains("none")) kbds[i].classList.add("none"); // Hide all keyboards
    document.getElementById(kbd).classList.remove("none"); // Show required keyboard
    // Switch to next screen
    document.getElementById("ready_check").classList.add("none");
    practice.classList.remove("none");
    start_time = new Date(); // Start time
    ask(); // Ask first question
  });

  // ASK QUESTION
  function ask() {
    pr.value++;
    aaa.innerHTML = "";
    neg.innerHTML = "";
    switch (op) {
      case "addition11":
        a = rn(10);
        b = rn(10);
        if (pn() === 1) { Q = `${a} + ${b}`; A = a + b; }
        else {
          if (b <= a) {
            Q = `${a} - ${b}`; A = a - b;
          } else {
            Q = `${b} - ${a}`; A = b - a;
          }
        }
        break;
      case "addition21":
        a = rn(80, 10);
        b = rn(9, 1);
        if (pn() === 1) { Q = `${a} + ${b}`; A = a + b; }
        else { Q = `${a} - ${b}`; A = a - b; }
        break;
      case "addition32":
        a = rn(800, 100);
        b = rn(90, 10);
        if (pn() === 1) { Q = `${a} + ${b}`; A = a + b; }
        else { Q = `${a} - ${b}`; A = a - b; }
        break;
      case "add_int":
        // showNeg();
        a = rn(10) * pn();
        b = rn(10) * pn();
        c = pn() === 1 ? b : `(${b})`;
        if (pn() === 1) { Q = `${a} + ${c}`; A = a + b; }
        else { Q = `${a} - ${c}`; A = a - b; }
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
        pr.max = 91;
        Q = tta[nn][0]; // Question from times table array
        A = tta[nn][1]; // Answer from times table array
        nn++; // Next question in array
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
    qqq.innerHTML = Q;
  }

  function showX() { document.getElementById("showx").classList.remove("none"); }

  function evalKey() {
    let key = this.id.toString().charAt(1);
    switch (key) {
      case "n": neg.innerHTML === "-" ? neg.innerHTML = "" : neg.innerHTML = "-"; break;
      case "p": if (neg.innerHTML === "-") neg.innerHTML = ""; break;
      case "b": let ai = aaa.innerHTML.toString(); aaa.innerHTML = ai.slice(0, ai.length - 1); break;
      case "N": case "Z": case "P": case "r": ans(key); break;
      default: aaa.innerHTML += key; break;
    }
  }

  function ans(u) {
    aa = parseInt(aaa.innerText);
    zz = neg.innerHTML; // Positive/Negative user entry field
    switch (true) {
      case (aa === A && zz === ""):
      case (aa === -A && zz === "-" && A !== 0):
      case (u === "N" && A < 0):
      case (u === "Z" && A === 0):
      case (u === "P" && A > 0):
        sm = "✅";
        score++;
        if (sound) right.play();
        if (vibes) navigator.vibrate(300);
        document.querySelector(":root").style.setProperty('--trns', '#41e732');
        setTimeout(() => document.querySelector(":root").style.setProperty('--trns', 'transparent'), 100);
        break;
      default:
        sm = "❌";
        if (sound) wrong.play();
        break;
    }
    // Push question and answer to arr
    if (u === "N" || u === "Z" || u === "P") {
      let tmp, eqls = "=";
      switch (u) {
        case "N": tmp = "-"; break;
        case "Z": tmp = "0"; break;
        case "P": tmp = "+"; break;
        default: break;
      }
      if (A.toString().length > 3) {
        A = A.toFixed(3);
        eqls = "≈";
      }
      arr.push(`${sm} ${tmp}, ${Q} ${eqls} ${A}`);
    } else {
      arr.push(`${sm} ${zz + aa}, ${Q} = ${A}`);
    }
    pr.value < pr.max ? ask() : endPractice();
  }

  function endPractice() { // End practice session and display stats page
    end_time = new Date();
    let et = Math.floor((end_time - start_time) / 1000); // Elapsed time in seconds
    const frag = new DocumentFragment(); // Write answers array to DOM
    for (let i = 0; i < arr.length; i++) {
      let ele = document.createElement("li");
      ele.textContent = `${arr[i]}`;
      frag.appendChild(ele);
    }
    document.getElementById("list").appendChild(frag); // Update DOM
    document.getElementById("percent").innerHTML = `${Math.floor(score / pr.max * 100)}%`;
    document.getElementById("time").innerHTML = `${et / 60 < 1 ? 0 : Math.floor(et / 60)}m ${et % 60}s`;
    document.getElementById("practice").classList.add("none"); // Switch visible pages
    document.getElementById("stats").classList.remove("none");
  } // End of function endPractice

  // PRACTICE AGAIN
  document.getElementById("go_home").addEventListener("click", function () {
    document.getElementById("list").innerHTML = "";
    document.getElementById("start").click;
    pr.value = 0;
    score = 0;
    stats.classList.add("none"); // Switch to options screen
    skills.classList.remove("none");
    isReset = true;
    arr = [];
  });

})();