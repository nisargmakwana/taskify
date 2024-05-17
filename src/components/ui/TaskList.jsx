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
		<>
			<div className="flex mt-[2rem] mb-[2rem]">
				<div className="w-[2.4rem]"></div>
				<div className="w-[36rem]">
					<p>Title</p>
				</div>
				<div>
					<p className="w-[11rem]">Due Date</p>
				</div>
				<div className="w-[7rem] ml-[1.2rem]">{""}</div>
			</div>

			{storeTasks.map((todo) => (
				<div
					key={todo.$id}
					className="flex items-center text-gray-700 text-[0.95rem] ">
					<div className="w-[2.4rem] ml-[0.2rem]">
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
					<input
						type="text"
						className={`${todo.completed ? "line-through" : ""}  w-[36rem]`}
						value={todo.task}
						readOnly={!isEditing}
					/>

					<p className="w-[11rem]">
						{new Date(todo.date).toLocaleDateString("en-uk", dateOptions)}
					</p>
					<div className="w-[7rem] flex gap-[1rem]  ">
						<button
							onClick={async () => {
								await appwriteService.deleteTask(todo.$id);
								dispatch(removeTask(todo.$id));
							}}>
							<ion-icon name="trash-outline"></ion-icon>
						</button>
						{/* <button
							onClick={() => {
								setIsEditing(true);
								dispatch(addEditingTaskToStore(todo));
							}}>
							<ion-icon name="create-outline"></ion-icon>
						</button> */}
					</div>
				</div>
			))}
		</>
	) : null;
}

export default TaskList;
