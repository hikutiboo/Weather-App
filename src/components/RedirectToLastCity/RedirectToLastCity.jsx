import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

function RedirectToLastCity() {

    let { lastWatchedList } = useOutletContext();

    return <Navigate to={"/city/" + lastWatchedList[0]} replace={true} />;
}

export default RedirectToLastCity;