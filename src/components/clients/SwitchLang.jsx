import { InputSwitch } from "primereact/inputswitch";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLang } from "../../features/language/langSlice";

export default function SwitchLang() {
    const dispatch = useDispatch();
    const translate = useSelector(state => state.lang.translate);
    return (<div className='align-items-center flex justify-content-center' >
        <span className='mr-2' style={{fontWeight:'bold'}}>VI</span>
        <InputSwitch checked={translate} onChange={(e) => dispatch(switchLang(e.value))} />
        <span className='ml-2' style={{fontWeight:'bold'}}>EN</span>
    </div>)
}