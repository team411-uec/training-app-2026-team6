import { clearCanvas, paintCell, getCellColor, CANVAS_SIZE, GRID_NUM, DEFAULT_COLOR } from "./canvas";
import { renderGrid, renderCell } from "./render";

let before_color: string[] = [];
let pen_size: number = 1;

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

/* ペンのサイズを変更する　*/