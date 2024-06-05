import React, { useState } from "react";
import {
	Input,
	Button,
	Calendar,
	Popover,
	PopoverTrigger,
	PopoverContent,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../index";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import appwriteService from "../../../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../../store/appSlice";

function TaskInput() {
	const { register, handleSubmit, reset } = useForm();
	const [date, setDate] = React.useState("");
	const userData = useSelector((state) => state.auth.userData);
	const dispatch = useDispatch();
	const editingTask = useSelector((state) => state.auth.editingTask);
	const todayDate = Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	}).format(new Date());
	console.log(todayDate);

	const addHandler = async (data) => {
		// if (editingTask) {
		// 	const task = await appwriteService.updateTask(editingTask.$id, {
		// 		...data,
		// 		userid: editingTask.userid,
		// 		date: date,
		// 		completed: false,
		// 	});
		// 	dispatch(updateTask(task));
		// } else {
		const task = await appwriteService.createTask({
			...data,
			userid: userData.$id,
			date: date ? date : todayDate,
			completed: false,
		});
		dispatch(addTask(task));

		reset();
		setDate(null);
	};
	return (
		<>
			<form onSubmit={handleSubmit(addHandler)}>
				<div className="flex w-full items-center space-x-2">
					<Input
						type="text"
						placeholder="add a Task"
						className="w-full h-[3.5rem] border-b-0 rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-gray-0 focus-visible:ring-offset-none"
						{...register("task", { required: true })}
					/>
				</div>
				<div className="flex bg-slate-100">
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
					<Button
						variant="outline"
						type="submit"
						className="bg-slate-100 hover:bg-slate-200  ">
						add
					</Button>
				</div>
			</form>
		</>
	);
}

export default TaskInput;
