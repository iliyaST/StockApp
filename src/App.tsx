import { Button, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import { AddStockButton } from "./components/AddStockButton";
import { StockSelector } from "./components/StockSelector";
import { SummaryModal } from "./components/SummaryModal";
import { TotalMoneyInvestField } from "./components/TotalMoneyInvestField";
import { StockAppContext } from "./contexts/StockAppContext";

export default function App() {
    const { selectedStocks } = useContext(StockAppContext)!;

    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

    const handleCloseSummaryModal = () => setIsSummaryModalOpen(false);
    const handleOpenSummaryModal = () => setIsSummaryModalOpen(true);

    return (
        <Container maxWidth="sm">
            {isSummaryModalOpen && (
                <SummaryModal onClose={handleCloseSummaryModal} />
            )}
            <TotalMoneyInvestField />
            {selectedStocks.map((stock) => (
                <StockSelector
                    key={stock.name}
                    name={stock.name}
                    percentage={stock.percentage}
                    isLocked={stock.isLocked}
                />
            ))}
            <Stack alignItems="start">
                <AddStockButton />
            </Stack>
            <Stack alignItems="end">
                <Button variant="contained" onClick={handleOpenSummaryModal}>
                    Submit
                </Button>
            </Stack>
        </Container>
    );
}
