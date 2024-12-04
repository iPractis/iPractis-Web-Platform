"use client";

import { extendVariants, Input } from "@nextui-org/react";

const CustomNextUiInput = extendVariants(Input, {
  variants: {
    color: {
      modern: {
        inputWrapper: ["input-wrapper-ipractis"],
        input: ["input-ipractis"],
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
