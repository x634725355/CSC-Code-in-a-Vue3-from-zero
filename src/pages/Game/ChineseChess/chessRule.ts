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
    const size = radius * 2;

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    const judgments = {
        red: [
            chessY - size === hanldeY && chessX === hanldeX,
            chessX - size === hanldeX &&
                chessY === hanldeY &&
                darkLine >= chessY,
            chessX + size === hanldeX &&
                chessY === hanldeY &&
                darkLine >= chessY,
        ],
        dark: [
            chessY + size === hanldeY && chessX === hanldeX,
            chessX - size === hanldeX &&
                chessY === hanldeY &&
                redLine <= chessY,
            chessX + size === hanldeX &&
                chessY === hanldeY &&
                redLine <= chessY,
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

    chessPieces!.every((p) => {
        const pChessData = convertChess(p, radius);
        // 判断当前遍历的棋子是否 在上次点击棋子的线上
        const sameLine = judgments[0]
            ? pChessData.chessY === lastChessY
            : pChessData.chessX === lastChessX;
        if (!sameLine) {
            return true;
        }

        // 判断两个棋子之间是否还有其他的棋子
        const saveJudgmentsResult = [
            lastChessX - hanldeX > 0
                ? lastChessX > pChessData.chessX && hanldeX < pChessData.chessX
                : lastChessX < pChessData.chessX && hanldeX > pChessData.chessX,
            lastChessY - hanldeY > 0
                ? lastChessY > pChessData.chessY && hanldeY < pChessData.chessY
                : lastChessY < pChessData.chessY && hanldeY > pChessData.chessY,
        ];

        const judgmentsResult = judgments[0]
            ? saveJudgmentsResult[0]
            : saveJudgmentsResult[1];

        if (judgmentsResult) {
            result = false;
            return false;
        }

        return true;
    });

    return result;
}

interface PlaceholderCoordinate {
    chessX: number;
    chessY: number;
}

// 🐎
export function horseRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
    chessPieces,
}: ChessRule): Dataset | false {
    let direction: "top" | "left" | "right" | "bottom" | undefined;
    let placeholderCoordinate: PlaceholderCoordinate = {
        chessX: 0,
        chessY: 0,
    };
    let result: Dataset | false = false;
    const size = radius * 2;
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
        lastChessX - size === hanldeX && lastChessY - size * 2 === hanldeY,
        lastChessX + size === hanldeX && lastChessY - size * 2 === hanldeY,

        // 往下走的马
        lastChessX - size === hanldeX && lastChessY + size * 2 === hanldeY,
        lastChessX + size === hanldeX && lastChessY + size * 2 === hanldeY,

        // 往右走的马
        lastChessX + size * 2 === hanldeX && lastChessY - size === hanldeY,
        lastChessX + size * 2 === hanldeX && lastChessY + size === hanldeY,

        // 往左走的马
        lastChessX - size * 2 === hanldeX && lastChessY - size === hanldeY,
        lastChessX - size * 2 === hanldeX && lastChessY + size === hanldeY,
    ];

    for (let index = 0; index < judgments.length; index++) {
        const element = judgments[index];

        if (element) {
            switch (index) {
                case 0:
                case 1:
                    direction = "top";
                    break;
                case 2:
                case 3:
                    direction = "bottom";
                    break;
                case 4:
                case 5:
                    direction = "right";
                    break;
                case 6:
                case 7:
                    direction = "left";
                    break;
            }
            break;
        }
    }

    // 如果马的落点没有方向 那么退出判断
    if (!direction) {
        return false;
    }

    switch (direction) {
        case "top":
            placeholderCoordinate.chessX = lastChessX;
            placeholderCoordinate.chessY = lastChessY - radius * 2;
            break;
        case "bottom":
            placeholderCoordinate.chessX = lastChessX;
            placeholderCoordinate.chessY = lastChessY + radius * 2;
            break;
        case "left":
            placeholderCoordinate.chessX = lastChessX - radius * 2;
            placeholderCoordinate.chessY = lastChessY;
            break;
        case "right":
            placeholderCoordinate.chessX = lastChessX + radius * 2;
            placeholderCoordinate.chessY = lastChessY;
            break;
        default:
            break;
    }

    chessPieces!.every((p) => {
        const pChessData = convertChess(p, radius);

        result = {
            top: hanldeY - radius,
            left: hanldeX - radius,
        };

        if (
            pChessData.chessX === placeholderCoordinate.chessX &&
            pChessData.chessY === placeholderCoordinate.chessY
        ) {
            result = false;
            return false;
        }

        return true;
    });

    return result;
}

// 🐘
export function elephantRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
    chessPieces,
}: ChessRule): Dataset | false {
    let direction:
        | "topLeft"
        | "topRight"
        | "bottomLeft"
        | "bottomRight"
        | undefined;
    let placeholderCoordinate: PlaceholderCoordinate = {
        chessX: 0,
        chessY: 0,
    };
    let result: Dataset | false = false;
    const size = radius * 2;
    const { chessX: lastChessX, chessY: lastChessY } = convertChess(
        lastChessData,
        radius
    );

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    switch (lastChessData?.camp) {
        case "dark":
            if (hanldeY >= redLine) {
                return result;
            }
            break;
        case "red":
            if (hanldeY <= darkLine) {
                return result;
            }
            break;
    }

    // 判断马的有效落点位置
    const judgments = [
        // 往右上走的象
        lastChessX + size * 2 === hanldeX && lastChessY - size * 2 === hanldeY,
        lastChessX + size * 2 === hanldeX && lastChessY - size * 2 === hanldeY,

        // 往左上走的象
        lastChessX - size * 2 === hanldeX && lastChessY - size * 2 === hanldeY,
        lastChessX - size * 2 === hanldeX && lastChessY - size * 2 === hanldeY,

        // 往右下走的象
        lastChessX + size * 2 === hanldeX && lastChessY + size * 2 === hanldeY,
        lastChessX + size * 2 === hanldeX && lastChessY + size * 2 === hanldeY,

        // 往左下走的象
        lastChessX - size * 2 === hanldeX && lastChessY + size * 2 === hanldeY,
        lastChessX - size * 2 === hanldeX && lastChessY + size * 2 === hanldeY,
    ];

    for (let index = 0; index < judgments.length; index++) {
        const element = judgments[index];

        if (element) {
            switch (index) {
                case 0:
                case 1:
                    direction = "topRight";
                    break;
                case 2:
                case 3:
                    direction = "topLeft";
                    break;
                case 4:
                case 5:
                    direction = "bottomRight";
                    break;
                case 6:
                case 7:
                    direction = "bottomLeft";
                    break;
            }
            break;
        }
    }

    // 如果象的落点没有方向 那么退出判断
    if (!direction) {
        return false;
    }

    switch (direction) {
        case "topRight":
            placeholderCoordinate.chessX = lastChessX + size;
            placeholderCoordinate.chessY = lastChessY - size;
            break;
        case "topLeft":
            placeholderCoordinate.chessX = lastChessX - size;
            placeholderCoordinate.chessY = lastChessY - size;
            break;
        case "bottomRight":
            placeholderCoordinate.chessX = lastChessX + size;
            placeholderCoordinate.chessY = lastChessY + size;
            break;
        case "bottomLeft":
            placeholderCoordinate.chessX = lastChessX - size;
            placeholderCoordinate.chessY = lastChessY + size;
            break;
        default:
            break;
    }

    chessPieces!.every((p) => {
        const pChessData = convertChess(p, radius);

        result = {
            top: hanldeY - radius,
            left: hanldeX - radius,
        };

        if (
            pChessData.chessX === placeholderCoordinate.chessX &&
            pChessData.chessY === placeholderCoordinate.chessY
        ) {
            result = false;
            return false;
        }

        return true;
    });

    return result;
}

// 仕
export function bodyguardRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
    chessPieces,
}: ChessRule): Dataset | false {
    let result: Dataset | false = false;
    const size = radius * 2;
    const { chessX: lastChessX, chessY: lastChessY } = convertChess(
        lastChessData,
        radius
    );

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    if (hanldeX < 90 || hanldeX > 150) {
        return result;
    }

    switch (lastChessData?.camp) {
        case "dark":
            if (hanldeY < 0 || hanldeY > 60) {
                return false;
            }
            break;
        case "red":
            if (hanldeY < 210 || hanldeY > 270) {
                return false;
            }
            break;
        default:
            break;
    }

    const judgments = [
        // 左上走
        lastChessX - size === hanldeX && lastChessY - size === hanldeY,
        // 右上走
        lastChessX + size === hanldeX && lastChessY - size === hanldeY,
        // 左下走
        lastChessX - size === hanldeX && lastChessY + size === hanldeY,
        // 右下走
        lastChessX + size === hanldeX && lastChessY + size === hanldeY,
    ];

    if (judgments.some((p) => p)) {
        result = {
            top: hanldeY - radius,
            left: hanldeX - radius,
        };
    }

    return result;
}

// 将
export function generalRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
    chessPieces,
}: ChessRule): Dataset | false {
    let result: Dataset | false = false;
    const size = radius * 2;
    const { chessX: lastChessX, chessY: lastChessY } = convertChess(
        lastChessData,
        radius
    );
    const meet: ChessPieces[] = [];

    if (chessData) {
        const converData = convertChess(chessData, radius);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    if (hanldeX < 90 || hanldeX > 150) {
        return result;
    }

    switch (lastChessData?.camp) {
        case "dark":
            if (hanldeY < 0 || hanldeY > 60) {
                return false;
            }
            break;
        case "red":
            if (hanldeY < 210 || hanldeY > 270) {
                return false;
            }
            break;
        default:
            break;
    }

    const theOtherOneGeneral = chessPieces!.find(
        (p) => p.name === "general" && p.camp !== lastChessData?.camp
    );

    chessPieces!.forEach((p) => {
        const converData = convertChess(p, radius);
        const theOtherOneConverData = convertChess(theOtherOneGeneral, radius);

        switch (lastChessData!.camp) {
            case "dark":
                if (
                    converData.chessX === hanldeX &&
                    hanldeX === theOtherOneConverData.chessX &&
                    theOtherOneConverData.chessY >= converData.chessY &&
                    lastChessY <= converData.chessY
                ) {
                    meet.push(p);
                }
                break;
            case "red":
                if (
                    converData.chessX === hanldeX &&
                    hanldeX === theOtherOneConverData.chessX &&
                    theOtherOneConverData.chessY <= converData.chessY &&
                    lastChessY >= converData.chessY
                ) {
                    meet.push(p);
                }
                break;
        }
    });

    if (meet.length === 1) {
        return result;
    }

    const judgments = [
        // top
        lastChessX === hanldeX && lastChessY - size === hanldeY,
        // right
        lastChessX + size === hanldeX && lastChessY === hanldeY,
        // bottom
        lastChessX === hanldeX && lastChessY + size === hanldeY,
        // left
        lastChessX - size === hanldeX && lastChessY === hanldeY,
    ];

    if (judgments.some((p) => p)) {
        result = {
            top: hanldeY - radius,
            left: hanldeX - radius,
        };
    }

    return result;
}

// 炮
export function cannonRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
    radius,
    chessPieces,
}: ChessRule): Dataset | false {
    let result: Dataset | false = false;
    const size = radius * 2;
    const { chessX: lastChessX, chessY: lastChessY } = convertChess(
        lastChessData,
        radius
    );

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
        return result;
    }

    result = {
        top: hanldeY - radius,
        left: hanldeX - radius,
    };

    chessPieces!.every((p) => {
        const pChessData = convertChess(p, radius);

        // 判断当前遍历的棋子是否 在上次点击棋子的线上
        const sameLine = judgments[0]
            ? pChessData.chessY === lastChessY
            : pChessData.chessX === lastChessX;

        if (!sameLine) {
            return true;
        }

        if (chessData) {
            const meet: ChessPieces[] = [];
            chessPieces!.forEach((twoP) => {
                const twoPChessData = convertChess(twoP, radius);

                // 判断两个坐标是否在一条条线
                const judgments = [
                    twoPChessData.chessX !== hanldeX && twoPChessData.chessY === hanldeY,
                    twoPChessData.chessX === hanldeX && twoPChessData.chessY !== hanldeY,
                ];

                if (!judgments[0] && !judgments[1]) {
                    return true;
                }
    
                const saveJudgmentsResult = [
                    lastChessX - hanldeX > 0
                        ? lastChessX > twoPChessData.chessX &&
                          hanldeX < twoPChessData.chessX
                        : lastChessX < twoPChessData.chessX &&
                          hanldeX > twoPChessData.chessX,
                    lastChessY - hanldeY > 0
                        ? lastChessY > twoPChessData.chessY &&
                          hanldeY < twoPChessData.chessY
                        : lastChessY < twoPChessData.chessY &&
                          hanldeY > twoPChessData.chessY,
                ];

                const judgmentsResult = judgments[0]
                    ? saveJudgmentsResult[0]
                    : saveJudgmentsResult[1];

                if (judgmentsResult) {
                    meet.push(twoP);
                }
                return true;
            });

            if (meet.length !== 1) {
                result = false;
            }
        } else {
            // 判断两个棋子之间是否还有其他的棋子
            const saveJudgmentsResult = [
                lastChessX - hanldeX > 0
                    ? lastChessX > pChessData.chessX &&
                      hanldeX < pChessData.chessX
                    : lastChessX < pChessData.chessX &&
                      hanldeX > pChessData.chessX,
                lastChessY - hanldeY > 0
                    ? lastChessY > pChessData.chessY &&
                      hanldeY < pChessData.chessY
                    : lastChessY < pChessData.chessY &&
                      hanldeY > pChessData.chessY,
            ];

            const judgmentsResult = judgments[0]
                ? saveJudgmentsResult[0]
                : saveJudgmentsResult[1];

            if (judgmentsResult) {
                result = false;
                return false;
            }
        }

        return true;
    });

    return result;
}
