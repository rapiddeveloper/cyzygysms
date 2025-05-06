import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Student } from '../../data/domain/models/Student'
import { Stack } from '@grapp/stacks'

/**
 * 
 * @returns {JSX.Element}
 * @description This component is used to display a list item for a student.
 * @param {StudentProps} student - The student data to display.
 */

type StudentProps = {
  student: Student
}

const StudentListItem = (props: StudentProps) => {

    const { student } = props

  return (
    <Stack horizontal>
      <Text>{student.fullname}</Text>
    </Stack>
  )
}

export default StudentListItem

const styles = StyleSheet.create({})