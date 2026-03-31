import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async (item : string) => {
    await Clipboard.setStringAsync(item);
};
