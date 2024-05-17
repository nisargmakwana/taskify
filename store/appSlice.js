import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	userData: null,
	tasks: [],
	editingTask: null,
};

const appSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload;
		},
		logout: (state) => {
			state.status = false;
			state.userData = null;
		},
		addTask: (state, action) => {
			state.tasks.push(action.payload);
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.$id !== action.payload);
		},
		addTasks: (state, action) => {
			state.tasks = action.payload;
		},
		toggleComplete: (state, action) => {
			state.tasks = state.tasks.map((task) =>
				task.$id === action.payload
					? { ...task, completed: !task.completed }
					: task
			);
		},
		updateTask: (state, action) => {
			const { $id, newTask, date } = action.payload;
			state.tasks = state.tasks.map((task) =>
				task.$id === $id
					? {
							...task,
							task: newTask,
							date: date,
					  }
					: task
			);
		},
		addEditingTaskToStore: (state, action) => {
			state.editingTask = action.payload;
			// console.log(state.editingTask);
		},
	},
});

export const {
	login,
	logout,
	addTask,
	removeTask,
	addTasks,
	updateTask,
	toggleComplete,
	addEditingTaskToStore,
} = appSlice.actions;
export default appSlice.reducer;
