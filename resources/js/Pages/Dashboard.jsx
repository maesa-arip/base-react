import App from "@/Layouts/App";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        // >
        <>
            <Head title="Dashboard" />

            <div className="">
                <div className="mx-auto">
                    <div className="overflow-hidden bg-white border rounded">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </>
        // </AuthenticatedLayout>
    );
}
Dashboard.layout = (page) => <App children={page} />;
