import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type MainTabViewParamList = {
    Home: undefined
    AddStudent: {
        studentId?: string
    }
    Settings: undefined
}

export type MainTabViewScreenProps<T extends keyof MainTabViewParamList> = BottomTabScreenProps<MainTabViewParamList, T>