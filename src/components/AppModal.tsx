import {Modal, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

interface IAppModalProps {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  onResetValues?: () => void;
  children: React.ReactNode;
}
const AppModal = ({
  modalVisible,
  setModalVisible,
  onResetValues,
  children,
}: IAppModalProps) => {
  const closeModal = () => {

    setModalVisible(false);
  };

  return (
    <Modal transparent animationType="fade" visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Pressable onPress={closeModal} style={styles.modalDismissButton}>
            <Icon name="close-circle" size={30} color={'#eee'} />
          </Pressable>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    padding: 16,
  },
  modalDismissButton: {
    marginLeft: 'auto',
  },
});
