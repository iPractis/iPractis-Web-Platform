import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import DeviceItem from "./DeviceItem";

// Icons
import { ChevronRightDoorBiggestIcon, MonitorMediumIcon } from "../../Icons";

const Devices = () => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName={
          "flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
        }
        descriptionText={"Review and manage devices connected to your account"}
        titleIcon={<MonitorMediumIcon fillcolor={"fill-primary-color-P1"} />}
        headerContainerClassName="flex-[40%]"
        descriptionClassName={"mt-[4px]"}
        titleText={"Devices"}
        titleClassName="MT-SB-1"
      >
        <div className="flex-1">
          <button
            className={`btn btn-quinary flex w-full gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
            type="button"
          >
            <span className="ST-3 px-1.5">Log out from everywhere</span>{" "}
            <InputBGWrapperIcon>
              <ChevronRightDoorBiggestIcon
                fillcolor={"fill-primary-color-P1"}
              />
            </InputBGWrapperIcon>
          </button>
        </div>
      </SectionHeader>

      <section className="space-y-2.5 lg:px-8">
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
