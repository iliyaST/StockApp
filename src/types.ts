export type StockSelectorType = {
    name: string;
    percentage: number;
    isLocked?: boolean;
};

export type OperationType = "add" | "remove" | "update";
