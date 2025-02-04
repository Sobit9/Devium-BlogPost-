import axios from "axios"

export const fetchPosts = async (
    {
        page = 1,
        perPage = 10,
        sortBy = "CreatedAt",
        q,
        
    }
) => {
        return axios.get('http://localhost:3000/posts', {
            params: {
                page,
                perPage,
                sortBy,
                q,
            }
        })

        
    }