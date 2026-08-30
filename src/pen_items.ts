import { clearCanvas, paintCell, getCellColor, CANVAS_SIZE, DEFAULT_COLOR } from "./canvas";
import { main,GRID_NUM } from "./main";
import { renderGrid, renderCell } from "./render";

let before_color: string[] = [];

/* 塗るときの一連の操作をまとめた */
export function paintSystem(index: number, color: string) {
    const cells = document.getElementsByClassName("pixel-cell");
    before_color[index] = color;
    (cells[index] as HTMLElement).style.backgroundColor = before_color[index];
    (cells[index] as HTMLElement).style.opacity = "";
    paintCell(index, DEFAULT_COLOR);
    renderCell(index, DEFAULT_COLOR);
}

/* 塗られるマス目を薄く表示する */
export function shadowinCell(index:number, color:string): void {
    const cells = document.getElementsByClassName("pixel-cell");
    before_color[index] = (cells[index] as HTMLElement).style.backgroundColor;
    if (cells[index]) {
        (cells[index] as HTMLElement).style.backgroundColor = color;
        (cells[index] as HTMLElement).style.opacity = "0.2";
    }
}

export function shadowoutCell(index:number): void {
    const cells = document.getElementsByClassName("pixel-cell");
    if (cells[index]) {
        (cells[index] as HTMLElement).style.backgroundColor = before_color[index];
        (cells[index] as HTMLElement).style.opacity = "";
    }
}

//　キャンパスのマスの個数変更の処理をする
const Check10modal = document.getElementById("Check10-modal");
const Check10button = document.getElementById("Check10-button");
Check10button?.addEventListener("click", () => {
    if (Check10modal) {
        Check10modal.style.display = "flex";
    }
});

const Check25modal = document.getElementById("Check25-modal");
const Check25button = document.getElementById("Check25-button");
Check25button?.addEventListener("click", () => {
    if (Check25modal) {
        Check25modal.style.display = "flex";
    }
});

const Check50modal = document.getElementById("Check50-modal");
const Check50button = document.getElementById("Check50-button");
Check50button?.addEventListener("click", () => {
    if (Check50modal) {
        Check50modal.style.display = "flex";
    }
});

const Check100modal = document.getElementById("Check100-modal");
const Check100button = document.getElementById("Check100-button");
Check100button?.addEventListener("click", () => {
    if (Check100modal) {
        Check100modal.style.display = "flex";
    }
});

const Cancel10button = document.getElementById("Cancel10-button");
Cancel10button?.addEventListener("click", () => {
    if (Check10modal) {
        Check10modal.style.display = "none";
    }
});

const Cancel25button = document.getElementById("Cancel25-button");
Cancel25button?.addEventListener("click", () => {
    if (Check25modal) {
        Check25modal.style.display = "none";
    }
});

const Cancel50button = document.getElementById("Cancel50-button");
Cancel50button?.addEventListener("click", () => {
    if (Check50modal) {
        Check50modal.style.display = "none";
    }
});

const Cancel100button = document.getElementById("Cancel100-button");
Cancel100button?.addEventListener("click", () => {
    if (Check100modal) {
        Check100modal.style.display = "none";
    }
});

export function remakeGrid(): void {
    if (Check10modal) {
        Check10modal.style.display = "none";
    }
    if (Check25modal) {
        Check25modal.style.display = "none";
    }
    if (Check50modal) {
        Check50modal.style.display = "none";
    }
    if (Check100modal) {
        Check100modal.style.display = "none";
    }
    clearCanvas();
    // 全マスを、データ上の色（全消去後なので白）で塗り直す。
    for (let i = 0; i < GRID_NUM * GRID_NUM; i++) {
      renderCell(i, getCellColor(i));
    }
    main();
}