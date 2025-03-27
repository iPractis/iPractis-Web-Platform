import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import DeviceItem from "./DeviceItem";

// Icons
import { DownloadMediumIcon, CalendarIcon } from "../../Icons";

const Devices = () => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName={
          "flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
        }
        descriptionText={
          "View a detailed history of recent account activities."
        }
        titleIcon={<CalendarIcon fillColor={"fill-primary-color-P1"} />}
        headerContainerClassName="flex-[40%]"
        descriptionClassName={"mt-[4px]"}
        titleText={"Activity Log"}
        titleClassName="MT-SB-1"
      >
        <div className="flex-1">
          <button
            className={`btn bg-primary-color-P12 flex w-full gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
            type="button"
          >
            <span className="MT-1 px-1.5">Download</span>{" "}
            <InputBGWrapperIcon className={"bg-primary-color-P1"}>
              <DownloadMediumIcon fillColor={"fill-primary-color-P12"} />
            </InputBGWrapperIcon>
          </button>
        </div>
      </SectionHeader>

      <section className="space-y-2.5">
        {/* Current device */}
        <div className="px-4">
          <h2 className="MT-SB-1 text-primary-color-P1">Current device</h2>
        </div>

        <DeviceItem
          location={"Algiers, Algiers, Algeria"}
          searchEngine={"Google Chrome"}
          operatingSystem={"Windows"}
        />

        {/* Other devices */}
        <div className="px-4">
          <h2 className="MT-SB-1 text-primary-color-P1 mt-8">Other devices</h2>
        </div>

        <DeviceItem
          location={"Puerto Montt, Chile"}
          searchEngine={"Opera GX"}
          operatingSystem={"Windows"}
        />

        <DeviceItem
          location={"El Progreso Yoro, Honduras"}
          searchEngine={"Microsoft Edge"}
          operatingSystem={"Linux"}
        />

        <DeviceItem
          location={"London, United Kingdom"}
          searchEngine={"Safari"}
          operatingSystem={"MacOS"}
        />
      </section>
    </div>
  );
};

export default Devices;
