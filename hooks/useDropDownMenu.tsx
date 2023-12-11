import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function useDropDownMenu({
    items,
    defaultState,
    placeholder,
    textStyle,
    style,
    dropDownContainerStyle,
}: {
    items: { label: string; value: string }[];
    defaultState: any;
    placeholder: string;
    textStyle?: any;
    style?: any;
    dropDownContainerStyle?: any;
}) {
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState<typeof defaultState>(defaultState);
    const [typeItems, setTypeItems] = useState(items);

    return {
        component: () => {
            return <DropDownPicker
            style={{
                ...style,
                zIndex: 1,
            }}
            textStyle={textStyle}
            placeholder={placeholder}
            open={typeOpen}
            value={typeValue}
            items={typeItems}
            setOpen={setTypeOpen}
            setValue={setTypeValue}
            setItems={setTypeItems}
            listMode="SCROLLVIEW"
            dropDownContainerStyle={dropDownContainerStyle}
        />
        } ,
        typeOpen,
        typeValue,
        typeItems
    }
}
