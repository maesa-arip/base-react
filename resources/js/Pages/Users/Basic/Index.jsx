import Container from "@/Components/Container";
import DangerButton from "@/Components/DangerButton";
import Dropdown from "@/Components/Dropdown";
import AddModal from "@/Components/Modal/AddModal";
import DestroyModal from "@/Components/Modal/DestroyModal";
import EditModal from "@/Components/Modal/EditModal";
import ThirdButton from "@/Components/ThirdButton";
import App from "@/Layouts/App";
import { Head, Link, router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Create from "./Create";
import Edit from "./Edit";
import Table from "@/Components/Table";
import NavTab from "@/Layouts/NavTab";
import Navbar from "@/Layouts/Navbar";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { IconPaperclip } from "@tabler/icons-react";
import TextInput from "@/Components/TextInput";
import DatePicker from "@/Components/DatePicker/DatePicker";
import InputLabel from "@/Components/InputLabel";

const UpIcon = () => (
    <svg
        className="w-5 h-5 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
        />
    </svg>
);
const DownIcon = () => (
    <svg
        className="w-5 h-5 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>
);

export default function Index(props) {
    const { data: people, meta, filtered, attributes } = props.users;
    const roles = props.roles;
    const [pageNumber, setPageNumber] = useState([]);
    const [params, setParams] = useState(filtered);

    const [isInitialRender, setIsInitialRender] = useState(true);
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route(route().current()),
                // route("riskRegisterKlinis.index"),
                { ...pickBy(query), page: query.page },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );
    useEffect(() => {
        if (!isInitialRender) {
            reload(params);
        } else {
            setIsInitialRender(false);
        }
    }, [params]);
    useEffect(() => {
        let numbers = [];
        for (
            let i = attributes.per_page;
            i < attributes.total / attributes.per_page;
            i = i + attributes.per_page
        ) {
            numbers.push(i);
        }
        setPageNumber(numbers);
    }, []);
    const onChange = (event) => {
        const updatedParams = {
            ...params,
            [event.target.name]: event.target.value,
            page: 1, // Set page number to 1
        };
        setParams(updatedParams);
    };
    // const onChange = (event) =>
    //     setParams({ ...params, [event.target.name]: event.target.value });
    const sort = (item) => {
        setParams({
            ...params,
            field: item,
            direction: params.direction == "asc" ? "desc" : "asc",
        });
    };
    // CRUD

    const openAddDialog = () => {
        setIsOpenAddDialog(true);
    };
    const openEditDialog = (person) => {
        setState(person);
        setIsOpenEditDialog(true);
    };
    const openDestroyDialog = (person) => {
        setState(person);
        setIsOpenDestroyDialog(true);
    };

    const destroyUser = () => {
        router.delete(route("users.destroy", state.id), {
            onSuccess: () => setIsOpenDestroyDialog(false),
        });
    };
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
    const [isOpenDestroyDialog, setIsOpenDestroyDialog] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [state, setState] = useState([]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <>
            <Head title="User" />
            <AddModal
                isOpenAddDialog={isOpenAddDialog}
                setIsOpenAddDialog={setIsOpenAddDialog}
                size="max-w-4xl"
                title="Tambah User"
            >
                <Create
                    roles={roles}
                    enabled={enabled}
                    setEnabled={setEnabled}
                    isOpenAddDialog={isOpenAddDialog}
                    setIsOpenAddDialog={setIsOpenAddDialog}
                />
            </AddModal>
            <EditModal
                isOpenEditDialog={isOpenEditDialog}
                setIsOpenEditDialog={setIsOpenEditDialog}
                size="max-w-4xl"
                title={"Edit User"}
            >
                <Edit
                    roles={roles}
                    model={state}
                    isOpenEditDialog={isOpenEditDialog}
                    setIsOpenEditDialog={setIsOpenEditDialog}
                />
            </EditModal>
            <DestroyModal
                isOpenDestroyDialog={isOpenDestroyDialog}
                setIsOpenDestroyDialog={setIsOpenDestroyDialog}
                size="max-w-4xl"
                title="Delete User"
                warning="Yakin hapus data ini ?"
            >
                <DangerButton className="ml-2" onClick={destroyUser}>
                    Delete
                </DangerButton>
            </DestroyModal>
            <Container>
                <Tab.Group>
                    <Tab.List className="p-1 space-x-4 overflow-x-auto bg-white rounded md:flex whitespace-nowrap">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 text-gray-700",
                                    "ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 transition-all duration-300",
                                    selected
                                        ? "bg-blue-300 text-white ring-2 ring-blue-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2"
                                        : "bg-gray-300 text-white ring-2 ring-gray-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 hover:ring-blue-300"
                                )
                            }
                        >
                            Semua Data
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 text-gray-700",
                                    "ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 transition-all duration-300",
                                    selected
                                        ? "bg-blue-300 text-white ring-2 ring-blue-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2"
                                        : "bg-gray-300 text-white ring-2 ring-gray-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 hover:ring-blue-300"
                                )
                            }
                        >
                            Belum Periksa
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 text-gray-700",
                                    "ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 transition-all duration-300",
                                    selected
                                        ? "bg-blue-300 text-white ring-2 ring-blue-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2"
                                        : "bg-gray-300 text-white ring-2 ring-gray-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 hover:ring-blue-300"
                                )
                            }
                        >
                            Sudah Periksa
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 text-gray-700",
                                    "ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 transition-all duration-300",
                                    selected
                                        ? "bg-blue-300 text-white ring-2 ring-blue-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2"
                                        : "bg-gray-300 text-white ring-2 ring-gray-300 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 hover:ring-blue-300"
                                )
                            }
                        >
                            Reservasi
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                            className={classNames(
                                "rounded bg-white",
                                "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                            )}
                        >
                            {/* Semua Data */}

                            <div className="flex items-center justify-between mb-2">
                                <div className="w-1/2">
                                    <div className="flex items-center justify-start mt-2 mb-0 gap-x-1">
                                        <ThirdButton
                                            type="button"
                                            onClick={openAddDialog}
                                        >
                                            Tambah
                                        </ThirdButton>
                                        
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex items-center justify-end mt-4 mb-0 gap-x-1">
                                    <InputLabel htmlFor="Periode" value="Periode" />
                                        <TextInput
                                            type="date"
                                            id="name"
                                            name="name"
                                            className="block w-1/4 "
                                            autoComplete="name"
                                            isFocused={true}
                                            required
                                        />
                                        <InputLabel htmlFor="Sampai" value="Sampai" />
                                        <TextInput
                                            type="date"
                                            id="name"
                                            name="name"
                                            className="block w-1/4 "
                                            autoComplete="name"
                                            isFocused={true}
                                            required
                                        />
                                        <select
                                            name="load"
                                            id="load"
                                            onChange={onChange}
                                            value={params.load}
                                            className="transition duration-150 ease-in-out border-gray-300 rounded focus:ring-blue-200 focus:ring form-select"
                                        >
                                            {pageNumber.map((page, index) => (
                                                <option key={index}>
                                                    {page}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="flex items-center px-2 transition duration-150 ease-in-out bg-white border border-gray-300 rounded gap-x-2 focus-within:border-blue-400 focus-within:ring-blue-200 focus-within:ring">
                                            <svg
                                                className="inline w-5 h-5 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                name="q"
                                                id="q"
                                                onChange={onChange}
                                                value={params.q}
                                                className="w-full border-0 focus:ring-0 form-text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th params={params}>#</Table.Th>
                                <Table.Th
                                    name="name"
                                    onClick={() =>
                                        sort("name")
                                    }
                                    params={params}
                                >
                                    Name
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {people.map((person, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td>{meta.from + index}</Table.Td>
                                    <Table.Td>{person.name}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table> */}

                            <div className="flex flex-col">
                                <div className="-my-2 rounded sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="border border-gray-200 sm:rounded">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
                                                        >
                                                            <div className="flex items-center cursor-pointer gap-x-2">
                                                                #
                                                            </div>
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
                                                        >
                                                            <div
                                                                className="flex items-center cursor-pointer gap-x-2"
                                                                onClick={() =>
                                                                    sort("name")
                                                                }
                                                            >
                                                                Name
                                                                {params.field ==
                                                                    "name" &&
                                                                    params.direction ==
                                                                        "asc" && (
                                                                        <UpIcon />
                                                                    )}
                                                                {params.field ==
                                                                    "name" &&
                                                                    params.direction ==
                                                                        "desc" && (
                                                                        <DownIcon />
                                                                    )}
                                                            </div>
                                                        </th>

                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
                                                        >
                                                            <div
                                                                className="flex items-center cursor-pointer gap-x-2"
                                                                onClick={() =>
                                                                    sort(
                                                                        "email"
                                                                    )
                                                                }
                                                            >
                                                                Email
                                                                {params.field ==
                                                                    "email" &&
                                                                    params.direction ==
                                                                        "asc" && (
                                                                        <UpIcon />
                                                                    )}
                                                                {params.field ==
                                                                    "email" &&
                                                                    params.direction ==
                                                                        "desc" && (
                                                                        <DownIcon />
                                                                    )}
                                                            </div>
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
                                                        >
                                                            <div
                                                                className="flex items-center cursor-pointer gap-x-2"
                                                                // onClick={() =>
                                                                //     sort("roles")
                                                                // }
                                                            >
                                                                Roles
                                                                {params.field ==
                                                                    "roles" &&
                                                                    params.direction ==
                                                                        "asc" && (
                                                                        <UpIcon />
                                                                    )}
                                                                {params.field ==
                                                                    "roles" &&
                                                                    params.direction ==
                                                                        "desc" && (
                                                                        <DownIcon />
                                                                    )}
                                                            </div>
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="relative px-6 py-3"
                                                        >
                                                            <span className="sr-only">
                                                                Edit
                                                            </span>
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
                                                        >
                                                            <div className="flex items-center cursor-pointer gap-x-2"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {people.map(
                                                        (person, index) => (
                                                            <tr
                                                                key={
                                                                    person.email
                                                                }
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {meta.from +
                                                                        index}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        person.name
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        person.email
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {person.roles.map(
                                                                        (
                                                                            role,
                                                                            index
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="px-2 py-1 mx-1 text-xs text-blue-500 uppercase rounded-full bg-blue-50"
                                                                            >
                                                                                {
                                                                                    role.name
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        person.joined
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger>
                                                                            <button>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    className="w-4 h-4 text-gray-400"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="currentColor"
                                                                                >
                                                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                                </svg>
                                                                            </button>
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Content>
                                                                            <button
                                                                                className="items-center block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100 gap-x-2"
                                                                                onClick={() =>
                                                                                    openEditDialog(
                                                                                        person
                                                                                    )
                                                                                }
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                className="items-center block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100 gap-x-2"
                                                                                onClick={() =>
                                                                                    openDestroyDialog(
                                                                                        person
                                                                                    )
                                                                                }
                                                                            >
                                                                                Hapus
                                                                            </button>
                                                                        </Dropdown.Content>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <Pagination meta={meta} /> */}
                                        <ul className="flex items-center mt-4 gap-x-1">
                                            {meta.links.map((item, index) => (
                                                <button
                                                    key={index}
                                                    disabled={
                                                        item.url == null
                                                            ? true
                                                            : false
                                                    }
                                                    className={`${
                                                        item.url == null
                                                            ? "text-gray-500"
                                                            : "text-gray-800"
                                                    } w-12 h-9 rounded flex items-center justify-center border bg-white`}
                                                    onClick={() =>
                                                        setParams({
                                                            ...params,
                                                            page: new URL(
                                                                item.url
                                                            ).searchParams.get(
                                                                "page"
                                                            ),
                                                        })
                                                    }
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                "rounded bg-white p-3",
                                "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2"
                            )}
                        >
                            <div className="bg-white">
                                <div className="grid items-center max-w-2xl grid-cols-1 px-4 py-8 mx-auto gap-y-16 gap-x-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                                    <div>
                                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                            Name
                                        </h2>

                                        <Link
                                            className="inline-flex px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded"
                                            href={`#`}
                                        >
                                            Kategori
                                        </Link>
                                        <div className="inline-flex px-2 py-1 ml-4 text-xs font-semibold text-white rounded bg-sky-500">
                                            Sampai Hari Lagi
                                        </div>
                                        <p className="mt-4 text-gray-500">
                                            Deskipsi
                                        </p>

                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex justify-between">
                                                <dt className="font-medium text-gray-900">
                                                    Persentase Terkumpul
                                                </dt>
                                                <dt className="font-medium text-gray-900">
                                                    %
                                                </dt>
                                            </div>

                                            <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                                                <div className="h-full text-xs text-center text-white bg-blue-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                            <div className="pt-4 border-t border-gray-200">
                                                <dt className="font-medium text-gray-900">
                                                    Nilai Bisnis
                                                </dt>
                                                <dd className="mt-2 text-sm text-gray-500">
                                                    Anggaran
                                                </dd>
                                            </div>
                                            <div className="pt-4 border-t border-gray-200">
                                                <dt className="font-medium text-gray-900">
                                                    Total Terkumpul
                                                </dt>
                                                <dd className="mt-2 text-sm text-gray-500">
                                                    Rp
                                                </dd>
                                            </div>

                                            <div className="pt-4 border-t border-gray-200">
                                                <dt className="font-medium text-gray-900">
                                                    Jumlah Lembar
                                                </dt>
                                                <dd className="mt-2 text-sm text-gray-500">
                                                    Lembar
                                                </dd>
                                            </div>
                                            <div className="pt-4 pb-4 border-t border-gray-200">
                                                <dt className="font-medium text-gray-900">
                                                    Harga Perlembar
                                                </dt>
                                                <dd className="mt-2 mb-2 text-sm text-gray-500">
                                                    Rp
                                                </dd>
                                            </div>
                                        </dl>
                                        <div className="pt-4 mt-4 border-t border-gray-200">
                                            <div className="flex justify-between">
                                                <dt className="font-medium text-gray-900">
                                                    Tentang Bisnis
                                                </dt>
                                            </div>

                                            <p className="mt-4 text-gray-500">
                                                Tentang
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                                        <img
                                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                                            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                                            className="bg-gray-100 rounded"
                                        />
                                        <img
                                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                                            alt="Top down view of walnut card tray with embedded magnets and card groove."
                                            className="bg-gray-100 rounded"
                                        />
                                        <img
                                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                                            alt="Side of walnut card tray with card groove and recessed card area."
                                            className="bg-gray-100 rounded"
                                        />
                                        <img
                                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                                            alt="Walnut card tray filled with cards and card angled in dedicated groove."
                                            className="bg-gray-100 rounded"
                                        />
                                        Gambar
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                "rounded bg-white p-3",
                                "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2"
                            )}
                        >
                            <div className="overflow-hidden bg-white shadow sm:rounded">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Informasi Kategori
                                    </h3>
                                </div>
                                <div className="border-t border-gray-200">
                                    <dl>
                                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Kategori Bisnis
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <Link
                                                    className="inline-flex px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded"
                                                    href={`#`}
                                                >
                                                    Kategori
                                                </Link>
                                            </dd>
                                        </div>
                                        <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Penerbit
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                PT Tawarin Dimana Saja
                                            </dd>
                                        </div>
                                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Sistem Pengelolaan
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                Auto Pilot
                                            </dd>
                                        </div>
                                        <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Target Investasi
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                Rp
                                            </dd>
                                        </div>
                                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Minimum Investasi / Lembar Saham
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                Rp
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                "rounded bg-white p-3",
                                "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2"
                            )}
                        >
                            <div className="mapouter">
                                <div className="mb-4 gmap_canvas">
                                    <iframe
                                        className="w-full rounded h-96"
                                        id="gmap_canvas"
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15776.155420991337!2d115.1771986!3d-8.687855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe9125691d552561f!2sWasco%20Garage%20Carwash!5e0!3m2!1sid!2sid!4v1665880331383!5m2!1sid!2sid"
                                        frameBorder={0}
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                    />
                                </div>
                                Alamat
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Container>
        </>
    );
}
Index.layout = (page) => <App children={page} />;
