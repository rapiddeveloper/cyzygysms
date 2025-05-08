import { Student } from "../../../data/domain/models/Student";

export type HomeViewProps = {      
  onProfileSelect: (student: Student) => void;
}