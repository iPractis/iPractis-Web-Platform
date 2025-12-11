import LanguagesCarousel from "./LanguagesCarousel";
import { NotebookOpenedIcon } from "../../Icons";
import TutorCards from "./TutorCards";
import SectionWrapper from "../../Shared/SectionWrapper";

import "swiper/css/navigation";
import "swiper/css";
import IconHeader from "../../Shared/IconHeader";

const BrowseSubjectsAndTutors = () => {
	return (
		<SectionWrapper className="w-[1000px] mx-auto">
			<IconHeader
				icon={<NotebookOpenedIcon />}
				title={"Browse our subjects and tutors to find the right Fit for You."}
				description={"Meet our top-rated tutors and learn at your own pace."}
				className="w-[calc(100%+160px)] md:ml-[-65px]"
			/>

			{/* Carousel of languages */}
			<LanguagesCarousel />

			{/* Cards of tutors */}
			<TutorCards />
		</SectionWrapper>
	);
};

export default BrowseSubjectsAndTutors;
