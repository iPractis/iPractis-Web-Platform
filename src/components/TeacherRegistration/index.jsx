import { fetchDraft } from "@/src/lib/data";
import { TabBody } from "./TabBody";

export const TeacherRegistration = async () => {
  const draft = await fetchDraft();
  console.log("DRAFT FROM SUPABASE:", draft);
  console.log("DRAFT AVAILABILITY FROM SUPABASE:", draft?.availability);

  return <TabBody draftData={draft} />;
};
