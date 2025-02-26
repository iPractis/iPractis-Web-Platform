import ButtonSubmitForm from "../Shared/ButtonSubmitForm";

// React imports
import { redirect } from "next/navigation";

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

const TabsButtonsBottomNav = ({ buttonRef, setActiveTab, activeTab }) => {
  return (
    activeTab < 4 && (
      <div className={"flex items-center gap-4 mt-16 md:px-8"}>
        <div className="flex-1">
          <button
            className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4 flex justify-center items-center"
            onClick={() =>
              setActiveTab((prev) =>
                prev < 1 ? redirect("/apply-as-teacher") : prev - 1
              )
            }
          >
            <span className="flex-0">
              <ChevronLeftIcon fillColor={"fill-primary-color-P12"} />
            </span>

            <span className="flex-1">Back</span>
          </button>
        </div>

        <div className="flex-1">
          <ButtonSubmitForm
            buttonClassName={
              "btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4 flex items-center justify-center"
            }
            ref={buttonRef}
          >
            <div className="flex-1">
              <span className="md:hidden block">Continue</span>

              <span className="md:block hidden">Save, and continue</span>
            </div>

            <div className="flex-0">
              <ChevronRightIcon fillColor={"fill-primary-color-P12"} />
            </div>
          </ButtonSubmitForm>
        </div>
      </div>
    )
  );
};

export default TabsButtonsBottomNav;
