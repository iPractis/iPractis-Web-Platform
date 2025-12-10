import hero from "@/public/images/home-hero.png";
import Image from "next/image";
import ActionButtonRightIcon from "../../Shared/ActionButtonRightIcon";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";

const Hero = () => {
	return (
		<SectionWrapper>
			<SectionContent className="w-[1000px] mx-auto">
				<div className="flex justify-between gap-[100px]">
					<div className="flex flex-col justify-between">
						<h1 className="text-primary-color-P1 md:LT-SB-2 LT-SB-1">
							Learn any subject with{" "}
							<span className="block">top-rated tutor</span>
						</h1>

						<ul className="ST-4 list-disc text-primary-color-P4 ps-5 space-y-2">
							<li>
								<p>1 : 1 Online Lessons with a real matched tutors</p>
							</li>
							<li>
								<p>Flexible scheduling and rescheduling</p>
							</li>
							<li>
								<p>Access to a library</p>
							</li>
						</ul>
						<ActionButtonRightIcon description="Get Started" />
					</div>

					<div className="">
						<Image
							className=""
							alt="Hero Image"
							src={hero}
							priority
              unoptimized
						/>
					</div>
				</div>
			</SectionContent>
		</SectionWrapper>
	);
};

export default Hero;
