// イベント層 (main.ts)
// クリックされた時の処理とマス目を結びつける。
// キャンバスを用意してマス目を描き、マスのクリックと全消去ボタンに処理を結びつける。
// この層は完成済み（ステップ1で render.ts を実装すれば動く）。

import { clearCanvas, paintCell, getCellColor, DEFAULT_COLOR, undo, redo } from "./canvas";
import { paintSystem, shadowinCell, shadowoutCell, remakeGrid } from "./pen_items";
import { renderGrid, renderCell } from "./render";

let currentColor = "black";
export let GRID_NUM: number = 25; // 初期値は 25×25 マス
export function main(): void {
  // キャンバスを用意する（1回呼ぶと、全マスが白になる）。
  clearCanvas();

  // マス目を画面に並べる。
  renderGrid();

  // 全マスを class（pixel-cell）でまとめて取得して、クリック時の処理を結びつける。
  // index が「何番目のマスか」なので、そのまま処理の中で使える。
  const cells = document.getElementsByClassName("pixel-cell") as HTMLCollectionOf<HTMLElement>;
  for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("mousedown", () => {
      //ボタンが押されたときに塗る処理を行う
      paintSystem(index, currentColor);
      if (penSize >= 3) {
        paintSystem(index + 1, currentColor);
        paintSystem(index - 1, currentColor);
        paintSystem(index + GRID_NUM, currentColor);
        paintSystem(index - GRID_NUM, currentColor);
        paintSystem(index + GRID_NUM + 1, currentColor);
        paintSystem(index + GRID_NUM - 1, currentColor);
        paintSystem(index - GRID_NUM + 1, currentColor);
        paintSystem(index - GRID_NUM - 1, currentColor);
      }
      if (penSize >= 5) {
        paintSystem(index + 2, currentColor);
        paintSystem(index - 2, currentColor);
        paintSystem(index + GRID_NUM * 2, currentColor);
        paintSystem(index - GRID_NUM * 2, currentColor);
        paintSystem(index + GRID_NUM * 2 + 1, currentColor);
        paintSystem(index + GRID_NUM * 2 - 1, currentColor);
        paintSystem(index - GRID_NUM * 2 + 1, currentColor);
        paintSystem(index - GRID_NUM * 2 - 1, currentColor);
        paintSystem(index + GRID_NUM + 2, currentColor);
        paintSystem(index + GRID_NUM - 2, currentColor);
        paintSystem(index - GRID_NUM + 2, currentColor);
        paintSystem(index - GRID_NUM - 2, currentColor);
        paintSystem(index + GRID_NUM * 2 + 2, currentColor);
        paintSystem(index + GRID_NUM * 2 - 2, currentColor);
        paintSystem(index - GRID_NUM * 2 + 2, currentColor);
        paintSystem(index - GRID_NUM * 2 - 2, currentColor);
      }
      /* 以下の処理はpaintSystemの中にまとめた
      // データを更新する（このマスを黒で塗る）。
      paintCell(index, currentColor);

      // render.ts の renderCell を実装すると、ここでマスが塗られる（ステップ1）。
      renderCell(index, DEFAULT_COLOR);
      */
    });

    //マウスが押されているときに塗る処理を行う
    cells[index].addEventListener("mousemove", (event: MouseEvent) => {
      if (event.buttons === 1) {
        paintSystem(index, currentColor);
        if (penSize >= 3) {
        paintSystem(index + 1, currentColor);
        paintSystem(index - 1, currentColor);
        paintSystem(index + GRID_NUM, currentColor);
        paintSystem(index - GRID_NUM, currentColor);
        paintSystem(index + GRID_NUM + 1, currentColor);
        paintSystem(index + GRID_NUM - 1, currentColor);
        paintSystem(index - GRID_NUM + 1, currentColor);
        paintSystem(index - GRID_NUM - 1, currentColor);
        if (penSize >= 5) {
        paintSystem(index + 2, currentColor);
        paintSystem(index - 2, currentColor);
        paintSystem(index + GRID_NUM * 2, currentColor);
        paintSystem(index - GRID_NUM * 2, currentColor);
        paintSystem(index + GRID_NUM * 2 + 1, currentColor);
        paintSystem(index + GRID_NUM * 2 - 1, currentColor);
        paintSystem(index - GRID_NUM * 2 + 1, currentColor);
        paintSystem(index - GRID_NUM * 2 - 1, currentColor);
        paintSystem(index + GRID_NUM + 2, currentColor);
        paintSystem(index + GRID_NUM - 2, currentColor);
        paintSystem(index - GRID_NUM + 2, currentColor);
        paintSystem(index - GRID_NUM - 2, currentColor);
        paintSystem(index + GRID_NUM * 2 + 2, currentColor);
        paintSystem(index + GRID_NUM * 2 - 2, currentColor);
        paintSystem(index - GRID_NUM * 2 + 2, currentColor);
        paintSystem(index - GRID_NUM * 2 - 2, currentColor);
      }
      }
      }
    });
    
    //マウスが乗っているときに薄く表示する。
    cells[index].addEventListener("mouseover", () => {
      shadowinCell(index, currentColor);
      if (penSize >= 3) {
        shadowinCell(index + 1, currentColor);
        shadowinCell(index - 1, currentColor);
        shadowinCell(index + GRID_NUM, currentColor);
        shadowinCell(index - GRID_NUM, currentColor);
        shadowinCell(index + GRID_NUM + 1, currentColor);
        shadowinCell(index + GRID_NUM - 1, currentColor);
        shadowinCell(index - GRID_NUM + 1, currentColor);
        shadowinCell(index - GRID_NUM - 1, currentColor);
        if (penSize >= 5) {
        shadowinCell(index + 2, currentColor);
        shadowinCell(index - 2, currentColor);
        shadowinCell(index + GRID_NUM * 2, currentColor);
        shadowinCell(index - GRID_NUM * 2, currentColor);
        shadowinCell(index + GRID_NUM * 2 + 1, currentColor);
        shadowinCell(index + GRID_NUM * 2 - 1, currentColor);
        shadowinCell(index - GRID_NUM * 2 + 1, currentColor);
        shadowinCell(index - GRID_NUM * 2 - 1, currentColor);
        shadowinCell(index + GRID_NUM + 2, currentColor);
        shadowinCell(index + GRID_NUM - 2, currentColor);
        shadowinCell(index - GRID_NUM + 2, currentColor);
        shadowinCell(index - GRID_NUM - 2, currentColor);
        shadowinCell(index + GRID_NUM * 2 + 2, currentColor);
        shadowinCell(index + GRID_NUM * 2 - 2, currentColor);
        shadowinCell(index - GRID_NUM * 2 + 2, currentColor);
        shadowinCell(index - GRID_NUM * 2 - 2, currentColor);
      }
      }
    });
    cells[index].addEventListener("mouseout", () => {
      shadowoutCell(index);
      if (penSize >= 3) {
        shadowoutCell(index + 1);
        shadowoutCell(index - 1);
        shadowoutCell(index + GRID_NUM);
        shadowoutCell(index - GRID_NUM);
        shadowoutCell(index + GRID_NUM + 1);
        shadowoutCell(index + GRID_NUM - 1);
        shadowoutCell(index - GRID_NUM + 1);
        shadowoutCell(index - GRID_NUM - 1);
        if (penSize >= 5) {
        shadowoutCell(index + 2);
        shadowoutCell(index - 2);
        shadowoutCell(index + GRID_NUM * 2);
        shadowoutCell(index - GRID_NUM * 2);
        shadowoutCell(index + GRID_NUM * 2 + 1);
        shadowoutCell(index + GRID_NUM * 2 - 1);
        shadowoutCell(index - GRID_NUM * 2 + 1);
        shadowoutCell(index - GRID_NUM * 2 - 1);
        shadowoutCell(index + GRID_NUM + 2);
        shadowoutCell(index + GRID_NUM - 2);
        shadowoutCell(index - GRID_NUM + 2);
        shadowoutCell(index - GRID_NUM - 2);
        shadowoutCell(index + GRID_NUM * 2 + 2);
        shadowoutCell(index + GRID_NUM * 2 - 2);
        shadowoutCell(index - GRID_NUM * 2 + 2);
        shadowoutCell(index - GRID_NUM * 2 - 2);
      }
      }
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

  // ペンのサイズ変更の処理をする
  let penSize: number = 1;
  const penSize1Button = document.getElementById("penSize1");
  penSize1Button?.addEventListener("click", () => {
    penSize = 1;
    console.log("1×1のペンに変更されました");
  });
  const penSize3Button = document.getElementById("penSize3");
  penSize3Button?.addEventListener("click", () => {
    penSize = 3;
    console.log("3×3のペンに変更されました");
  });
  const penSize5Button = document.getElementById("penSize5");
  penSize5Button?.addEventListener("click", () => {
    penSize = 5;
    console.log("5×5のペンに変更されました");
  });
  
  // マスの個数を変更の処理をする
  const gridNum10Button = document.getElementById("gridNum10-button");
  gridNum10Button?.addEventListener("click", () => {
    GRID_NUM = 10;
    remakeGrid();
    console.log("10×10のキャンパスに変更されました");
  });
  const gridNum25Button = document.getElementById("gridNum25-button");
  gridNum25Button?.addEventListener("click", () => {
    GRID_NUM = 25;
    remakeGrid();
    console.log("25×25のキャンパスに変更されました");
  });
  const gridNum50Button = document.getElementById("gridNum50-button");
  gridNum50Button?.addEventListener("click", () => {
    GRID_NUM = 50;
    remakeGrid();
    console.log("50×50のキャンパスに変更されました");
  });
  const gridNum100Button = document.getElementById("gridNum100-button");
  gridNum100Button?.addEventListener("click", () => {
    GRID_NUM = 100;
    remakeGrid();
    console.log("100×100のキャンパスに変更されました");
  });
  
  //一つ戻す、やり直す機能の処理をする
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

  //ペンのカラーを追加する
  const colorButtons = document.querySelectorAll<HTMLButtonElement>('.color-btn');
colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.color) {
      currentColor = button.dataset.color;
    }
  });
});

}

main();
