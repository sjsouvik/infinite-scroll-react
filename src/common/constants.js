export const baseUrl = "https://youtube.googleapis.com/youtube/v3";
export const apiKey = process.env.API_KEY || "";
export const maxResults = 20;

export const searchApi = `${baseUrl}/search?part=snippet&maxResults=${maxResults}&key=${apiKey}`;
