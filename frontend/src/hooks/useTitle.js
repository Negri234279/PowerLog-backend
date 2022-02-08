import { useEffect, useRef } from "react"

/**
 * 
 * @param {String} title Titulo
 */
const useTitle = ({ title }) => {
    const prevTitle = useRef(document.title)
    useEffect(() => {
        const previusTitle = prevTitle.current
        document.title = `${title} | PowerLog`
        return () => (document.title = previusTitle)
    }, [title])
}

export default useTitle