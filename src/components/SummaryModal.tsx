import { Box, Button, Modal, Stack } from "@mui/material";
import { useContext } from "react";
import { StockAppContext } from "../contexts/StockAppContext";
import Big from "big.js";

export const SummaryModal = ({ onClose }: { onClose: () => void }) => {
    const { selectedStocks, totalMoneyToInvest } = useContext(StockAppContext)!;

    return (
        <Modal open onClose={onClose}>
            <Box
                sx={{
                    position: "absolute" as "absolute",
                    top: "calc(50% - 10px)",
                    left: "calc(50% + 0px)",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    height: 700,
                    bgcolor: "#fff",
                    boxShadow: 24,
                    color: "#000",
                    display: "flex",
                    borderRadius: 2,
                    p: 2,
                    overflow: "auto",
                }}
            >
                <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Stack>
                        <Stack direction="row" justifyContent="center">
                            <h2>Summary</h2>
                        </Stack>
                        <Stack direction="row" justifyContent="center">
                            <p>
                                Here you can see the summary of your stock
                                investments.
                            </p>
                        </Stack>
                        {selectedStocks.length > 0 && totalMoneyToInvest ? (
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ padding: "20px" }}
                            >
                                {selectedStocks.map((stock) => (
                                    <Stack
                                        key={stock.name}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <span>{stock.name}</span>${" "}
                                        {new Big(stock.percentage)
                                            .div(100)
                                            .times(new Big(totalMoneyToInvest))
                                            .toFixed(2)}
                                    </Stack>
                                ))}
                            </Stack>
                        ) : (
                            <p>
                                {!totalMoneyToInvest
                                    ? "Please select money to invest."
                                    : "No stocks selected."}
                            </p>
                        )}
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        sx={{ paddingBottom: "20px" }}
                    >
                        <Button
                            sx={{ color: "#fff", width: "120px" }}
                            variant="contained"
                            onClick={onClose}
                        >
                            Okay
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};
