import { fetchActivityLogs } from "@/lib/actions/admin/auth.action";
import { format } from "date-fns"; // Wait, I should check if date-fns is available

export default async function ActivityLogPage() {
    let logs = [];
    try {
        logs = await fetchActivityLogs();
    } catch (error) {
        return <div className="p-8">Unauthorized</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Activity Log (Audit Trail)</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {logs.map((log: any) => (
                            <tr key={log._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${log.action === 'LOGIN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No logs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
