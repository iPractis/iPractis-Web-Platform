import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import DeviceItem from "./DeviceItem";

// Icons
import { ChevronRightDoorBiggestIcon, EyeBiggerIcon, EyeIcon, MonitorMediumIcon } from "../../Icons";

const Devices = () => {
  return (
    <div>
      <SectionHeader
        titleIcon={<EyeIcon fillcolor={"fill-primary-color-P1"} />}
        titleText={"Logged devices management center"}
        descriptionText={"Review and manage devices connected to your account"}
      />

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
