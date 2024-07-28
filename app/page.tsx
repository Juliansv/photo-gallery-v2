import PhotoGallery from "@/app/components/PhotoGallery";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";

export default function Home() {
	return (
		<>
			<main className="select-none flex" draggable={false}>
				<HeroSection />
				<PhotoGallery />
				<AboutSection />
			</main>
		</>
	);
}
