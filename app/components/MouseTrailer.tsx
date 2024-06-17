"use client";

import { useEffect } from "react";

export default function MouseTrailer() {
	useEffect(() => {
		const blob = document.getElementById("blob");

		if (!blob) return;

		document.body.onpointermove = (event) => {
			const { clientX, clientY } = event;

			blob.animate(
				{
					left: `${clientX}px`,
					top: `${clientY}px`,
				},
				{ duration: 125, fill: "forwards" }
			);
		};
	}, []);

	return (
		<>
			<div
				id="blob"
				className="m-0 p-0 h-[50px] aspect-[1/1] fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent backdrop-contrast-200 backdrop-invert backdrop-grayscale z-50"
			></div>
		</>
	);
}
