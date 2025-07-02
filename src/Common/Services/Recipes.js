const axios = window.axios;
const url =
  "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

export const createRecipe = (id, firstName, lastName, email, password) => {
  return axios({
    method: "post",
    url: `${url}/recipes`,
    data: {
      id,
      firstName,
      lastName,
      email,
      password,
    },
    headers: {
      "Content-Type": "application/json",
    },
    json: true,
  })
    .then((response) => {
      console.log("POST response: ", response);
    })
    .catch((err) => {
      console.log("POST error: ", err);
    });
};

//function to extract the recipes
export const getAllRecipes = () => {
  return (
    axios
      // .get(`${url}/recipes`)
      .get("./Services/recipes.json")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log("GET Error: ", err);
      })
  );
};
