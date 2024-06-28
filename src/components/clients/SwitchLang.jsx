import { InputSwitch } from "primereact/inputswitch";
import React from 'react';


export default function SwitchLang({ translate, setTranslate }) {

    return (<div className='align-items-center flex justify-content-center' >
        <h4 className='mr-2'>VI</h4>
        <InputSwitch checked={translate} onChange={(e) => setTranslate(e.value)} />
        <h4 className='ml-2'>EN</h4>
    </div>)
}