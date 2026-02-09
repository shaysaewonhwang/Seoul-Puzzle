function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var piece = document.getElementById(data);
  ev.target.appendChild(piece);
  piece.style.position = "static";
  checkPuzzleCompletion();
}

document.addEventListener("DOMContentLoaded", function () {
  const pieces = document.querySelectorAll(".puzzle-piece");
  pieces.forEach((piece) => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    piece.style.left = `${randomX}px`;
    piece.style.top = `${randomY}px`;
  });
});

const pieceCount = 9;

function shufflePieces() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const used = new Set();

  pieces.forEach((piece) => {
    let validPosition = false;
    let left, top;

    while (!validPosition) {
      left = Math.floor(Math.random() * (window.innerWidth - 300));
      top = Math.floor(Math.random() * (window.innerHeight - 200));

      validPosition = !Array.from(used).some((pos) => {
        const [usedLeft, usedTop] = pos;
        return Math.abs(left - usedLeft) < 300 && Math.abs(top - usedTop) < 200;
      });
    }

    used.add([left, top]);

    piece.style.left = `${left}px`;
    piece.style.top = `${top}px`;
  });
}

window.onload = shufflePieces;

function checkPuzzleCompletion() {
  let allFilled = true;
  const puzzlePieces = document.querySelectorAll("#text div");
  puzzlePieces.forEach((div) => {
    if (!div.hasChildNodes()) {
      allFilled = false;
    }
  });

  if (allFilled) {
    document.getElementById("congratulations").style.display = "block";
  }
}
