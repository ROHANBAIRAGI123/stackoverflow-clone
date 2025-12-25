const env = {
    appwrite: {
        apiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY) || '',
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) || '',
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) || '',
    },
};
  
export default env;