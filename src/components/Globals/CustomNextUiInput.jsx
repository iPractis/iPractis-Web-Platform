"use client";

import { extendVariants, Input } from "@nextui-org/react";

const CustomNextUiInput = extendVariants(Input, {
  variants: {
    color: {
      modern: {
        inputWrapper: ["input-wrapper-ipractis"],
        input: ["input-ipractis"],
        label: ["input-label-ipractis"],
      },
    },
  },
  defaultVariants: {
    color: "modern",
    removeLabel: true,
  },
});

export default CustomNextUiInput;
