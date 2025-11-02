import { fetchDraft } from "@/src/lib/data";
import { TabBody } from "./TabBody";

export const TeacherRegistration = async () => {
  const draft = await fetchDraft();
  return <TabBody draftData={draft} />;
};
