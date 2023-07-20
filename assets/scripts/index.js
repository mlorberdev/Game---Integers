import { integers } from "./integers.js";

!(function () {
  
  // VARS
  const intro = document.getElementById("intro_page");
  const skills = document.getElementById("skills");
  const check = document.getElementById("ready_check");
  let nn; // Var <nn> --> number of seconds or questions; triggers session end
  let isReset = false; // Global for practicing again route
  let op; // Var <op> --> user choice from options: "add" is add/sub, "mult" is mult/div, "any" is any
  let timed = false; // Var <timed> --> true/false: is the session by time or by number of questions

//globals
  
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
    skills.classList.add("none");// Switch to next screen
    options.classList.remove("none");
  });

  // SAVE OPTIONS
  document.getElementById("set_options").addEventListener("click", function () {
    document.getElementsByName("time").forEach(t => { if (t.checked) nn = t.value }); // Updates var <nn> with either time units in seconds or number of questions
    timed === true ? nn *= 60 : nn *= 30;
    document.querySelectorAll("input[name=skill]").forEach(o => { if (o.checked) { op = o.value; console.log(op) } }); // Updates var <op> with operation set name
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
  document.getElementById("lets_go").addEventListener("click", function () {
    check.classList.add("none"); // Switch visible pages
    practice.classList.remove("none");
    integers(nn, isReset, op, timed);
  });
})();