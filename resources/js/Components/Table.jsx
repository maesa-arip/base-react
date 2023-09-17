import React from "react";

const Table = ({ children }) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 rounded sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border border-gray-200 sm:rounded">
                            <table className="min-w-full divide-y divide-gray-200">
                                {children}
                            </table>
                        </div>
                        {/* Pagination */}
                    </div>
                </div>
            </div>
        </>
    );
};
const Thead = ({ children }) => {
    return (
        <>
            <thead className="bg-gray-50">
                {children}
            </thead>
        </>
    );
};
const Th = ({ children, name, sort, params }) => {
    return (
        <>
            <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
            >
                <div
                    className="flex items-center cursor-pointer gap-x-2"
                >
                    {children}
                </div>
            </th>
        </>
    );
};
const Tbody = ({ children }) => {
    return (
        <>
            <tbody className="bg-white divide-y divide-gray-200">
                {children}
            </tbody>
        </>
    );
};
const Td = ({ children }) => {
    return (
        <>
            <td className="px-6 py-4 whitespace-nowrap">{children}</td>
        </>
    );
};
const Tr = ({ children }) => {
    return <tr>{children}</tr>;
};

Table.Thead = Thead;
Table.Th = Th;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Tr = Tr;

export default Table;
