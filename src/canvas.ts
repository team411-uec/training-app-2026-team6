// データ層 (canvas.ts)
// ドット絵キャンバスのデータと操作関数を定義する層。
// どのマスが何色かという情報とその操作だけに専念し、画面表示(DOM操作)はしない。
// この層は完成済み。まずは読んで理解する。

// 一辺のマス目の数（16 なら 16×16 = 256 マス）。
export const CANVAS_SIZE = 500;
import { GRID_NUM } from "./main";

// 塗るときの色と、空（消えている）マスの色。
export const DEFAULT_COLOR = "#000000"; // 黒
export const EMPTY_COLOR = "#ffffff"; // 白

// 各マスの色を1次元配列で持つ（長さは GRID_NUM×GRID_NUM）。
// export していないので外部からは直接触れず、下の関数を通して操作する。
let cells: string[] = [];

// 全マスを空(白)に戻す。
export function clearCanvas(): void {
  cells = [];
  for (let i = 0; i < GRID_NUM * GRID_NUM; i++) {
    cells.push(EMPTY_COLOR);
  }
  console.log("キャンバスを全消去しました");
  undoStack = [];
  redoStack = [];
  //全消去の後にもとに戻そうとすると変なところが出現していたので全消去の後は記録を全部削除することにした。
}

// index 番目のマスを color で塗る。
//export function paintCell(index: number, color: string): void {cells[index] = color;}　←元のpaintCell関数

// index 番目のマスの色を返す。
export function getCellColor(index: number): string {
  return cells[index];
}

// 拡張ポイント（ステップ2以降）。必要になったら足す。
//  - 塗る色を変える: 上の DEFAULT_COLOR を別の色に変える（新しい関数は不要）。
//  - Undo / Redo: 塗った操作を配列で記録して、元に戻す・やり直す関数を足す。

type PaintReport = {
  index: number;
  prevColor: string;
  nextColor: string;
};
//まずはPaintReport内の型を決定する。

let undoStack: PaintReport[] = [];

let redoStack: PaintReport[] = [];
//これらはundo、redoを行うために行った動作をスタックをするもの

export function paintCell(index: number, color: string): void {
  const prevColor = cells[index];
  //cellsのindex番目の色（現在の色で変更を加えられる前の色）をprevColorに格納

  if (prevColor == color) return;
  //今から塗る色と今の色が同じだった場合は何もしない（その後の動作が余計なため）

  cells[index] = color;
  //index番目の色を変更

  undoStack.push({ index, prevColor, nextColor: color });
  //undoStackに追加する。

  redoStack = [];
  //ここでredoStackの中身を消す（A⇒B⇒Cと続いていて、2回undoで戻った後に新しいDを追加したのにredoを使ったらB、Cに移動するのはおかしいから）
}

export function undo(): PaintReport | null {
  const action = undoStack.pop();
  //直近の動作を取り出して（popの役割）actionに格納
  if (!action) return null;
  //actionに何も入っていなかった（undoStackに何も入っていなかった）場合何もしない

  cells[action.index] = action.prevColor;
  //cellsのactionのindex番目の色をaction内にある色に変更する。⇒actionは最新のundoStack内の要素なのでここで自動的に一個前に戻ったことになる。

  redoStack.push(action);
  //redoStackに保存し消した後でも修復できるようにしている

  return action;
  //main.tsにindex = actionのindexであることやcolor = actionのprevColorであることを返す
}

//redoコマンドは原理、考え方はundoコマンドと同じなので説明は割愛
export function redo(): PaintReport | null {
  const action = redoStack.pop();
  if (!action) return null;
  cells[action.index] = action.nextColor;
  undoStack.push(action);
  return action;
}
