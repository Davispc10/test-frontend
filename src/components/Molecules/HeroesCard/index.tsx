import React, { FC } from "react";
import { HeroProps } from "../../../utils/interfaces";
import { handleImageError, marvelLogo } from "../../../utils/utils";

export const HeroCard: FC<HeroProps> = ({ image, className, name }) => {
	const imageUrl: string = image!.includes("not_available")
		? marvelLogo
		: image!;

	return (
		<div className="w-full h-full border-2 full border-black rounded-md ">
			<div className={className}>
				<div>
					<img
						onError={handleImageError}
						src={`${imageUrl}.jpg`}
						className="h-32 w-32 xl:h-52 xl:w-52 mb-2 rounded-full border border-black"
						alt=""
					/>
				</div>
				<div>
					<p className="h text-xs xl:text-2xl xl:text-center font-semibold  ">
						{name}
					</p>
				</div>
			</div>
		</div>
	);
};
