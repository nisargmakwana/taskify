import React from "react";
import {
	Button,
	Calendar,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "../../index";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
function DatePicker() {
	const [position, setPosition] = React.useState("bottom");
	const [date, setDate] = React.useState("");
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-fit justify-start text-left font-normal, border-0, rounded-none bg-slate-100 hover:bg-slate-200",
						!date && "text-muted-foreground"
					)}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span></span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export default DatePicker;
