import { useContext, useState } from "react";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { StockAppContext } from "../contexts/StockAppContext";
import { STOCK_LIST } from "../constants";

export const AddStockButton = () => {
    const { selectedStocks, addStock } = useContext(StockAppContext)!;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleMenuItemClick = (stockName: string) => {
        handleClose();
        addStock(stockName);
    };

    const options = STOCK_LIST.filter(
        (stock) => !selectedStocks.some((s) => s.name === stock)
    );

    return (
        <Stack sx={{ paddingTop: "40px" }}>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                disabled={!options.length}
                startIcon={<Add />}
                variant="contained"
                color={!options.length ? "inherit" : "primary"}
                sx={{
                    opacity: !options.length ? 0.5 : 1,
                    cursor: !options.length ? "not-allowed" : "pointer",
                }}
            >
                Add
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        "aria-labelledby": "basic-button",
                        sx: { width: "150px" },
                    },
                }}
            >
                {options.map((stock) => (
                    <MenuItem
                        key={stock}
                        onClick={handleMenuItemClick.bind(null, stock)}
                    >
                        {stock}
                    </MenuItem>
                ))}
            </Menu>
        </Stack>
    );
};
