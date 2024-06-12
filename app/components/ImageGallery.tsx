"use client";

import Image from "next/image";
import { useEffect } from "react";

const ImageGallery = () => {
	useEffect(() => {
        const track = document.getElementById("image-track");
        if (!track) return;
      
        const animateElement = (elementId: string, keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options: number | KeyframeAnimationOptions | undefined) => {
          const element = document.getElementById(elementId);
          element?.animate(keyframes, options);
        };
      
        const updateHeroSection = (nextPercentage: number) => {
          animateElement("hero-section", {
            transform: `translateX(-${nextPercentage * 2}%)`,
            opacity: 1 - nextPercentage / 5,
          }, { duration: 1200, fill: "forwards" });
        };
      
        const updateInfoSection = (nextPercentage: number) => {
          animateElement("info-section", {
            transform: `translateX(${98 - nextPercentage}%)`,
            opacity: (nextPercentage - 94) * 0.2,
          }, { duration: 1200, fill: "forwards" });
        };
      
        const updateCounter = (nextPercentage: number) => {
          const bottomCounter = document.getElementById("bottom-counter");
          if (!bottomCounter) return;
      
          const shouldHideCounter = nextPercentage === 0 || nextPercentage > 99;
          bottomCounter.animate({ opacity: shouldHideCounter ? 0 : 1 }, { duration: 500, fill: "forwards" });
      
          const counter = document.getElementById("counter");
          if (!counter) return;
      
          let counterValue = Math.floor(nextPercentage / 10) + 1;
          counterValue = Math.min(counterValue, 10);
      
          if (counterValue === Number(counter.innerHTML)) return;
      
          counter.animate({ opacity: 0 }, { duration: 500, fill: "forwards" });
          setTimeout(() => {
            counter.innerHTML = counterValue.toString();
            counter.animate({ opacity: 1 }, { duration: 500, fill: "forwards" });
          }, 100);
        };
      
        const updateTrackAndImages = (nextPercentage: number) => {
          track.dataset.percentage = nextPercentage.toString();
          track.dataset.prevPercentage = nextPercentage.toString();
      
          track.animate(
            { transform: `translate(-${nextPercentage}%, -50%)` },
            { duration: 1200, fill: "forwards" }
          );
      
          for (const image of track.getElementsByClassName("image")) {
            image.animate(
              { objectPosition: `${nextPercentage}% 50%` },
              { duration: 1200, fill: "forwards" }
            );
          }
        };
      
        const clampPercentage = (percentage: number) => Math.min(Math.max(percentage, 0), 100);
      
        const handleMouseMove = (e:MouseEvent) => {
          const { currentPercentage, prevPercentage } = track.dataset;
          if (!currentPercentage || !prevPercentage || currentPercentage === "0") return;
      
          const mouseDelta = parseFloat(currentPercentage) - e.clientX;
          const maxDelta = window.innerWidth / 0.5;
          const percentage = (mouseDelta / maxDelta) * -10;
          const nextPercentage = clampPercentage(parseFloat(prevPercentage) + percentage);
      
          updateTrackAndImages(nextPercentage);
          updateHeroSection(nextPercentage);
          updateInfoSection(nextPercentage);
          updateCounter(nextPercentage);
        };
      
        const handleWheel = (e:WheelEvent) => {
          const delta = Math.sign(e.deltaY);
          const nextPercentage = clampPercentage(
            parseFloat(track.dataset.percentage || "0") + delta / 2
          );
      
          updateTrackAndImages(nextPercentage);
          updateHeroSection(nextPercentage);
          updateInfoSection(nextPercentage);
          updateCounter(nextPercentage);
        };
      
        const handleKeyDown = (e:KeyboardEvent) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            const delta = e.key === "ArrowDown" ? 1 : -1;
            const nextPercentage = clampPercentage(
              parseFloat(track.dataset.percentage || "0") + delta
            );
      
            updateTrackAndImages(nextPercentage);
            updateHeroSection(nextPercentage);
            updateInfoSection(nextPercentage);
            updateCounter(nextPercentage);
          }
        };
      
        window.onmousedown = (e) => (track.dataset.currentPercentage = e.clientX.toString());
        window.onmouseup = () => (track.dataset.currentPercentage = "0");
        window.onmousemove = handleMouseMove;
        window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKeyDown);
      }, []);
      

	return (
		<div
			id="image-track"
			data-current-percentage="0"
			data-prev-percentage="0"
			className="select-none flex absolute top-1/2 left-1/2 gap-[4vmin] transform -translate-x-[0%] -translate-y-1/2 w-max"
			draggable={false}
		>
			<Image
				src="https://images.unsplash.com/photo-1717809526314-f959525c4fb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image1"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
				priority
			/>

			<Image
				src="https://images.unsplash.com/photo-1713815711692-69ce046b7a5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image2"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image3"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1717760667655-8291ba1c96fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D"
				alt="image4"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image5"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1589287707312-213624549c88?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image6"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1574774191469-3d7732e5fc8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image7"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1624670760266-0ddc7639b3a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image8"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1624670760266-0ddc7639b3a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image9"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>

			<Image
				src="https://images.unsplash.com/photo-1574774191469-3d7732e5fc8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="image10"
				fill={true}
				draggable={false}
				className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left"
			/>
		</div>
	);
};

export default ImageGallery;
