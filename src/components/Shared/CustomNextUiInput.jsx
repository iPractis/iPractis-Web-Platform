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
  },
  defaultVariants: {
    color: "modern",
    removeLabel: true,
  },
});

export default CustomNextUiInput;
