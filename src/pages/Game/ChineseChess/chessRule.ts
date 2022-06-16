import { Ref } from "vue";
import { ChessPieces } from "./data";

const redLine = 150;
const darkLine = 120;

// 计算棋子真实坐标
export function convertChess(
    chessData: ChessPieces | undefined | null,
    radius: Ref<number>
) {
    if (!chessData) {
        return { chessX: 0, chessY: 0 };
    }

    const chessX = chessData.left + radius.value;
    const chessY = chessData.top + radius.value;

    return { chessX, chessY };
}

export interface ChessRule {
    hanldeX: number;
    hanldeY: number;
    chessData: ChessPieces | undefined;
    lastChessData: ChessPieces | undefined;
    radius: Ref<number>;
    chessPieces?: ChessPieces[];
}

export interface Dataset {
    top: number;
    left: number;
}

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
                    top: hanldeY - radius.value,
                    left: hanldeX - radius.value,
                };
            }

            break;
        case "dark":
            if (judgments.dark.some((p) => p)) {
                return {
                    top: hanldeY - radius.value,
                    left: hanldeX - radius.value,
                };
            }
            break;
        default:
            return false;
            break;
    }

    return false;
}

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

    const judgments = [
        lastChessX !== hanldeX && lastChessY === hanldeY,
        lastChessX === hanldeX && lastChessY !== hanldeY,
    ];

    if (!judgments[0] && !judgments[1]) {
        return false;
    }

    result = {
        top: hanldeY - radius.value,
        left: hanldeX - radius.value,
    };

    chessPieces?.forEach((p) => {
        const pChessData = convertChess(p, radius);
        const sameLine = judgments[0]
            ? pChessData.chessY === lastChessY
            : pChessData.chessX === lastChessX;
        if (!sameLine) {
            return false;
        }

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

        if (pChessData.chessX === 240 && pChessData.chessY === 180) {
            console.log(
                "????",
                judgments[1],
                saveJudgmentsResult[1],
                pChessData.chessY,
                hanldeY,
                lastChessY
            );
            console.log("carRule ForEach", judgmentsResult);
        }

        if (judgmentsResult) {
            result = false;
        }
    });

    return result;
}

export function horseRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}

export function elephantRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}

export function bodyguardRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
}: ChessRule): Dataset | false {
    return false;
}

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
