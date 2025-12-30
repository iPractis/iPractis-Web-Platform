import { calculateAge } from "../lib/utils/calculateAge";

// External imports
import dayjs from "dayjs";
import { z } from "zod";

export const tabProfileSchema = z.object({
  profile_url: z.string().url().optional().or(z.literal("")),

  firstName: z
    .string()
    .trim()
    .min(3, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    }),
  middleName: z
    .string()
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    })
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(3, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    }),
  introduction: z
    .string()
    .trim()
    .min(3, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(
      /^(?!.*\b\d{7,15}\b)(?!.*\b[A-Za-z0-9._%+-]+@gmail\.com\b)(?!.*\+\d{1,4}[\s-]?\d{4,}\b)[\s\S]+$/,
      {
        message:
          "Don't share your contact ID --- Your introduction cannot include personal contact details, such as phone numbers, email addresses, or social media IDs, to ensure platform security and privacy compliance.",
      }
    )
    .optional()
    .or(z.literal("")),
  gender: z.enum(["male", "female"], {
    message: "Invalid field --- Must choose a gender.",
  }),
  country: z
    .string()
    .min(1, { message: "Invalid field --- Input a flag of a country please." }),
  nationality: z.string().min(1, {
    message: "Invalid field --- Input a flag of nationality please.",
  }),
  language: z
    .array(
      z.object({
        name: z.string(),
        level: z
          .string()
          .min(1, { message: "Invalid field --- Level is required." }),
      })
    )
    .min(1, { message: "Invalid field --- At least one language is required." })
    .max(6, {
      message:
        "Language Limit Reached --- You can only select up to 6 mastered languages.",
    }),
  birthDate: z
    .string()
    .min(1, { message: "Invalid date --- Must provide a birth date." })
    .refine((date) => {
      return dayjs(date, "YYYY/MM/D", true).isValid();
    })
    .refine(
      (date) => {
        const age = calculateAge(date);
        return age >= 18;
      },
      {
        message:
          "Age Requirement Not Met --- You must meet the minimum age requirement to proceed. Please ensure your birth date is accurate.",
      }
    ),
  showProfilePublicly: z.boolean().default(true),
  showAchievements: z.boolean().default(true),
});
