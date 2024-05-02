
import CryptoJS from 'crypto-js';

export const encryption = (key, localKey, storeValue) => {
  const encrypted = CryptoJS.AES.encrypt(storeValue, key).toString();
  // Store the encrypted data in local storage
  localStorage.setItem(localKey, encrypted);

  return encrypted;
};

export const decryption = (key, localKey) => {
  const encryptedData = localStorage.getItem(localKey);

  if (encryptedData) {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  return '';
};