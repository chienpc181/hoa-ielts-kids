import { InputSwitch } from "primereact/inputswitch";
import React from 'react';


export default function SwitchLang({ translate, setTranslate }) {

    return (<div className='align-items-center flex justify-content-center' >
        <span className='mr-2' style={{fontWeight:'bold'}}>VI</span>
        <InputSwitch checked={translate} onChange={(e) => setTranslate(e.value)} />
        <span className='ml-2' style={{fontWeight:'bold'}}>EN</span>
    </div>)
}