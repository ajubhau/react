import { useState } from "react";

export default function useFetch(defaultValue) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [isEdit, setIsEdit] = useState(false);
    const isError = isEdit && enteredValue === '';

    function handleChange(event) {
        setEnteredValue(event.target.value);
        setIsEdit(false);
    }

    function handleBlur() {
        setIsEdit(true)
    }

     function handlePostData(payload) {
        const response = fetch('http://localhost:3000/orders', {
            body: JSON.stringify({order: payload}),
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        return response;
    }

    return {
        enteredValue,
        isEdit,
        isError,
        handleChange,
        handleBlur,
        handlePostData,
        setEnteredValue
    }
}