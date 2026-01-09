'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
    const imagePicker = useRef();
    const [selectImage, setSelectImage] = useState(null);

    function handleImagePicker() {
        imagePicker.current.click();
    }

    function handleChnage(event){
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setSelectImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }

    return (<div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!selectImage && <p>No image picked yet.</p>}
                {selectImage && <Image src={selectImage} alt="The image selected by user." fill />}
            </div>
            <input type="file" 
            id={name}
            accept='image/png, image/jpeg' 
            name={name}
            className={classes.input}
            ref={imagePicker}
            onChange={handleChnage}
            multiple/>
            <button 
                type="button" 
                className={classes.button}
                onClick={handleImagePicker}>
                Pick an image
            </button>
        </div>
    </div>)
}
