import { useForm } from '@inertiajs/react';
import React from 'react'
import Form from './Form';

export default function Create({setIsOpenAddDialog,permissions, enabled, setEnabled}) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });
    const closeButton = (e) => setIsOpenAddDialog(false);
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("roles.store"), {
            data,
            onSuccess: () => {
                reset(), setIsOpenAddDialog(false);
            },
        });
    };
  return (
    <form onSubmit={onSubmit}>
            <Form {...{ errors, data, permissions, enabled, setEnabled, setData, submit: "Simpan", closeButton }} />
        </form>
  )
}
