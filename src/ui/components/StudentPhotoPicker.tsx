import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from '@grapp/stacks';
// import { useCarDelTheme } from '../../providers/CarDelThemeProvider';
// import { colors } from '../../constants/InventoryConstants/colors';
// import { YStack } from "../layout/stacks";
// import PencilIcon from '../../../assets/icons/PencilIcon';

type StudentPhotoPickerProps = {
  onImageLoaded: (asset: ImagePicker.ImagePickerAsset) => void;
  currUri: string | null;
};

export default function StudentPhotoPicker(props: StudentPhotoPickerProps) {
  const [image, setImage] = useState<string | null>(null);
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0])
      setImage(result.assets[0].uri);
      props.onImageLoaded(result.assets[0]);
    }
  };

  useEffect(() => {
    setImage(props.currUri);
  }, [props.currUri]);

  console.log("In editing")
  console.log(image)
  return (
    <Pressable style={styles.container} onPress={pickImage}>
      {image ? (
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { backgroundColor: "green" }]}
          />
          <View style={[styles.editLabel]}>
            {/* <PencilIcon color={colors.primary}/> */}
          </View>
        </View>
      ) : (
        <Stack
          align={"center"}
          style={[
            styles.image,
            { width: "30%", aspectRatio: 1, backgroundColor: "gray", justifyContent: "center", alignItems: "center" },
          ]}
          gap={0}
        >
          <Text>Add Photo</Text>
        </Stack>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  editLabel: {
    width: 35,
    aspectRatio: 1,
    backgroundColor: "white",
    position: "absolute",
    bottom: 16,
    right: 16,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    fontFamily: "Metropolis-Medium",
   
  }
});
