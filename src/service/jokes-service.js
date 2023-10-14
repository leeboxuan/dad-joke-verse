import axios from "axios";

export async function getJokes() {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=dark");
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error("Error fetching jokes:", error);
    throw error; // Re-throw the error to handle it in your component
  }
}

