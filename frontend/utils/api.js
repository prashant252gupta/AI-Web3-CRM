const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
