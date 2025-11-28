"use client";

import { extendVariants, Input } from "@nextui-org/react";

const CustomNextUiInput = extendVariants(Input, {
  variants: {
    color: {
      modern: {
        clearButton: "!opacity-100 p-0 rounded-[10px]",
        inputWrapper: ["input-wrapper-ipractis"],
        input: ["input-ipractis"],
        label: ["input-label-ipractis"],
      },
    },
    // Background color variant - allows switching input wrapper background
    bgColor: {
      secondary: {
        inputWrapper: ["!bg-secondary-color-S11"],
      },
      primary: {
        inputWrapper: ["!bg-primary-color-P11"],
      },
      white: {
        inputWrapper: ["!bg-primary-color-P12"],
      },
    },
  },
  defaultVariants: {
    color: "modern",
    removeLabel: true,
    bgColor: "secondary",
  },
});

export default CustomNextUiInput;
