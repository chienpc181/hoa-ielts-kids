import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"
import { BiFontSize } from "react-icons/bi";
import { useRef, useState } from "react";
function ReaderBar({fontSize, onChangeFontSize, darkMode, setDarkMode}) {
    const op_ResizeText = useRef(null);
    const [maxFontSize, setMaxFontSize] = useState(false);
    const [minFontSize, setMinFontSize] = useState(false);

    const handleIncreaseFontSize = () => {
        if (fontSize < 1.75) {
            onChangeFontSize(fontSize + 0.125);
        }
        if (fontSize === 1.75) {
            setMaxFontSize(true);
        } 
        setMinFontSize(false)
    }
    const handleDecreaseFontSize = () => {
        if (fontSize > 0.75) {
            onChangeFontSize(fontSize - 0.125);
        }
        if (fontSize === 0.75) {
            setMinFontSize(true)
        }
        setMaxFontSize(false);
    }
    const handleResetFontSize = () => {
        onChangeFontSize(1);
        setMinFontSize(false);
        setMaxFontSize(false);
    }

    const handleSetLightMode = () => {
        setDarkMode(false)
    }

    const handleSetDarkMode = () => {
        setDarkMode(true)
    }
    
    const darkModeStyle = () => {
        if (darkMode) {
            return {
                color: 'red'
            }
        }
    }

    const lightModeStyle = () => {
        if (!darkMode) {
            return {
                color: 'red'
            }
        }
    }
    
    return (
        <div className="flex card" style={{ gap: '8px'}}>
            <Button rounded text raised icon="pi pi-volume-up" size="large" />
            <Button rounded text raised severity="secondary" size="large" onClick={(e) => op_ResizeText.current.toggle(e)} style={{padding: '0 8px'}}>
                <BiFontSize/>
            </Button>
            <OverlayPanel ref={op_ResizeText}>
                <div className="flex" style={{gap: '8px'}}>
                <Button rounded text raised icon="pi pi-plus" size="large" disabled={maxFontSize} onClick={handleIncreaseFontSize}/>
                <Button rounded text raised icon="pi pi-minus" size="large" disabled={minFontSize} onClick={handleDecreaseFontSize}/>
                <Button rounded text raised icon="pi pi-undo" size="large" disabled={fontSize === 1} onClick={handleResetFontSize}/>
                </div>
            </OverlayPanel>
            <Button rounded text raised severity="secondary" icon="pi pi-copy" size="large" />

            <Button rounded text raised severity="secondary" icon="pi pi-sun" size="large" style={lightModeStyle()} onClick={handleSetLightMode}/>
            <Button rounded text raised severity="secondary" icon="pi pi-moon" size="large" style={darkModeStyle()} onClick={handleSetDarkMode}/>
        </div>
    )
}

export {ReaderBar}