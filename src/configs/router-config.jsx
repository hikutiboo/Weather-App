import { Link, createBrowserRouter, Navigate } from "react-router-dom";
import { LastCitiesPage, OutletInheritContext, Settings, View, WeatherContent, RedirectToLastCity } from "../components/components";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <View />
            ),
            children: [
                {
                    path: "/",
                    element: <Navigate to="city" replace={true} />
                },
                {
                    path: "cities",
                    element: (
                        <LastCitiesPage />
                    )
                },
                {
                    path: "settings",
                    element: (
                        <Settings />
                    )
                },
                {
                    path: "city",
                    element: <OutletInheritContext />,
                    children: [
                        {
                            path: "",
                            element: <RedirectToLastCity />
                        },
                        {
                            path: ":cityName",
                            element: <WeatherContent />
                        },
                        {
                            path: "*",
                            element: (
                                <div>
                                    <h1>Error 404</h1>
                                    <h2>page not found</h2>
                                    <Link to="/">Go back home</Link>
                                </div>
                            ),
                        }
                    ]
                },
                {
                    path: "*",
                    element: (
                        <div>
                            <h1>Error 404</h1>
                            <h2>page not found</h2>
                            <Link to="/">Go back home</Link>
                        </div>
                    ),
                }
            ]
        }
    ]);

export default router;