import { useCallback } from "react"

function useRequest() {

    const getUrl = useCallback(async (url, method = 'GET', body = null, headers) => {

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                return JSON.parse(await response.text());
            }

            const data = await response.json();
            return data;

        } catch (e) {
            return e;
        }

    }, []);

    return { getUrl };
}

export default useRequest;