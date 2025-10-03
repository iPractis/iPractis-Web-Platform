import { calculateAge } from "../lib/utils/calculateAge";

// External imports
import moment from "moment";
import { z } from "zod";


const fileMetaSchema = z.object({
  name: z.string(),
  path: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number(),
  uploaded_at: z.string(),
});

export const tabProfileSchema = z.object({
   uploadProfileImage: z.union([
        z.instanceof(File).optional(),   // allow raw File
        
          ]),
          profile_url: z.string().url().optional(),

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
    ),
  gender: z.enum(["male", "female"], {
    message: "Invalid field --- Must choose a gender.",
  }),
  country: z
    .string()
    .min(1, { message: "Invalid field --- Input a flag of a country please." }),
  nationality: z.string().min(1, {
    message: "Invalid field --- Input a flag of nationality please.",
  }),
  languages: z
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
      return moment(date, "YYYY/MM/D", true).isValid();
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
    )
    .refine(
      (date) => {
        const age = calculateAge(date);
        return age <= 80;
      },
      {
        message:
          "Age Exceeds Limit --- The entered birth date exceeds the allowed age limit. Please verify and enter a valid date.",
      }
    ),
});

export const tabSubjectSchema = z.object({
  subject: z.string().min(1, {
    message: "Invalid field --- You must select a subject.",
  }),
  profileTitle: z
    .string()
    .trim()
    .min(3, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message:
        "Special characters are not allowed. --- Special characters are not permitted in this field.",
    }),
  subjectIntroduction: z
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
    ),
  subSubject: z
    .array(
      z.object({
        selected: z.string(),
        description: z.string().min(3, {
          message: "Invalid field --- Must contain 3 or more characters long.",
        }),
      })
    )
    .min(1, {
      message: "Invalid field --- At least one sub-subject is required.",
    }),
  videoLink: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/|playlist\?list=)|youtu\.be\/)[a-zA-Z0-9_-]{11,}(&\S*)?$/,
      {
        message:
          "Invalid link --- Please ensure the link provided is a valid Youtube URL.",
      }
    ),
  studentLevel: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Invalid submission --- Must choose a level you can teach.",
  }),
  teachToYoungPersons: z.literal(true, {
    errorMap: () => ({
      message: "Invalid submission --- You have to accept this term.",
    }),
  }),
  teachToAmateurPersons: z.literal(true, {
    errorMap: () => ({
      message: "Invalid submission --- You have to accept this term.",
    }),
  }),
  hourlyPrice: z.coerce
    .number({
      invalid_type_error:
        "Invalid characters --- Only numbers are allowed in this field.",
    })
    .int()
    .min(8, {
      message:
        "Lesson rate too low --- Lesson rate must be between 8 and 60 USD.",
    })
    .max(60, {
      message:
        "Lesson rate too high --- Lesson rate must be between 8 and 60 USD.",
    }),
});



export const tabBackgroundSchema = z.object({
  careerExperience: z.array(
    z.object({
      company: z.string().min(1, {
        message: "Invalid field --- Must contain 3 or more characters long.",
      }),
      uploadFile: z.union([
        z.instanceof(File),   // allow raw File
        fileMetaSchema        // allow uploaded file metadata
      ]),
      from: z.coerce.number().int().min(1),
      to: z.coerce.number().int().min(1),
      description: z.string().min(3),
    })
    .refine((data) => data.to >= data.from, {
      message: "Invalid field --- 'To' must be greater than or equal to 'From'.",
      path: ["to"],
    })
  ).min(1, { message: "At least one experience is required." }),

  education: z.array(
    z.object({
      company: z.string().min(1, {
        message: "Invalid field --- Must contain 3 or more characters long.",
      }),
      uploadFile: z.union([
        z.instanceof(File),
        fileMetaSchema
      ]),
      from: z.coerce.number().int().min(1),
      to: z.coerce.number().int().min(1),
      description: z.string().min(3),
    })
    .refine((data) => data.to >= data.from, {
      message: "Invalid field --- 'To' must be greater than or equal to 'From'.",
      path: ["to"],
    })
  ).min(1, { message: "At least one education is required." }),
});

export const tabAvailabilitySchema = z.object({
  timeZone: z.string().trim().min(1, {
    message: "Invalid timezone --- Please provide a timezone from select.",
  }),
  dailyWorkTime: z.coerce.number().min(8, {
    message:
      "Working time don't meet requirement --- Minimum working time is set to 8 hours per week.",
  }),
  workSchedule: z.array(
    z.object({
      day: z.string(),
      hour: z.array(z.string()),
    })
  ),
});
