import React, { useEffect, useState, useRef, useCallback } from "react";
import { Input, Button } from "../../index";
import appwriteService from "../../../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	removeTask,
	addTasks,
	toggleComplete,
	addEditingTaskToStore,
} from "../../../store/appSlice";

function TaskList() {
	const userId = useSelector((state) => state.auth.userData.$id);
	const storeTasks = useSelector((state) => state.auth.tasks);
	const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
	const dispatch = useDispatch();
	const [editedTask, setEditedtTask] = useState(null);
	const [editedDate, setEditedDate] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const editingTask = useSelector((state) => state.auth.editingTask);
	// console.log(storeTasks);
	// console.log(editingTask);

	useEffect(() => {
		if (userId) {
			appwriteService.getTasks(userId).then((tasklist) => {
				if (tasklist) {
					dispatch(addTasks(tasklist.documents));
				}
			});
		}
	}, []);

	return storeTasks.length !== 0 ? (
		<div className="mx-auto px-[1.2rem]">
			<div className="grid grid-cols-[1fr_4.5fr_4.5fr] mb-[1.5rem] mt-[1rem]">
				<div className=""></div>

				<p>Title</p>

				<p className="">Due Date</p>

				<div className="">{""}</div>
			</div>

			{storeTasks.map((todo) => (
				<div
					key={todo.$id}
					className="grid grid-cols-[1fr_4.5fr_4.5fr] text-gray-700 text-[0.95rem] ">
					<div className="">
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={async () => {
								await appwriteService.updateTask(todo.$id, {
									...todo,
									completed: !todo.completed,
								});
								dispatch(toggleComplete(todo.$id));
								console.log(todo);
							}}
							disabled={isEditing}
						/>
					</div>
					<div className={`${todo.completed ? "line-through" : ""}`}>
						{todo.task}
					</div>

					<div className="flex gap-[1rem]">
						{new Date(todo.date).toLocaleDateString("en-uk", dateOptions)}
						<div>
							<button
								onClick={async () => {
									await appwriteService.deleteTask(todo.$id);
									dispatch(removeTask(todo.$id));
								}}>
								<ion-icon name="trash-outline"></ion-icon>
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	) : null;
}

export default TaskList;
