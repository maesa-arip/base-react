import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MyToggle from "@/Components/MyToggle";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextInputCheckbox from "@/Components/TextInputCheckbox";
import { set } from "lodash";
import React, { useEffect, useState } from "react";

export default function Form({
    errors,
    roles,
    submit,
    data,
    setData,
    model,
    closeButton,
}) {
    const onChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };
    const optionsFromDB = roles;
    let userrole = model ? model.roles.map((obj) => obj.id) : [];
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const selectedOptionsFromDB = userrole;
        const updatedOptions = optionsFromDB.map((option) => {
            if (selectedOptionsFromDB.includes(option.id)) {
                return { ...option, isSelected: true };
            }
            return option;
        });
        setOptions(updatedOptions);
    }, []);
    const handleCheckboxChange = (optionId) => {
        setOptions((prevOptions) =>
            prevOptions.map((option) => {
                if (option.id === optionId) {
                    return { ...option, isSelected: !option.isSelected };
                }
                return option;
            })
        );
    };
    const selectedOptionIds = options
        .filter((option) => option.isSelected)
        .map((option) => option.id);
    useEffect(() => {
        setData({ ...data, ["roles"]: selectedOptionIds });
    }, [options]);

    return (
        <>
            <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6">
                        <InputLabel htmlFor="name" value="Nama" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1"
                            autoComplete="name"
                            isFocused={true}
                            onChange={onChange}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="col-span-6">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1"
                            autoComplete="email"
                            isFocused={false}
                            onChange={onChange}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="col-span-12 mt-2">
                        <p className="text-lg font-semibold text-gray-700">
                            Pilih Roles
                        </p>
                    </div>
                    {options.map((option) => (
                        <div
                            className="flex justify-between col-span-4 px-3 py-4 border rounded-md"
                            key={option.id}
                        >
                            <InputLabel
                                htmlFor={option.name}
                                value={option.name}
                                className={"uppercase"}
                            />
                            <div className="flex flex-col items-start">
                                <TextInputCheckbox
                                    key={option.id}
                                    id={option.name}
                                    value={option.id}
                                    name={option.name}
                                    checked={option.isSelected}
                                    onChange={(e) => {
                                        handleCheckboxChange(option.id);
                                    }}
                                    className="block w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <PrimaryButton>{submit}</PrimaryButton>
                <SecondaryButton className="mx-2" onClick={closeButton}>
                    Batal
                </SecondaryButton>
            </div>
        </>
    );
}
