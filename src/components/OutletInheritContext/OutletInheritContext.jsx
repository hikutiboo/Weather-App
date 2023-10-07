import { Outlet, useOutletContext } from "react-router-dom"


const OutletInheritContext = () => {

    return <Outlet context={useOutletContext()} />
}

export default OutletInheritContext;