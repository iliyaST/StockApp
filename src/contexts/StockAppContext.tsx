import { ReactNode, createContext, useState } from "react";
import { STOCK_LIST } from "../constants";
import { OperationType, StockSelectorType } from "../types";

const calculateInitialPercentage = () => {
    const totalPercentage = 100;
    const remaining = totalPercentage % STOCK_LIST.length;
    const initialPercentagePerStock =
        (totalPercentage - remaining) / STOCK_LIST.length;

    return STOCK_LIST.map((stock, index) => {
        if (index + 1 <= remaining) {
            return {
                name: stock,
                percentage: initialPercentagePerStock + 1,
            };
        }

        return {
            name: stock,
            percentage: initialPercentagePerStock,
        };
    }).sort((a, b) => b.percentage - a.percentage);
};

export type StockAppContextType = {
    selectedStocks: StockSelectorType[];
    updateStockPercentage: ({
        stockName,
        newPercentage,
        operation,
    }: {
        stockName: string;
        newPercentage: number;
        operation: OperationType;
    }) => void;
    removeStock: (stockName: string) => void;
    addStock: (stockName: string) => void;
    toggleStockLock: (stockName: string) => void;
    maxPercentageLeft: number;
    totalMoneyToInvest?: number;
    setTotalMoneyToInvest: (amount: number) => void;
};

export const StockAppContext = createContext<StockAppContextType | null>(null);

export const StockAppProvider = ({ children }: { children: ReactNode }) => {
    const [selectedStocks, setSelectedStocks] = useState<StockSelectorType[]>(
        calculateInitialPercentage
    );
    const [totalMoneyToInvest, setTotalMoneyToInvest] = useState<number>(0);
    const [maxPercentageLeft, setMaxPercentageLeft] = useState<number>(100);

    const updateStockPercentage = ({
        stockName,
        newPercentage,
        operation,
    }: {
        stockName: string;
        newPercentage: number;
        operation: OperationType;
    }) => {
        const newTotalPercentageOfSelectedStocks = selectedStocks.reduce(
            (acc, stock) => {
                if (stock.name === stockName && operation === "remove") {
                    return acc;
                }

                if (stock.name === stockName) {
                    return acc + newPercentage;
                }

                return acc + stock.percentage;
            },
            0
        );

        let totalPercentageLeft = 100 - newTotalPercentageOfSelectedStocks;
        const itemsToUpdate = selectedStocks.filter(
            (stock) => stock.name !== stockName && !stock.isLocked
        );

        if (itemsToUpdate.length > 0) {
            if (totalPercentageLeft < 0) {
                let index = 0;

                while (totalPercentageLeft !== 0) {
                    if (index >= itemsToUpdate.length) {
                        index = 0;
                    }

                    if (itemsToUpdate[index].percentage - 1 < 0) {
                        index += 1;
                        continue;
                    }

                    itemsToUpdate[index].percentage -= 1;

                    totalPercentageLeft += 1;
                    index += 1;
                }
            } else {
                let index = 0;
                while (totalPercentageLeft !== 0) {
                    if (index >= itemsToUpdate.length) {
                        index = 0;
                    }

                    if (itemsToUpdate[index].percentage + 1 > 100) {
                        index += 1;
                        continue;
                    }

                    itemsToUpdate[index].percentage += 1;

                    totalPercentageLeft -= 1;
                    index += 1;
                }
            }
        }

        const lockedStocks =
            operation === "remove"
                ? selectedStocks.filter(
                      (stock) => stock.isLocked && stock.name !== stockName
                  )
                : selectedStocks.filter((stock) => stock.isLocked);

        const updatedStocks = [
            ...itemsToUpdate,
            ...lockedStocks,
            ...(operation !== "remove"
                ? [{ name: stockName, percentage: newPercentage }]
                : []),
        ].sort((a, b) => b.percentage - a.percentage);

        setSelectedStocks(updatedStocks);
    };

    const removeStock = (stockName: string) =>
        updateStockPercentage({
            stockName,
            newPercentage: 0,
            operation: "remove",
        });

    const addStock = (stockName: string) =>
        setSelectedStocks((prevStocks) => [
            ...prevStocks,
            { name: stockName, percentage: 0 },
        ]);

    const toggleStockLock = (stockName: string) => {
        const updatedStocks = selectedStocks.map((stock) =>
            stock.name === stockName
                ? { ...stock, isLocked: !stock.isLocked }
                : stock
        );

        const lockedStocks = updatedStocks.filter((stock) => stock.isLocked);
        const totalLockedPercentage = lockedStocks.reduce(
            (acc, stock) => acc + stock.percentage,
            0
        );
        const percentageLeftToLock = 100 - totalLockedPercentage;

        setMaxPercentageLeft(percentageLeftToLock);
        setSelectedStocks(updatedStocks);
    };

    return (
        <StockAppContext.Provider
            value={{
                selectedStocks,
                updateStockPercentage,
                removeStock,
                addStock,
                toggleStockLock,
                maxPercentageLeft,
                totalMoneyToInvest,
                setTotalMoneyToInvest,
            }}
        >
            {children}
        </StockAppContext.Provider>
    );
};
