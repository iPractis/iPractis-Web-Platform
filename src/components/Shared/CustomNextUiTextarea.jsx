"use client";

import { extendVariants, Textarea } from "@nextui-org/react";

const CustomNextUiTextarea = extendVariants(Textarea, {
  variants: {
    color: {
      modern: {
        inputWrapper: ["textarea-wrapper"],
        input: ["textarea-ipractis"],
      },
    },
  },
  defaultVariants: {
    color: "modern",
    removeLabel: true,
  },
});

export default CustomNextUiTextarea;
