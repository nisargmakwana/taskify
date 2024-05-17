import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
	const [loader, setLodaer] = useState(true);
	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authentication && authentication !== authStatus) {
			navigate("/login");
		} else if (!authentication && authentication !== authStatus) {
			navigate("/home");
		}
		setLodaer(false);
	}, [authentication, navigate, authStatus]);

	return loader ? <div>Loading...</div> : <>{children}</>;
}

export default Protected;
