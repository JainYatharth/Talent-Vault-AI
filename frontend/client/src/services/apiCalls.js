// import axios from 'axios'

// //const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = 'http://localhost:8080';

// export const loginApiCall = async(data) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/auth/login`, data)
//         // console.log(response);
//         return response.data
//         // console.log(response.data)
//     }catch(error)
//     {
//         console.error("Login failed:", error.response?.data || error.message);
//         throw error;
//     }
// };

// export const signupApiCall = async(data) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/auth/signup`, data)
//         return response.data
//         //console.log(response);
//     }catch(error)
//     {
//         console.error("Login failed: ", error.response?.data || error.message);
//         throw error;
//     }
// };

// export const parseResumeCall = async (file) => {
// 	try {
// 		const formData = new FormData();
// 		formData.append('file', file);

// 		const response = await axios.post(`${BASE_URL}/resume/parse`, formData, {
// 			headers: {
// 				'Content-Type': 'multipart/form-data',
// 			}
// 		});
// 		return response.data;
// 	} catch (error) {
// 		console.error("Parsing Failed:", error.message);
// 		throw error;
// 	}
// };


// export const uploadResumeCall = async(data, token) => {
//     try
//     {   
//         const response = await axios.post(`${BASE_URL}/resume/upload`,data,{
//             headers: { 
//                 'Content-Type': 'multipart/form-data',
//                 'Authorization': `Bearer ${token}`
//             },
//         });
//         return response.data;


//     }catch(error)
//     {
//         console.error("Upload Failed: ", error.message)
//         throw error
//     }
// }

// export const searchResumes = async(params) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${BASE_URL}/resume/search`, { 
//             params,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch(error) {
//         console.error("Search Failed:", error.message);
//         throw error;
//     }
// }

// export const downloadResume = async (id) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${BASE_URL}/resume/download/${id}`, {
//             responseType: 'blob',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Download Failed:", error.message);
//         throw error;
//     }
// }

// export const downloadAllResumes = async (params) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${BASE_URL}/resume/download-all`, {
//             responseType: 'blob',
//             params: params, // Send search parameters to get filtered resumes
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         // Create a blob URL and trigger download
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'all-resumes.zip');
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//         window.URL.revokeObjectURL(url);
//         return { success: true };
//     } catch (error) {
//         console.error("Failed to download resumes:", error.message);
//         throw error;
//     }
// }

// export const getStats = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${BASE_URL}/stats`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch stats:", error.message);
//         throw error;
//     }
// }

import axios from 'axios';

// Base URL not needed — we'll use relative paths
// const BASE_URL = 'http://localhost:8080';

export const loginApiCall = async(data) => {
    try {
        const response = await axios.post(`/auth/login`, data);
        return response.data;
    } catch(error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

export const signupApiCall = async(data) => {
    try {
        const response = await axios.post(`/auth/signup`, data);
        return response.data;
    } catch(error) {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error;
    }
};

export const parseResumeCall = async (file) => {
    try {
        const token = localStorage.getItem('token'); // get token from storage
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`/resume/parse`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Parsing Failed:", error.message);
        throw error;
    }
};


export const uploadResumeCall = async(data, token) => {
    try {
        const response = await axios.post(`/resume/upload`, data, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch(error) {
        console.error("Upload Failed:", error.message);
        throw error;
    }
};

export const searchResumes = async(params) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/resume/search`, { 
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch(error) {
        console.error("Search Failed:", error.message);
        throw error;
    }
};

export const downloadResume = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/resume/download/${id}`, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Download Failed:", error.message);
        throw error;
    }
};

export const downloadAllResumes = async (params) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/resume/download-all`, {
            responseType: 'blob',
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'all-resumes.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        return { success: true };
    } catch (error) {
        console.error("Failed to download resumes:", error.message);
        throw error;
    }
};

export const getStats = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch stats:", error.message);
        throw error;
    }
};
