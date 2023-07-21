export function families() {
  document.getElementById("keyboard").classList.remove("none"); // Unhide keyboard
  let qq = document.getElementById("question");
  let aa = document.getElementById("answer");
  let timed = document.getElementById("tt").checked;
  let prog = document.getElementById("progress");
  let max = prog.max;
  let val = prog.value;
  const rn = (z) => { return Math.floor(Math.random() * z); }
  if (!timed) prog.value = 1; // First question count applied when session is by count

  function ask_families() {
    let a = rn(14);
    let b = rn(14);
    let c = a * b;
    let Q, A;

    rn(2) === 0 ? times : divide;

    function times() {
      Q = `${a} x ${b}`
    }

    function divide() {

    }
  }
}