import { Stack, TextField, Typography, debounce } from "@mui/material";
import { useContext } from "react";
import { StockAppContext } from "../contexts/StockAppContext";
import { AttachMoney } from "@mui/icons-material";

export const TotalMoneyInvestField = () => {
    const { setTotalMoneyToInvest } = useContext(StockAppContext)!;

    const handleMoneyToInvestChange = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value);

            if (!isNaN(value)) {
                setTotalMoneyToInvest(value);
            }
        },
        500
    );

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            width={500}
            sx={{ paddingBottom: "30px" }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
                width={300}
            >
                Money to Invest
            </Typography>
            <TextField
                type="number"
                id="stock-name"
                variant="outlined"
                fullWidth
                size="small"
                slotProps={{
                    htmlInput: { min: 0 },
                    input: {
                        startAdornment: (
                            <Stack justifyContent="center" padding="0px 5px">
                                <AttachMoney fontSize="small" />
                            </Stack>
                        ),
                        style: { height: 36, padding: 0 },
                    },
                }}
                onChange={handleMoneyToInvestChange}
            />
        </Stack>
    );
};
