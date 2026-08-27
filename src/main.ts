// イベント層 (main.ts)
// クリックされた時の処理とマス目を結びつける。
// キャンバスを用意してマス目を描き、マスのクリックと全消去ボタンに処理を結びつける。
// この層は完成済み（ステップ1で render.ts を実装すれば動く）。

import { clearCanvas, paintCell, getCellColor, GRID_NUM, DEFAULT_COLOR } from "./canvas";
import { paintSystem, shadowinCell, shadowoutCell } from "./pen_items";
import { renderGrid, renderCell } from "./render";

function main(): void {
  // キャンバスを用意する（1回呼ぶと、全マスが白になる）。
  clearCanvas();

  // マス目を画面に並べる。
  renderGrid();

  // 全マスを class（pixel-cell）でまとめて取得して、クリック時の処理を結びつける。
  // index が「何番目のマスか」なので、そのまま処理の中で使える。
  const cells = document.getElementsByClassName("pixel-cell") as HTMLCollectionOf<HTMLElement>;
  for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("mousedown", () => {
      paintSystem(index, DEFAULT_COLOR);
      /* 以下の処理はpaintSystemの中にまとめた
      // データを更新する（このマスを黒で塗る）。
      paintCell(index, DEFAULT_COLOR);

      // render.ts の renderCell を実装すると、ここでマスが塗られる（ステップ1）。
      renderCell(index, DEFAULT_COLOR);
      */
    });

    cells[index].addEventListener("mousemove", (event: MouseEvent) => {
      if (event.buttons === 1) {
        paintSystem(index, DEFAULT_COLOR);
      }
    });
    
    //マウスが乗っているときに薄く表示する。
    cells[index].addEventListener("mouseover", () => {
      shadowinCell(index, DEFAULT_COLOR);
    });
    cells[index].addEventListener("mouseout", () => {
      shadowoutCell(index);
    });
  }

  const clearButton = document.getElementById("clear-button");
  clearButton?.addEventListener("click", () => {
    clearCanvas();
    // 全マスを、データ上の色（全消去後なので白）で塗り直す。
    for (let i = 0; i < GRID_NUM * GRID_NUM; i++) {
      renderCell(i, getCellColor(i));
    }
  });
}

main();
