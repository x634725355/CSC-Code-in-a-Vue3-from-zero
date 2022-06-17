import { Ref } from "vue";
import { ChessPieces } from "./data";

const redLine = 150;
const darkLine = 120;

// 计算棋子真实坐标
export function convertChess(
    chessData: ChessPieces | undefined | null,
    radius: number
) {
    if (!chessData) {
        return { chessX: 0, chessY: 0 };
    }

    const chessX = chessData.left + radius;
    const chessY = chessData.top + radius;

    return { chessX, chessY };
}

export interface ChessRule {
    hanldeX: number;
    hanldeY: number;
    chessData: ChessPieces | undefined;
    lastChessData: ChessPieces | undefined;
    radius: number;
    chessPieces?: ChessPieces[];
}

export interface Dataset {
    top: number;
    left: number;
}

// 兵
export function soldierRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    const { chessX, chessY } = convertChess(lastChessData, radius);

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    const judgments = {
        red: [
            chessY - 30 === hanldeY && chessX === hanldeX,
            chessX - 30 === hanldeX && chessY === hanldeY && darkLine >= chessY,
            chessX + 30 === hanldeX && chessY === hanldeY && darkLine >= chessY,
        ],
        dark: [
            chessY + 30 === hanldeY && chessX === hanldeX,
            chessX - 30 === hanldeX && chessY === hanldeY && redLine <= chessY,
            chessX + 30 === hanldeX && chessY === hanldeY && redLine <= chessY,
        ],
    };

    switch (lastChessData!.camp) {
        case "red":
            if (judgments.red.some((p) => p)) {
                return {
                    top: hanldeY - radius,
                    left: hanldeX - radius,
                };
            }

            break;
        case "dark":
            if (judgments.dark.some((p) => p)) {
                return {
                    top: hanldeY - radius,
                    left: hanldeX - radius,
                };
            }
            break;
        default:
            return false;
            break;
    }

    return false;
}

// 🚗
export function carRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
    chessPieces,
}: ChessRule): Dataset | false {
    const { chessX: lastChessX, chessY: lastChessY } = convertChess(
        lastChessData,
        radius
    );
    let result: Dataset | false = false;

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    // 判断两个坐标是否在一条条线
    const judgments = [
        lastChessX !== hanldeX && lastChessY === hanldeY,
        lastChessX === hanldeX && lastChessY !== hanldeY,
    ];

    if (!judgments[0] && !judgments[1]) {
        return false;
    }

    result = {
        top: hanldeY - radius,
        left: hanldeX - radius,
    };

    chessPieces?.every((p) => {
        const pChessData = convertChess(p, radius);
        // 判断当前遍历的棋子是否 在上次点击棋子的线上
        const sameLine = judgments[0]
            ? pChessData.chessY === lastChessY
            : pChessData.chessX === lastChessX;
        if (!sameLine) {
            return false;
        }

        // 判断两个棋子之间是否还有其他的棋子
        const saveJudgmentsResult = [
            lastChessX - hanldeX > 0
                ? lastChessX > pChessData.chessX && hanldeX < pChessData.chessX
                : lastChessX < pChessData.chessX && hanldeX > pChessData.chessX,
            lastChessY - hanldeY > 0
                ? lastChessY > pChessData.chessY && hanldeY < pChessData.chessY
                : lastChessX < pChessData.chessY && hanldeY > pChessData.chessY,
        ];

        const judgmentsResult = judgments[0]
            ? saveJudgmentsResult[0]
            : saveJudgmentsResult[1];

        if (judgmentsResult) {
            result = false;
        }
    });

    return result;
}

// 🐎
export function horseRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    const { chessX: lastChessX, chessY: lastChessY } = convertChess(
        lastChessData,
        radius
    );

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    // 判断马的有效落点位置
    const judgments = [
        // 往上走的马
        lastChessX - radius === hanldeX && lastChessY - radius * 2 === hanldeY,
        lastChessX + radius === hanldeX && lastChessY - radius * 2 === hanldeY,

        // 往下走的马
        lastChessX - radius === hanldeX && lastChessY + radius * 2 === hanldeY,
        lastChessX + radius === hanldeX && lastChessY + radius * 2 === hanldeY,

        // 往右走的马
        lastChessX + radius * 2 === hanldeX && lastChessY - radius === hanldeY,
        lastChessX + radius * 2 === hanldeX && lastChessY + radius === hanldeY,

        // 往左走的马
        lastChessX - radius * 2 === hanldeX && lastChessY - radius === hanldeY,
        lastChessX - radius * 2 === hanldeX && lastChessY + radius === hanldeY,
    ];

    // switch ()

    

    return false;
}

// 🐘
export function elephantRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}

// 仕
export function bodyguardRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}

// 将
export function generalRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}

export function cannonRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}
