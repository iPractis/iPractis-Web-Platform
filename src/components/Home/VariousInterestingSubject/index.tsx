import { variousInterestingSubjects } from "@/src/data/dataHome";
import { BadgeStarIcon } from "../../Icons";
import Image from "next/image";
import IconHeader from "../../Shared/IconHeader";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";

const VariousInterestingSubject = () => {
	return (
		<SectionWrapper className={"w-[1000px] mx-auto"}>
			<IconHeader
				icon={<BadgeStarIcon />}
				title="Various interesting subject"
				description="Start learning today"
				className="w-[calc(100%+160px)] md:ml-[-65px]"
			/>

			<SectionContent className="w-full">
				<div className="flex justify-between gap-[32px]">
					{variousInterestingSubjects?.map((interestingSubject, index) => {
						return (
							<div
								className="bg-secondary-color-S11 w-[226px] text-center rounded-[32px] p-[32px]"
								key={
									interestingSubject?.subjectTitle ??
									`interesting-subject-${index}`
								}
							>
								<Image
									alt={interestingSubject?.subjectIconAlt}
									src={interestingSubject?.subjectIcon}
									className="w-[50px] h-[44px] object-contain mx-auto"
								/>

								<h2 className="text-primary-color-P4 MT-SB-1 sm:mt-5 mt-3 sm:mb-2 mb-1.5">
									{interestingSubject?.subjectTitle}
								</h2>

								<p className="text-primary-color-P6 ST-3">
									{interestingSubject?.subjectDesc}
								</p>
							</div>
						);
					})}
				</div>
			</SectionContent>
		</SectionWrapper>
	);
};

export default VariousInterestingSubject;
