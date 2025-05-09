import { StudentProfile } from "../../../data/domain/models/StudentProfile";

export type HomeViewProps = {
    profiles: StudentProfile[];
  onProfileSelect: (student: StudentProfile) => void;
};
