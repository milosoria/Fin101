import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.ui.border,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    color: colors.text.primary,
    fontSize: 16,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: colors.background.secondary,
  },
  typeButtonActive: {
    borderWidth: 1,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
    margin: 4,
    backgroundColor: colors.background.secondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: colors.background.secondary,
  },
  submitButton: {
    backgroundColor: colors.transaction.ingress,
  },
}); 