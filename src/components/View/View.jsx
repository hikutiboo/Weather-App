import React, { useEffect, useState } from 'react'
import { SearchField, Sidebar } from '../components'
import { Outlet } from 'react-router-dom';
import defaultSettings from "../../configs/default-settings.json";

function View() {
    function settingsSetter() {
        if (localStorage.getItem("currentSettings") == null) {
            localStorage.setItem("currentSettings", JSON.stringify(defaultSettings));
        }
    }

    function lastWatchedListSetter() {
        if (localStorage.getItem("lastWatchedList") == null) {
            localStorage.setItem("lastWatchedList", JSON.stringify(lastWatchedList));
        } else {
            setLastWatchedList(JSON.parse(localStorage.getItem("lastWatchedList")))
        }
    }

    const generalLoadingState = useState(false),
        [lastWatchedList, setLastWatchedList] = useState(
            [
                "Malolos"
            ]
        );

    function editLastWatchedList(newCity) {

        let newLastWatchedList = lastWatchedList;

        if (lastWatchedList.includes(newCity)) {
            newLastWatchedList.splice(lastWatchedList.indexOf(newCity), 1);
        } else if (lastWatchedList.length >= 7) {
            newLastWatchedList.pop();
        }

        newLastWatchedList = [newCity, ...newLastWatchedList];
        localStorage.setItem("lastWatchedList", JSON.stringify(newLastWatchedList));

        setLastWatchedList(newLastWatchedList);

        return newLastWatchedList;
    }

    useEffect(() => {
        settingsSetter();
        lastWatchedListSetter();
    }, [])

    return (
        <>
            <Sidebar generalLoadingState={generalLoadingState} lastWatchedList={lastWatchedList} />
            <SearchField editLastWatchedList={editLastWatchedList} />
            <Outlet context={{ generalLoadingState, lastWatchedList, editLastWatchedList }} />
        </>
    )
}

export default View;