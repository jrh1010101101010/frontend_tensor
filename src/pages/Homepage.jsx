import { Link } from "react-router-dom"

export default function Homepage (){
    return (
        <main>
            <h1>homepage</h1>
            <Link to="/number">number</Link>
            <Link to="/digit">Digit</Link>
        </main>
    )
}