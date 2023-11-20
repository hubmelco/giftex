import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Used to scroll every webpage to the top when a user goes to a different page
 * @returns {null}
 * @constructor
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}