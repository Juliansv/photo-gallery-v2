import ImageGallery from "@/app/components/ImageGallery";
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import BottomCounter from "./components/BottomCounter";
import MouseTrailer from "./components/MouseTrailer";

export default function Home() {
	return (
		<>
			<main className="select-none flex" draggable={false}>
				<HeroSection />
				<ImageGallery />
				<InfoSection />
				<BottomCounter />
                <MouseTrailer />
			</main>
		</>
	);
}
