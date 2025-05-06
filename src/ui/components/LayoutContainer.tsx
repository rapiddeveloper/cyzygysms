import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

// This is a container component that will be used to wrap the layout of a screen

type LayoutContainerProps = {
} & PropsWithChildren

const LayoutContainer = (props: LayoutContainerProps) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

export default LayoutContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlock: 32,
    paddingInline: 20
   
  }
})