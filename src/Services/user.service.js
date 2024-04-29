import axios from 'axios';
import { ApiUrls } from "../ApiUrls/apiUrls";

/**
 * 
 * @method POST
 * @param {Object} data 
 * @returns {Promise<{status: boolean, error: *}|{status: boolean, body: *}>}
 * @comment Create the user.
 */
export const registerUser = async (data) => {
    try {
        const result = await axios.post(ApiUrls.REGISTER, data);
        console.log(result, "12")
        return {
            status: true,
            data: result?.data?.data
        }
    } catch (error) {
        return {
            status: false,
            error: error?.response?.data?.message

        }
    }
}

/**
 * 
 * @method POST
 * @param {Object} data 
 * @returns {Promise<{status: boolean, error: *}|{status: boolean, body: *}>}
 * @comment Create the user.
 */
export const loginUser = async (data) => {
    try {
        const result = await axios.post(ApiUrls.LOGIN, data);
        console.log(result, "12")
        return {
            status: true,
            data: result?.data?.data
        }
    } catch (error) {
        return {
            status: false,
            error: error?.response?.data?.message

        }
    }
}


/**
 * 
 * @method GET
 * @returns {Promise<{status: boolean, error: *}|{status: boolean, body: *}>}
 * @comment Create the user.
 */
export const getUser = async () => {
    try {
        const result = await axios.get(ApiUrls.REGISTER);
        return {
            status: true,
            data: result?.data?.data
        }
    } catch (error) {
        return {
            status: false,
            error: error?.response?.data?.message

        }
    }
}