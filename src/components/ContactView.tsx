import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { db } from "../firebase/dbConfig";

interface User {
    firstName: string;
    lastName: string;
    status: string;
}

const ContactView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [status, setStatus] = useState<string>('active');

    useEffect(() => {
        getUserData(id!);
    }, [id]);

    async function updateUserData(e: React.FormEvent<HTMLFormElement>, userId: string) {
        e.preventDefault();
        const updatedData = { firstName: firstName.trim().toLowerCase(), lastName: lastName.trim().toLowerCase(), status: status.trim().toLowerCase() };
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, updatedData);
        console.log("User data updated successfully");
    }

    async function getUserData(id: string) {
        const userRef = doc(db, "users", id);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as User;
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setStatus(userData.status);
            console.log("Document data:", userData);
        } else {
            console.log("No such document!");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={(e) => updateUserData(e, id!)} className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Contact</h2>
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter firstname"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter lastname"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                        Status
                    </label>
                    <div className="flex items-center">
                        <div className="flex items-center mr-4">
                            <input
                                type="radio"
                                id="active"
                                name="status"
                                value="active"
                                checked={status === 'active'}
                                onChange={() => setStatus('active')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                required
                            />
                            <label htmlFor="active" className="block ml-2 text-sm font-medium text-gray-700">
                                Active
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="inactive"
                                name="status"
                                value="inactive"
                                checked={status === 'inactive'}
                                onChange={() => setStatus('inactive')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                required
                            />
                            <label htmlFor="inactive" className="block ml-2 text-sm font-medium text-gray-700">
                                Inactive
                            </label>
                        </div>
                    </div>
                </div>
                <button type='submit' className="w-full py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ContactView;
