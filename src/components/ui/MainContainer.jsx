import React from "react";

function MainContainer({ children, className = "" }) {
	return <div className={`${className} m-[1rem]`}>{children}</div>;
}

export default MainContainer;
