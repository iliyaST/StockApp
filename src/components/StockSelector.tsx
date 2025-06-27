import { Close } from "@mui/icons-material";
import { IconButton, Slider, Stack, Typography } from "@mui/material";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { StockAppContext } from "../contexts/StockAppContext";
import { StockSelectorType } from "../types";

export const StockSelector = ({
    name: stockName,
    percentage,
    isLocked = false,
}: StockSelectorType) => {
    const {
        updateStockPercentage,
        removeStock,
        toggleStockLock,
        maxPercentageLeft,
    } = useContext(StockAppContext)!;
    const [value, setValue] = useState(percentage);

    const handlePercentageChange = (_: Event, newValue: number | number[]) => {
        const newPercentage = Array.isArray(newValue) ? newValue[0] : newValue;
        setValue(newPercentage);
    };

    const handlePercentageChangeCommitted = (
        _: Event | SyntheticEvent<Element, Event>,
        newValue: number | number[]
    ) => {
        const newPercentage = Array.isArray(newValue) ? newValue[0] : newValue;

        updateStockPercentage({
            stockName,
            newPercentage:
                newPercentage > maxPercentageLeft
                    ? maxPercentageLeft
                    : newPercentage,
            operation: "update",
        });

        if (newPercentage > maxPercentageLeft) {
            setValue(maxPercentageLeft);
        }
    };

    const handleRemoveStock = () => removeStock(stockName);

    useEffect(() => {
        setValue(percentage);
    }, [percentage]);

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Stack width={80}>
                <Typography>{stockName}</Typography>
            </Stack>
            <Stack sx={{ width: 200 }}>
                <Slider
                    value={value}
                    min={0}
                    max={100}
                    onChange={handlePercentageChange}
                    onChangeCommitted={handlePercentageChangeCommitted}
                    disabled={!!isLocked}
                />
            </Stack>
            <Stack sx={{ width: 40 }}>
                <Typography>{`${value}`}%</Typography>
            </Stack>
            <Stack
                sx={{ cursor: "pointer", width: 60 }}
                onClick={toggleStockLock.bind(null, stockName)}
            >
                <Typography>{isLocked ? "Unlock" : "Lock"}</Typography>
            </Stack>
            <Stack>
                <IconButton
                    size="small"
                    color="info"
                    sx={{ padding: 0, width: 30, height: 30 }}
                    aria-label="remove stock"
                    onClick={handleRemoveStock}
                >
                    <Close />
                </IconButton>
            </Stack>
        </Stack>
    );
};
