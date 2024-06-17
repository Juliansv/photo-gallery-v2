const BottomCounter = () => {
	return (
		<section
			className="absolute h-full w-full opacity-0 z-0"
			id="bottom-counter"
		>
			<div className="w-40 absolute bottom-20 left-1/2">
				<span id="counter">1</span> - 10
			</div>
		</section>
	);
};

export default BottomCounter;
