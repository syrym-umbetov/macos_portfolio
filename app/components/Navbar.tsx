import Image from 'next/image'
import logo from '@/public/images/logo.svg'
import {navIcons, navLinks} from "@/constants";



export default function Navbar() {
    return (
        <nav>
            <div>
                <Image src={logo} alt="logo" />
                <p className="font-bold">Syrym&#39;s portfolio</p>
                <ul>
                    {navLinks.map(({id, name}) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({id, img}) => (
                        <li key={id}>
                            <Image
                                src={img}
                                width={24}
                                height={24}
                                className="icon-hover"
                                alt={`icon-${id}`}
                            />
                        </li>
                    ))}
                </ul>

                <time>
                    {new Date().toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).replace(/,/g, '')}
                </time>
            </div>
        </nav>
    );
}
