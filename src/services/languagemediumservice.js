import axios from "../api/axios";

const LanguageMedium_API = "list_language_mediums";

export const fetchLanguageMedium = async () => {
  return await axios.get(`/user/${LanguageMedium_API}`);
};
