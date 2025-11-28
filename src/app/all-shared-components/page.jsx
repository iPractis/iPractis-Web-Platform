"use client";
import { useState } from "react";
import WhiteSpaceWrapper from "@/src/components/Shared/WhiteSpaceWrapper";
import SectionHeader from "@/src/components/Shared/SectionHeader";
import ButtonSubmitForm from "@/src/components/Shared/ButtonSubmitForm";
import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import { CustomNextUiCheckbox } from "@/src/components/Shared/CustomNextUiCheckbox";
import IconHeader from "@/src/components/Shared/IconHeader";
import InputBGWrapperIcon from "@/src/components/Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "@/src/components/Shared/InputLeftStickStatus";
import { UserIcon } from "@/src/components/Icons";

export default function SharedComponentsPage() {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <WhiteSpaceWrapper className="p-0">
      <div className="mx-[285px] mt-[64px] space-y-12">
        <h1 className="ST-SB-2 text-primary-color-P1">Shared Components</h1>

        {/* SectionHeader */}
        <div>
          <SectionHeader
            titleIcon={<UserIcon />}
            titleText="SectionHeader"
            descriptionText="Full section header with icon container and styling"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-2">Props: titleText, descriptionText, titleIcon, titleClassName, wrapperSectionHeaderClassName, headerContainerClassName, rightElement, children</p>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<SectionHeader
  titleIcon={<UserIcon />}
  titleText="Section Title"
  descriptionText="Section description"
/>`}
            </pre>
          </div>
        </div>

        {/* IconHeader */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="IconHeader"
            description="Reusable header with icon, title and description for sub-sections"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-2">Props: icon, title, description</p>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<IconHeader
  icon={<UserIcon />}
  title="Section Title"
  description="Section description"
/>`}
            </pre>
          </div>
        </div>

        {/* ButtonSubmitForm */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="ButtonSubmitForm"
            description="Submit button with loading states and spinner animation"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-4">Props: children, buttonClassName, loading, loadingText, showLoadingText, spinnerClassName, disabled, type</p>
            <div className="flex items-center gap-4 mb-4">
              <ButtonSubmitForm loading={isLoading}>
                {isLoading ? "Loading..." : "Submit Button"}
              </ButtonSubmitForm>
              <button
                type="button"
                onClick={() => setIsLoading(!isLoading)}
                className="px-4 py-2 bg-tertiary-color-SC6 text-primary-color-P12 rounded-lg ST-3 hover:bg-tertiary-color-SC7 transition-colors"
              >
                Toggle Loading
              </button>
            </div>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<ButtonSubmitForm loading={isLoading}>
  Submit Form
</ButtonSubmitForm>`}
            </pre>
          </div>
        </div>

        {/* CustomNextUiInput */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="CustomNextUiInput"
            description="Extended NextUI Input component with iPractis styling"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-4">Props: color, removeLabel</p>
            <CustomNextUiInput
              placeholder="Type something..."
              className="mb-4"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<CustomNextUiInput
  placeholder="Enter text"
  label="Input Label"
/>`}
            </pre>
          </div>
        </div>

        {/* CustomNextUiCheckbox */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="CustomNextUiCheckbox"
            description="Custom styled checkbox component"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-4">Props: isSelected, onValueChange, children, classNames</p>
            <div className="mb-4">
              <CustomNextUiCheckbox
                isSelected={checked}
                onValueChange={setChecked}
              >
                Accept terms and conditions
              </CustomNextUiCheckbox>
            </div>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<CustomNextUiCheckbox
  isSelected={checked}
  onValueChange={setChecked}
>
  Accept terms
</CustomNextUiCheckbox>`}
            </pre>
          </div>
        </div>

        {/* InputBGWrapperIcon */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="InputBGWrapperIcon"
            description="Wrapper component for input icons with background styling"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-2">Props: children, className</p>
            <div className="flex items-center gap-2 mb-4">
              <InputBGWrapperIcon>
                <UserIcon />
              </InputBGWrapperIcon>
              <span className="ST-3 text-primary-color-P4">Icon wrapper example</span>
            </div>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<InputBGWrapperIcon>
  <UserIcon />
</InputBGWrapperIcon>`}
            </pre>
          </div>
        </div>

        {/* InputLeftStickStatus */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="InputLeftStickStatus"
            description="Input wrapper with left border status indicator"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-2">Props: children, inputBarStatusClassName, className</p>
            <div className="mb-4">
              <InputLeftStickStatus inputBarStatusClassName="border-green-500">
                <CustomNextUiInput placeholder="Success input" />
              </InputLeftStickStatus>
            </div>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<InputLeftStickStatus inputBarStatusClassName="border-green-500">
  <CustomNextUiInput />
</InputLeftStickStatus>`}
            </pre>
          </div>
        </div>

        {/* WhiteSpaceWrapper */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="WhiteSpaceWrapper"
            description="Wrapper for consistent whitespace and spacing"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <p className="ST-3 text-primary-color-P4 mb-2">Props: children, className</p>
            <pre className="bg-primary-color-P1 p-4 rounded-lg text-primary-color-P12 ST-3 overflow-x-auto">
{`<WhiteSpaceWrapper className="p-4">
  <div>Content here</div>
</WhiteSpaceWrapper>`}
            </pre>
          </div>
        </div>

        {/* Other components listed without demos */}
        <div>
          <IconHeader
            icon={<UserIcon />}
            title="Other Shared Components"
            description="Additional components available in the Shared directory"
          />
          <div className="bg-secondary-color-S11 rounded-[32px] p-6 mt-4">
            <ul className="space-y-2 ST-3 text-primary-color-P4">
              <li>• <strong>CarouselArrow</strong> - Navigation arrow for carousel components</li>
              <li>• <strong>DualAction</strong> - Component with two action buttons or elements</li>
              <li>• <strong>DualButton</strong> - Two-button layout component</li>
              <li>• <strong>DualLink</strong> - Two-link layout component</li>
              <li>• <strong>ErrorMessageiPractis</strong> - Styled error message component</li>
              <li>• <strong>SelectCountryAreaCode</strong> - Country selector with area codes</li>
              <li>• <strong>WorkScheduleTable</strong> - Weekly work schedule table component</li>
              <li>• <strong>AccountPrompt</strong> - Account action prompt component</li>
              <li>• <strong>PlatformButton</strong> - Platform-styled button component</li>
              <li>• <strong>CustomNextUiTextarea</strong> - Extended NextUI Textarea with iPractis styling</li>
              <li>• <strong>MaxFormLengthFields</strong> - Form fields with character limit validation</li>
            </ul>
          </div>
        </div>
      </div>
    </WhiteSpaceWrapper>
  );
}