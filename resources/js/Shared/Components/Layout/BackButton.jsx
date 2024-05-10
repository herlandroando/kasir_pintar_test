import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
    function handleBack() {
        history.back();
    }

    return (
        <Button variant="text" onClick={handleBack} className="flex flex-row gap-1 p-3">
            <ChevronLeft></ChevronLeft> <Typography variant="paragraph">Back</Typography>
        </Button>
    );
}
