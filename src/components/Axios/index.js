import axios from "axios";

const FetchDataAxios = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export default FetchDataAxios;
