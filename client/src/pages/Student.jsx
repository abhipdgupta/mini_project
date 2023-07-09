import React from "react";
import { useParams } from "react-router-dom";

export const Student = () => {
	const { id } = useParams();
	console.log(id);

	if (id) {
		return <>Student {id}</>;
	}

	return (
		<>
			<div>Student </div>
		</>
	);
};
