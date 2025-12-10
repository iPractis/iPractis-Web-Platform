// Images && icons
import womanWorking from "@/public/images/working-woman.jpg";
import twoUsers from "@/public/icons/2-users.png";
import library from "@/public/icons/library.png";
import { SparkleIcon } from "../../Icons";
import Image from "next/image";
import IconHeader from "../../Shared/IconHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";

const MeetOurServices = () => {
	return (
		<SectionWrapper className={"w-[1000px] mx-auto"}>
			<IconHeader
				icon={<SparkleIcon />}
				title="Meet our services"
				description="Start learning today"
				className="w-[calc(100%+160px)] md:ml-[-65px]"
			/>

			<SectionContent className="w-full">
				<article className="flex gap-[32px]">
					<div className="flex flex-col justify-between gap-[32px]">
						<div className="bg-secondary-color-S11 w-[368px] text-center rounded-[32px] p-[32px]">
							<Image
								alt={"2 Users Icon"}
								className="w-16 mx-auto"
								src={twoUsers}
							/>

							<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
								Dedicated lessons
							</h2>

							<p className="text-primary-color-P6 ST-3">
								Find teachers from all over the world sharing their languages,
								dialects, and cultures.
							</p>
						</div>

						<div className="bg-secondary-color-S11 w-[368px] text-center rounded-[32px] p-[32px]">
							<Image
								alt={"Icon library"}
								className="w-16 mx-auto"
								src={library}
							/>

							<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
								Library access
							</h2>
							<p className="text-primary-color-P6 ST-3">
								Find teachers from all over the world sharing their languages,
								dialects, and cultures.
							</p>
						</div>
					</div>

					<div className="h-full">
						<Image
							alt="Woman Working"
							className="sm:h-[428px] w-[600px] h-full object-cover rounded-[32px]"
							src={womanWorking}
						/>{" "}
					</div>
				</article>
			</SectionContent>
		</SectionWrapper>
	);
};

export default MeetOurServices;
