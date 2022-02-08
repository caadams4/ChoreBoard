
export const LOCAL_STORAGE_UID = "";

export function getLocalStorageUID(){
    const uid = localStorage.getItem(LOCAL_STORAGE_UID);
    if (uid === null) {
        return "";
    } else {
        return uid;
    }
  }