"use client";

import { extendVariants, Input } from "@nextui-org/react";

const CustomNextUiInput = extendVariants(Input, {
  variants: {
    color: {
      modern: {
        inputWrapper: [
          "bg-primary-color-P11",
          "rounded-2xl",
          "h-auto",
          "p-1.5",
          "data-[hover=true]:bg-secondary-color-S9",
        ],
        input: [
          "placeholder:text-primary-color-P4",
          "text-primary-color-P4",
          "ST-3",
          "pis-4",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-6 min-h-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-10 min-h-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-14 min-h-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
    removeLabel: true,
  },
});

export default CustomNextUiInput;
