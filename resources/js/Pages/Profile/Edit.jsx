import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import App from "@/Layouts/App";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />
                <div className="mx-auto space-y-6 ">
                    <div className="p-4 bg-white border rounded sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 bg-white border rounded sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 bg-white border rounded sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
           
        </>
    );
}
Edit.layout = (page) => <App children={page} />;
