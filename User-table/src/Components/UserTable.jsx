import React, { useState, useEffect } from 'react';
import { Loader2, Zap, Mail, Globe } from 'lucide-react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';


const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to load user data. Please check your network connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

   
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
                    <p className="text-lg text-gray-700 dark:text-gray-300">Fetching user directory...</p>
                </div>
            </div>
        );
    }

  
    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-4">
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
                    <Zap className="w-5 h-5 mr-3" />
                    <span className="font-bold">API Error!</span> {error}
                </div>
            </div>
        );
    }

   
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 mt-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-2">
                User Directory (via JSONPlaceholder)
            </h1>

   
            <div className="overflow-x-auto shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                   
                    <thead className="bg-indigo-600 dark:bg-indigo-700 text-white">
                        <tr>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider rounded-tl-lg">ID</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">City</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider rounded-tr-lg">Website</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                        {users.map((user) => (
                            <tr 
                                key={user.id} 
                                className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-150"
                            >
                                <td className="font-medium text-gray-900 dark:text-white p-4 whitespace-nowrap">
                                    {user.id}
                                </td>
                                <td className="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{user.name}</td>
                                <td className="p-4 whitespace-nowrap font-mono text-sm text-indigo-600 dark:text-indigo-400">
                                    @{user.username}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline flex items-center">
                                        <Mail className="w-4 h-4 mr-1 text-blue-500" /> {user.email}
                                    </a>
                                </td>
                                <td className="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{user.address.city}</td>
                                <td className="p-4 whitespace-nowrap">
                                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline flex items-center">
                                        <Globe className="w-4 h-4 mr-1 text-teal-500" /> {user.website}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;