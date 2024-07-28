import { WhereMeetings } from "./DataBase";
import { useEffect, useState } from "react";
import Render from "../components/Rendering";
import { useIsFocused } from "@react-navigation/native";

export default function Where({ currentValue }) {
    const [loadWhere, SetloadWhere] = useState([])
    const isfouused = useIsFocused()

    useEffect(() => {
        async function load() {
            const values = await WhereMeetings(currentValue);
            SetloadWhere(values.data);
        }
        if (isfouused) {
            load()
        }
    }, [isfouused])

    return (
        <Render Meeting={loadWhere} />
    );
}