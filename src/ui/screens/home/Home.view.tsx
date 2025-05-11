/**
 * Abstract: The view that displays the home screen
 */
import React  from "react"; 
import { HomeViewProps } from "./Home.types";
import { StudentList } from "../../components/StudentList";

export const HomeView = (props: HomeViewProps) => {
  if (props.profiles.length === 0) {
    return null;
  }

  return (
    <StudentList
      profiles={props.profiles}
      onProfileSelect={props.onProfileSelect}
    />
     
  );
};

 
