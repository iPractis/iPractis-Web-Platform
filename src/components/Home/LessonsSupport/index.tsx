import BottomSection from "./BottomSection";

// Images && icons
import teacherOnline from "@/public/images/teacher-online.jpg";
import twoUsersSpeaking from "@/public/icons/2-users-speaking.png";
import userParachute from "@/public/icons/user-parachute.png";
import starBadge from "@/public/icons/star-badge.png";
import { SparkleIcon } from "../../Icons";
import Image from "next/image";
import IconHeader from "../../Shared/IconHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";

const LessonsSupport = () => {
	return (
		<SectionWrapper className={"w-[1000px] mx-auto"}>
			<IconHeader
				icon={<SparkleIcon />}
				title="Discover how online lessons can support You"
				description="From school support to professional skill improvement, find lessons that fit your needs and learning style."
				className="w-[calc(100%+160px)] md:ml-[-65px]"
			/>

			<SectionWrapper className="">
				<SectionContent className="w-full">
					<article className="flex justify-between gap-[32px]">
						<div className="flex flex-col justify-between gap-[32px]">
								<div className="bg-secondary-color-S11 flex-1 w-[368px] text-center rounded-[32px] p-[32px]">
									<Image
										alt={"2 Users Icon"}
										className="w-[42px] mx-auto"
										src={twoUsersSpeaking}
									/>

									<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] md:mt-5 mt-3">
										Conversational lessons
									</h2>

									<p className="text-primary-color-P6 ST-3">
										Practice real-life conversations to improve fluency and
										confidence.
									</p>
								</div>

								<div className="bg-secondary-color-S11 flex-1 w-[368px] text-center rounded-[32px] p-[32px]">
									<Image
										alt={"Icon User Parachute"}
										className="w-[46px] mx-auto"
										src={userParachute}
									/>

									<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
										School Support
									</h2>
									<p className="text-primary-color-P6 ST-3">
										Get personalized help to reinforce what you’re learning in
										class.
									</p>
								</div>

								<div className="bg-secondary-color-S11 flex-1 w-[368px] text-center rounded-[32px] p-[32px]">
									<Image
										alt={"Icon Start Badge"}
										className="w-[21px] mx-auto"
										src={starBadge}
									/>

									<h2 className="text-primary-color-P4 MT-SB-1 md:mb-2 mb-[10px] mt-5">
										Exam preparation
									</h2>
									<p className="text-primary-color-P6 ST-3">
										Focused guidance to help you excel in your upcoming exams.
									</p>
								</div>
						</div>

						<div className="">
							<Image
								alt="Woman Working"
								className="w-full sm:h-[682px] h-full object-cover rounded-[32px]"
								src={teacherOnline}
							/>
						</div>
					</article>
				</SectionContent>

				<BottomSection />
			</SectionWrapper>
		</SectionWrapper>
	);
};

export default LessonsSupport;
