// MyButton.tsx
import { extendVariants, Checkbox } from "@nextui-org/react";

export const CustomNextUiCheckbox = extendVariants(Checkbox, {
  variants: {
    color: {
      modern: {
        label: "border-2 border-primary-color-P1",
      },
    },
    size: {
      md: "min-w-12 h-[10px] w-[10px]",
    },
  },
  defaultVariants: {
    color: "modern",
    size: "md",
  },
});
