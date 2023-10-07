import { Link, useOutletContext } from 'react-router-dom';
import './last-cities-page.css'
import React, { useEffect } from 'react';
import { Loading } from '../components';

function LastCitiesPage() {
    const { generalLoadingState } = useOutletContext();

    const [generalLoading, setGeneralLoading] = generalLoadingState,
        { lastWatchedList } = useOutletContext();

    useEffect(() => {
        setGeneralLoading(false)
    });

    const Content = () => {

        return (
            <div className="last-cities-page-container">
                <ul className="last-cities-page">
                    {
                        lastWatchedList.map((item, id) => {
                            return (
                                <Link key={"city" + id} to={"/city/" + item.split(", ")[0]}>
                                    <li className="city-item">
                                        <i className="fa-solid fa-circle city-item-dot"></i>
                                        {item}
                                    </li>
                                </Link>
                            )
                        }
                        )
                    }
                </ul>
            </div>
        )
    }

    let component = generalLoading ? <Loading /> : <Content />;

    return (
        <>
            {component}
        </>
    )
}

export default LastCitiesPage;