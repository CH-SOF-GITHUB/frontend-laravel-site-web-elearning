import axios from '../api/axios'

const CATEGORIE_API = 'categories'

export const fetchCategories = async () => {
  return await axios.get(CATEGORIE_API)
}

export const fetchCategorieById = async (id) => {
  return await axios.get(`${CATEGORIE_API}/${id}`)
}
