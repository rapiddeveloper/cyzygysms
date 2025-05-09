import { StudentProfile } from "../../../data/domain/models/StudentProfile";

export type HomeViewProps = {
  onProfileSelect: (student: StudentProfile) => void;
};
