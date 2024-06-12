const InfoSection = () => {
	return (
		<section id="info-section" className="w-[50vw] opacity-0 text-center flex">
			<div className="h-screen flex flex-col items-center justify-center gap-4 p-10 w-1/2 m-auto">
				<h2 className="text-4xl font-bold">About me</h2>
				<p className="text-xl">Cosas sobre emilio</p>
                <div className="flex justify-around w-full">
                    <span>Instagram</span>
                    <span>|</span>
                    <span>Facebook</span>
                </div>
			</div>
		</section>
	);
};

export default InfoSection;
