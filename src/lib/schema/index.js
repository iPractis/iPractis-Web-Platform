import { z } from "zod";

export const tabProfileSchema = z.object({
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
    .trim()
    .min(3, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    }),
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
        message: "Invalid link --- Please ensure the link provided is a valid Youtube URL.",
      }
    ),
});
