import React from 'react';
import { View, Pressable, Text, Modal, TextInput } from 'react-native';
import modalStyles from './styles';

const EditModal = ({ editingText, setEditingText, editTxtPlaceholder, saveBtnText }) => {
    return (
      <View style={modalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={(editingText != null)}
          onRequestClose={() => {
            setEditingText(null);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <TextInput
                style={modalStyles.inputBox}
                placeholder={editTxtPlaceholder}
                onChangeText={setEditingText}
                value={editingText}
                textAlign={'left'}
              />
  
              <View style={modalStyles.buttonCentered}>
                <Pressable
                  style={[modalStyles.button, modalStyles.buttonClose]}
                  onPress={() => {
                    setEditingText(null);
                  }}
                >
                  <Text style={modalStyles.textStyle}>Cancel</Text>
                </Pressable>
  
                <Pressable
                  style={[modalStyles.button, modalStyles.buttonOpen]}
                  onPress={() => {
                    setEditingText(editingText, true);
                  }}
                >
                  <Text style={modalStyles.textStyle}>
                    {saveBtnText}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

export default EditModal;