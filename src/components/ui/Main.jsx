import React from "react";
import { TaskInput, MainContainer, TaskList } from "../../index";

function Main() {
	return (
		<>
			<MainContainer>
				<TaskInput />
				<TaskList />
			</MainContainer>
		</>
	);
}

export default Main;
