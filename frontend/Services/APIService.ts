// export interface ApiResponse<T> {
//   message: string;
//   data?: T;
// }

// interface User {
//   username: string;
//   email: string;
//   password: string;
//   gender?: 'male' | 'female' | 'unspecified';
//   height?: number;
//   weight?: number;
//   birthday?: string; 
// }

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const apiService = {
//   login: async (email: string, password: string): Promise<ApiResponse<{ token: string }>> => {
//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         return { message: 'Suksess', data };
//       }
//       return { message: data.message };
//     } catch (error) {
//       console.error('Login Error:', error);
//       return { message: 'Noe gikk galt med innloggingen.' };
//     }
//   },

  

//   register: async (user: User): Promise<ApiResponse<{ userId: string }>> => {
//     try {
//       const response = await fetch(`${BASE_URL}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         return { message: 'Bruker registrert og data lagret i Firestore', data };
//       }
//       return { message: data.message };
//     } catch (error) {
//       console.error('Registration Error:', error);
//       return { message: 'Noe gikk galt under registreringen.' };
//     }
//   },

//   updateUser: async (userId: string, userUpdates: Partial<User>): Promise<ApiResponse<null>> => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userUpdates),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         return { message: 'Brukeren ble oppdatert.', data: null };
//       }
//       return { message: data.message, data: null };
//     } catch (error) {
//       console.error('Update User Error:', error);
//       return { message: 'Noe gikk galt under oppdateringen av brukeren.', data: null };
//     }
//   },

//   deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/${userId}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         return { message: 'Brukeren ble slettet.', data: null };
//       }
//       return { message: data.message, data: null };
//     } catch (error) {
//       console.error('Delete User Error:', error);
//       return { message: 'Noe gikk galt under slettingen av brukeren.', data: null };
//     }
//   },

//   getUser: async (userId: string): Promise<ApiResponse<User>> => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/${userId}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         return { message: 'Suksess', data };
//       }
//       return { message: data.message, data: undefined };
//     } catch (error) {
//       console.error('Get User Error:', error);
//       return { message: 'Noe gikk galt under henting av brukerinformasjon.', data: undefined };
//     }
//   },
// };

// export { apiService };
