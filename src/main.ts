// イベント層 (main.ts)
// クリックされた時の処理とマス目を結びつける。
// キャンバスを用意してマス目を描き、マスのクリックと全消去ボタンに処理を結びつける。
// この層は完成済み（ステップ1で render.ts を実装すれば動く）。

import {
  clearCanvas,
  paintCell,
  getCellColor,
  GRID_SIZE,
  DEFAULT_COLOR,
  undo,
  redo,
} from "./canvas";
import { renderGrid, renderCell } from "./render";

let currentColor = "black";

function main(): void {
  // キャンバスを用意する（1回呼ぶと、全マスが白になる）。
  clearCanvas();

  // マス目を画面に並べる。
  renderGrid();

  // 全マスを class（pixel-cell）でまとめて取得して、クリック時の処理を結びつける。
  // index が「何番目のマスか」なので、そのまま処理の中で使える。
  const cells = document.getElementsByClassName("pixel-cell");
  for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("click", () => {
      // データを更新する（このマスを黒で塗る）。
      paintCell(index, currentColor);

      // render.ts の renderCell を実装すると、ここでマスが塗られる（ステップ1）。
      renderCell(index, currentColor);
    });
  }

  const clearButton = document.getElementById("clear-button");
  clearButton?.addEventListener("click", () => {
    clearCanvas();
    // 全マスを、データ上の色（全消去後なので白）で塗り直す。
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      renderCell(i, getCellColor(i));
    }
  });

<<<<<<< HEAD
  const undoButton = document.getElementById("undo-button");
  undoButton?.addEventListener("click", () => {
    const action = undo(); //canvas.tsのコマンドを使って最も直近の動作をactionへと保存する

    if (action) {
      //actionが存在しない⇒初期の段階にボタンを押したときにnullが出てくるコマンドにしているため、actionが存在しないときに不具合を起こさないようにするため

      renderCell(action.index, action.prevColor);
      //これでrenderCellをactionに記録されたindexとColorで実行し、前の段階へと戻せる。
    }
  });
  const redoButton = document.getElementById("redo-button");
  redoButton?.addEventListener("click", () => {
    const action = redo();
    if (action) {
      renderCell(action.index, action.nextColor);
    }
  });
=======
  const colorButtons = document.querySelectorAll<HTMLButtonElement>('.color-btn');
colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.color) {
      currentColor = button.dataset.color;
    }
  });
});

>>>>>>> main
}

main();
