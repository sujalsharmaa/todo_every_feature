import React from "react";
import { useGetTodo } from "../services/queries";
import { useNavigate } from "react-router-dom";

function Table() {
    // Use the custom hook to fetch todo data
    const { data, isLoading, isError } = useGetTodo();

    // Create a navigate function using useNavigate
    const navigate = useNavigate();

    // Render loading and error states
    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error loading todos. Please try again later.</div>;
    }

    // Render the table with todo data
    return (
        <>
            <div className="flex justify-center">
                <table className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Todo</th>
                            <th className="py-2 px-4 text-left">Is Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((todo) => (
                            <tr key={todo.id} className="border-b border-gray-200">
                                <td className="py-2 px-4">{todo.id}</td>
                                <td className="py-2 px-4">{todo.todo}</td>
                                <td className="py-2 px-4">{todo.isCompleted ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Todo button */}
            <center>
                <button
                    className="bg-blue-500 rounded-xl p-2 text-white font-semibold m-5"
                    onClick={() => navigate("/uploadFile")}
                >
                    Add File
                </button>
                <button
                    className="bg-violet-500 rounded-xl p-2 text-white font-semibold m-5"
                    onClick={() => navigate("/uploadFiles")}
                >
                    Add Files
                </button>
            </center>
        </>
    );
}

export default Table;
