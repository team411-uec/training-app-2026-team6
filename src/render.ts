// 描画層 (render.ts)
// 状態を受け取って画面(DOM)に表示するだけを担当する。
// 塗るロジックは canvas.ts、クリックと処理の連携は main.ts が持つ。

import { clearCanvas, paintCell, getCellColor, CANVAS_SIZE, DEFAULT_COLOR } from "./canvas";
import { GRID_NUM } from "./main";
import { paintSystem, shadowinCell, shadowoutCell } from "./pen_items";

// マス目（セル）を画面に並べて作る（完成済み）。
// GRID_NUM×GRID_NUM の数だけ <div> を作り、#canvas に追加する。
// 各セルには class="pixel-cell" を付ける（まとめて取得し、index 番目で1マスずつ狙う）。
export function renderGrid(): void {
  const container = document.getElementById("canvas");
  if (container) {
    container.style.width = CANVAS_SIZE + "px";
  }
  if (container === null) return;

  // 念のため、すでにあるマスを消してから作り直す。
  container.textContent = "";

  const total = GRID_NUM * GRID_NUM;
  for (let index = 0; index < total; index++) {
    const cell = document.createElement("div");
    cell.className = "pixel-cell";
    cell.style.width = (CANVAS_SIZE / GRID_NUM) + "px";
    cell.style.height = (CANVAS_SIZE / GRID_NUM) + "px";
    container.appendChild(cell);
  }
}

// ステップ1（最初の課題）: この関数を実装する。
//
// いまはマスをクリックすると Console に「塗ったマス: 5」と出るが、色は変わらない。
// この関数の中身が空だからで、ここに DOM 操作を書けばマスが塗られる。
//
// ヒント:
//  - 全マスは class="pixel-cell"。document.getElementsByClassName でまとめて取れる。
//  - その中の index 番目が、色を変えたいマス。
//  - 要素の背景色は style.backgroundColor で変えられる。
export function renderCell(index: number, color: string): void {
  // ステップ0 ではコンソールに座標が出るだけ。
  console.log("塗ったマス:", index, " 塗った色:", color);

  // TODO（ステップ1）: ここに DOM 操作を書いて、マスの色を変える。
  const cells = document.getElementsByClassName("pixel-cell");
  if (cells[index]) {
    (cells[index] as HTMLElement).style.backgroundColor = color;
  }
}

// 拡張ポイント（ステップ2以降）。必要になったら関数を足す。
//  - カラーパレットの色見本を並べる: 色ボタンを document.createElement で作って表示する関数を足す。
