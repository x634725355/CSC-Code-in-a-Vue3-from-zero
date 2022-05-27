import { Ref } from "vue";

export type NameKey =
    | "car"
    | "horse"
    | "elephant"
    | "bodyguard"
    | "general"
    | "soldier"
    | "cannon";

export type CampKey = "red" | "dark";

export interface ChessPieces {
    name: NameKey;
    top: number;
    left: number;
    camp: CampKey;
    select: boolean;
}

interface Props {
    size: Ref<number>;
    radius: Ref<number>;
    height: Ref<number>;
}

export function configuration(props: Props) {
    const { height, size, radius } = props;

    const chessType: NameKey[] = [
        "car",
        "horse",
        "elephant",
        "bodyguard",
        "general",
        "bodyguard",
        "elephant",
        "horse",
        "car",
    ];

    const darkChess = chessType.map<ChessPieces>((value, index) => {
        return {
            camp: "dark",
            name: value,
            top: -radius.value,
            left: size.value * index - radius.value,
            select: false,
        };
    });

    const redChess = chessType.map<ChessPieces>((value, index) => {
        return {
            camp: "red",
            name: value,
            top: height.value - radius.value,
            left: size.value * index - radius.value,
            select: false,
        };
    });

    redChess.push(
        {
            camp: "red",
            name: "cannon",
            top: size.value * 7 - radius.value,
            left: size.value - radius.value,
            select: false,
        },
        {
            camp: "red",
            name: "cannon",
            top: size.value * 7 - radius.value,
            left: size.value * 7 - radius.value,
            select: false,
        }
    );

    darkChess.push(
        {
            camp: "dark",
            name: "cannon",
            top: size.value * 2 - radius.value,
            left: size.value - radius.value,
            select: false,
        },
        {
            camp: "dark",
            name: "cannon",
            top: size.value * 2 - radius.value,
            left: size.value * 7 - radius.value,
            select: false,
        }
    );

    [0, 2, 4, 6, 8].forEach((value) => {
        darkChess.push({
            camp: "dark",
            name: "soldier",
            top: size.value * 3 - radius.value,
            left: size.value * value - radius.value,
            select: false,
        });

        redChess.push({
            camp: "red",
            name: "soldier",
            top: size.value * 6 - radius.value,
            left: size.value * value - radius.value,
            select: false,
        });
    });

    return {
        darkChess,
        redChess,
    };
}

export const chessText = {
    dark: {
        car: "车",
        horse: "马",
        elephant: "象",
        bodyguard: "士",
        general: "将",
        soldier: "卒",
        cannon: "炮",
    },
    red: {
        car: "车",
        horse: "马",
        elephant: "象",
        bodyguard: "仕",
        general: "帅",
        soldier: "兵",
        cannon: "炮",
    },
};
