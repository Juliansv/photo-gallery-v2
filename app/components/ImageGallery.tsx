"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const ImageGallery = () => {
	useEffect(() => {
		const track = document.getElementById("image-track");
		if (!track) return;

		const animateElement = (
			elementId: string,
			keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
			options: number | KeyframeAnimationOptions | undefined
		) => {
			const element = document.getElementById(elementId);
			element?.animate(keyframes, options);
		};

		const updateHeroSection = (nextPercentage: number) => {
			animateElement(
				"hero-section",
				{
					transform: `translateX(-${nextPercentage * 2}%)`,
					opacity: 1 - nextPercentage / 5,
				},
				{ duration: 1200, fill: "forwards" }
			);
		};

		const updateInfoSection = (nextPercentage: number) => {
			animateElement(
				"info-section",
				{
					transform: `translateX(${98 - nextPercentage}%)`,
					opacity: (nextPercentage - 94) * 0.2,
				},
				{ duration: 1200, fill: "forwards" }
			);
		};

		const updateCounter = (nextPercentage: number) => {
			const bottomCounter = document.getElementById("bottom-counter");
			if (!bottomCounter) return;

			const shouldHideCounter =
				nextPercentage === 0 || nextPercentage > 99;
			bottomCounter.animate(
				{ opacity: shouldHideCounter ? 0 : 1 },
				{ duration: 500, fill: "forwards" }
			);

			const counter = document.getElementById("counter");
			if (!counter) return;

			let counterValue = Math.floor(nextPercentage / 10) + 1;
			counterValue = Math.min(counterValue, 10);

			if (counterValue === Number(counter.innerHTML)) return;

			counter.animate(
				{ opacity: 0 },
				{ duration: 500, fill: "forwards" }
			);
			setTimeout(() => {
				counter.innerHTML = counterValue.toString();
				counter.animate(
					{ opacity: 1 },
					{ duration: 500, fill: "forwards" }
				);
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

		const clampPercentage = (percentage: number) =>
			Math.min(Math.max(percentage, 0), 100);

		const handleMouseMove = (e: MouseEvent) => {
			const { currentPercentage, prevPercentage } = track.dataset;
			if (
				!currentPercentage ||
				!prevPercentage ||
				currentPercentage === "0"
			)
				return;

			const mouseDelta = parseFloat(currentPercentage) - e.clientX;
			const maxDelta = window.innerWidth / 0.5;
			const percentage = (mouseDelta / maxDelta) * -10;
			const nextPercentage = clampPercentage(
				parseFloat(prevPercentage) + percentage
			);

			updateTrackAndImages(nextPercentage);
			updateHeroSection(nextPercentage);
			updateInfoSection(nextPercentage);
			updateCounter(nextPercentage);
		};

		const handleWheel = (e: WheelEvent) => {
			const delta = Math.sign(e.deltaY);
			const nextPercentage = clampPercentage(
				parseFloat(track.dataset.percentage || "0") + delta / 2
			);

			updateTrackAndImages(nextPercentage);
			updateHeroSection(nextPercentage);
			updateInfoSection(nextPercentage);
			updateCounter(nextPercentage);
		};

		const handleKeyDown = (e: KeyboardEvent) => {
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

		window.onmousedown = (e) =>
			(track.dataset.currentPercentage = e.clientX.toString());
		window.onmouseup = () => (track.dataset.currentPercentage = "0");
		window.onmousemove = handleMouseMove;
		window.addEventListener("wheel", handleWheel);
		window.addEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<section
			id="image-track"
			data-current-percentage="0"
			data-prev-percentage="0"
			className="select-none flex absolute top-1/2 left-1/2 gap-[4vmin] transform -translate-x-[0%] -translate-y-1/2 w-max z-40"
		>
			<Link href="/image1">
				<Image
					src="https://lh3.googleusercontent.com/fife/ALs6j_E23XDFFc2bCDX3bDQXJLy3Syf66nUCQjfiTBITPoBGPL2T3OFhacrC_T1kRBs2r3nCmgM14NPfBRfLIp1m6V4atclFlY5EN14z19L53Q95uBKLfJQ7Dvl4xlWO3iE-7BE-YAk9zddb6HfvIY86o4VqESClU8pzs64LB2528uErdxCiJ0ujlq306X5GUQp_euSNnJJzUVplwkTk6_RB3bbwRmkz_YNKLOt35RmSlKfAvFld-kZruSxMr92zsY5HuqHV3noceatyatYdF2Um-5EC8vRqPSja2qPcBieDiKAfipyoAvVHPJfhaDpvPlLxwqmCOO6_-nB7WYu4NbrIfMbPdXwloJxm57UyXDsSwBtxqDoWgiHdDoOg0-UN4CE490Kp_OS35D1HPoToHEpdKFCF0J2m6Ehj446njkiDTW3O4Z2xidSN8-ep8VDIAMc8SqLG0O2wV4LTe8IU06r4I7UA_oytgcu_xRF9WHXNtlvW8Qov_ukIldktnB7Q5E23pjbbQDAVEBKu9ZUDgGsKzPAajcAO9gOZvLRhFfgJr9ujm5K6zKBPieS95PQir624o12ntZfGeakW24Cf07iYHVyWZCjnj26LetxoCOUaKbUmJ6PlYNQd5AUpN9tgw2-hJyRGP1hk1qsYISdElMWGWyEOqJvHf5Fqh1KmFtjmyPdBaaK-yH6GndxALEWmSpPHsNmTMtGdcc6upE6hSycgFsdQum0M3oyTXO8_my6UOX4kfKeA3MDwKGeh7VlJLG7Sh-j2aaH227pF5dehKDgmXeDj0Rxs4EXoDqjVG-kUEL1PgUG-yduinI70CSqi9Abg78dDSYxB0504FPfOjPNow8wYp5UhIj4Gzq3bhcoLOOLV0CDkjNLAYWIxoSplgelBoqwpBU_rDvfzeXGtaZhR48Ft_9o_H2yGVgD1NkyPEvMHmfSl9tCHavECShKcaCSLL2ex-8Em8ODkiz_6rPpqLcFyXIHeB7N4egQ7mD3IJwiXoEBQvQocfmNN0Ef7QtFxN66kdpzLb6xE1HddOZPJ4GRkUKRP_1m2Fq_pVLkqTjXEf4afBOe3BRGrymIJ9k-a8rX-Boorc3VR5LBwnS2UQnsFcohwF9CY9eoUiWgasM9fBwn7UliCisNIKfdXy-UHkUSKlKXpQAtuKQMdBbCb69uv4Ee6A7FfOyKllB3Y5dGfiH1AyXS39HDjdj9VTZxMIor5myj-9NDGRgy_PMVoyJlmFdJuSTsNHl-8_DzgNHzp2DbQVI3XgmpornSK7s4Egx5ZIK_ouzPXa3Umrd7FF3FjX2deg7xX7emXUByMZPHjE7KbIWoQynew4DEpp52dcc5HffdK1mOZFQGFfdVZnqxC5bysBrZ2sy-ccUoHqOMR0vnu8j1Kuv5VP6iT5Kj2U9H_nNhEp0ZUG7upi0qdOm9Iw3sQC-oIbMvousDhgNJD4zynNoY0E_BM4hQRsWj2bZbQQDIiw3vjXilnYt_7TtLWHPoecT8pU1HLIYh7GQQOHMRqzOLZwdPFq57PC6xawAZYt1O2-YceNOZmEFBs4sO9h3yxzDjgnUcc2QPYMAsi8HxMSVgkc-10ykFrErWTSXYevM7MC3rQ9END=w1919-h904"
					alt="image1"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
					priority
				/>
			</Link>

			<Link href="/image2">
				<Image
					src="https://lh3.googleusercontent.com/fife/ALs6j_EGsxPH0kjTvdk3q3NyKqOngChW5Edri0n9H7nN2o0nwSzFOKM3sqtdVcopl-D43oTM-5o436iMzEeEPimhxa_q6JgelbL-i0RYV5c1vIONKQtwx2hZEjMULg8GvB2VeoXNOw60upYPl4iX0yLEHeEStrqw5RHIHlF9BwWRNIHqzCEixTG0mAkZ72_1e1iC3AQgNIaT9GojBiQpDq7FoIOmJn9uS18YIqYGNHXdf3m1KpgbXYvAMi_CZ_QLLide00XQnGULQDpYXK5PmzVpDShJPioAe6dYYmxPgAolGq70GGPHEVvyeqoLkwu-C_s0Y0iw0d-Il2pvsOzAagouSQZ11eILULnzQ72Lucf-LgCiu5A5JuqkUpN9IlS1hF0bbJxlnUBynNoTp2OWLJ2wQ-ma54S_iwJ9gS1iIuh6tvAyogPUCPINfp6BluRD1ZgiXmRv8QDAgmeeqSghissbJbupjD-9saPuW8iX-aTVzhCtw4g0uVlVbcl8j3w-We2R-whfLQO3XxJkaEv7EejfghSNQOzP_I87tOXi5omfmhwMtMHneZQYNzyrX95dEShsFtzfxBui6O-TLAecqgaoOhkJz-C9mC3wcisXxtV2_TtUcQWJYXfiuIFhGq7xGdE3S4g1-aeQPoxktggK9BZAtMrxV54S79BWgIKSzdi9ec0NfXvbxR3-o5SiMtB6c0S9Tiww8MaSDBpQv5x7mF2KyrI95NH7icxcrphdn4RWPniM7DbdgEs6ZQyOkYFuFcxS7kcI5AdkKbBe4B_qC76sDen_U3dpcq7mYu4eT4jaEE5t88tealA6OrbcOsg9woJ0ZoNA9PmIAZo2qbg03aZipQdWZBh2UiCs7LIUEJAj-paLgfg8QvdhJS38JBzCo_d2_FF5-FEyFhmfpL0cpA9i90Wnpk-kni7ZgMiRPwDsUWS24cE1saBHs_3NuBwcjHeGAkR50awpuurBSaH5J2YJWg5PVVI4RBDPelZEiTCSNpkxsP4VB-3DVEQ5aJ0LBt0gibRT8cE9ZxOjRTHCjNMDFpmeQeOxxiVHSqk14_7pFHPfwIXvXeP_1luLnU2L3nfjHvpmD3AJEXTQQ8zIsDMl8pi_v8SpCWkHazOG1gSbGgigBOC6QMOVXt6m4PYuZnWydchCBD1_X33tRLfPL54RUzhrH1_RBZz-xYo8MYqlP3bJ9Y3t-tx_BvEsfPr8UAOfOznrlOvwLIDo9cf4nKVDgJB5FlwbDvb57PMgNkEzwrA-2b4h1CgGa90kmSYkWG1aPhvthHKeckZ_-rj0cSnF2Au9ALou4uifMVJdb7AxDtbxCEM_8gfQ4AFMC1VwhBMPwkskAGgtpkPWrzhGWTV13rJDGHL6oyeqbLW5MWcaolS9kT3cBzN1iRKLSRU5JodutUSCfH6Q-4odKMZ5uJbXZ29iRnexH6_bviMYXIi-WhwwWjD2V9_m2h_uEYowE5yV2WpfKU955sUgiU9j2w4gO7RVkWOi5tXs3PdrkYDnA8zh0FYh_y2vUQF62wxYqwJK6cNMUMmTmU9CQ6IfIC103z8t_SGASvJDl4Qb8fFZSEkeKwNSJKPOMTKopuyR188fn34G_6GLeRZazos93A=w1919-h904"
					alt="image2"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image3">
				<Image
					src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image3"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image4">
				<Image
					src="https://images.unsplash.com/photo-1717760667655-8291ba1c96fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D"
					alt="image4"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image5">
				<Image
					src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image5"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image6">
				<Image
					src="https://images.unsplash.com/photo-1589287707312-213624549c88?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image6"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image7">
				<Image
					src="https://images.unsplash.com/photo-1574774191469-3d7732e5fc8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image7"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image8">
				<Image
					src="https://images.unsplash.com/photo-1624670760266-0ddc7639b3a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image8"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image9">
				<Image
					src="https://images.unsplash.com/photo-1624670760266-0ddc7639b3a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image9"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
			<Link href="/image10">
				<Image
					src="https://images.unsplash.com/photo-1574774191469-3d7732e5fc8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="image10"
					fill={true}
					id="link-image"
					draggable={false}
					className="select-none image object-cover !w-[40vmin] !h-[48vmin] !relative object-left z-10 cursor-none"
				/>
			</Link>
		</section>
	);
};

export default ImageGallery;
