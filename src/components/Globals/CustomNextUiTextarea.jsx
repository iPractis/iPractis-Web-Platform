"use client";

import { extendVariants, Textarea } from "@nextui-org/react";

const CustomNextUiTextarea = extendVariants(Textarea, {
  variants: {
    color: {
      modern: {
        inputWrapper: [
          "bg-primary-color-P11",
          "rounded-2xl",
          "p-2.5 pe-1.5",
          "data-[hover=true]:bg-secondary-color-S9",
        ],
        input: [
          "placeholder:text-primary-color-P4",
          "text-primary-color-P4",
        ],
      },
    },
    size: {
      md: {
        inputWrapper: "h-55 min-h-full",
        input: "ST-3",
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
    color: "modern",
    removeLabel: true,
  },
});

export default CustomNextUiTextarea;
