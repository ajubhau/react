import Image from 'next/image';
import NavLink from './nav-link';
import Link from 'next/link';

import classes from './main-header.module.css';
import logoImg from '../assets/logo.png';
import BackgroundHeader from './background-header';

export default function MainHeader() {
    return (
        <>
            <BackgroundHeader />
            <header>
                <div className={classes.header}>
                    <Link className={classes.logo} href="/">
                        <Image src={logoImg} alt="A plate of food image" priority />
                        NextLevel Food
                    </Link>
                    <nav className={classes.nav}>
                        <ul>
                            <li>
                                <NavLink href="/meals">Browse Meals</NavLink>
                            </li>
                            <li>
                                <NavLink href="/community">Foodies Community</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}