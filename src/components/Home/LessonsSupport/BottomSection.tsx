// Images && icons
import womanComputer from "@/public/images/woman-computer.jpg";
import bee from "@/public/icons/bee.png";
import sun from "@/public/icons/sun.png";

import Image from "next/image";

const BottomSection = () => {
	return (
		<article className="flex gap-[32px] justify-between">
			<div className="">
				<Image
					alt="Woman Taking Classes"
					className="w-[600px] h-[444px] object-cover rounded-[32px]"
					src={womanComputer}
				/>
			</div>

			<div className="flex flex-col h-[444px] gap-[32px] justify-between">
				<div className="bg-secondary-color-S11 flex-1 text-center rounded-[32px] w-[368px] p-[32px]">
					<Image alt={"Icon Sun"} className="w-[46px] mx-auto" src={sun} />

					<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
						Initiation lessons
					</h2>

					<p className="text-primary-color-P6 ST-3">
						Start from the basics and build a strong foundation in any subject.
					</p>
				</div>

				<div className="bg-secondary-color-S11 flex-1 text-center rounded-[32px] w-[368px] p-[32px]">
					<Image alt={"Icon Bee"} className="w-[42px] mx-auto" src={bee} />

					<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
						Professional skills improvement
					</h2>
					<p className="text-primary-color-P6 ST-3">
						Enhance your career by developing essential skills for the
						workplace.
					</p>
				</div>
			</div>
		</article>
	);
};

export default BottomSection;
