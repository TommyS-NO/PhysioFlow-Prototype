interface ApiResponse<T> {
  message: string;
  data?: T;
}

interface User {
  username: string;
  password: string;
  email?: string;
  gender?: 'male' | 'female' | 'unspecified';
  height?: number;
  weight?: number;
  birthday?: string; 
}

const BASE_URL = 'http://192.168.10.182:3000';

const apiService = {
  login: async (username: string, password: string): Promise<ApiResponse<{ token: string }>> => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        return { message: 'Suksess', data: data };
      }
        return { message: data.message };
    } catch (error) {
      console.error('Login Error:', error);
      return { message: 'Noe gikk galt med innloggingen.' };
    }
  },
//POST
  register: async (user: User): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return { message: data.message };
    } catch (error) {
      console.error('Registration Error:', error);
      return { message: 'Noe gikk galt under registreringen.' };
    }
  },
//PUT/PATCH
  updateUser: async (userId: string, userUpdates: Partial<User>): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userUpdates),
      });
      const data = await response.json();
      return { message: data.message };
    } catch (error) {
      console.error('Update User Error:', error);
      return { message: 'Noe gikk galt under oppdateringen av brukeren.' };
    }
  },
//DELETE
  deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return { message: data.message };
    } catch (error) {
      console.error('Delete User Error:', error);
      return { message: 'Noe gikk galt under slettingen av brukeren.' };
    }
  },

//GET
  getUser: async (userId: string): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        return { message: 'Suksess', data: data };
      }
        return { message: data.message };
    } catch (error) {
      console.error('Get User Error:', error);
      return { message: 'Noe gikk galt under henting av brukerinformasjon.' };
    }
  },
};

export { apiService };
