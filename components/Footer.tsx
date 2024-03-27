import exp from "constants"
import Link from "next/link";

const Footer = () => {

    return(
        <footer>
        <Link href="https://github.com/Floryus/chess-tactics">
            <span style={{ fontFamily: 'Apple Color Emoji' }}>👾</span>
            GitHub
        </Link>
        <Link href="/Impressum">Impressum</Link>
        </footer>
    )

}
export default Footer;