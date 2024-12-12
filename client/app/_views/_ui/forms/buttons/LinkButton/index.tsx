import { FC, ReactNode } from "react"
import Link from "next/link";
import cls from './index.module.scss';

interface LinkButtonProps {
    to: string;
    ico: ReactNode;
    title: string;
}

const LinkButton: FC<LinkButtonProps> = ({ to, ico, title }) => {
    return (
        <Link href={to} className={cls.linkButton}>
            { ico && (
                ico
            )}
            <span>{ title }</span>
        </Link>
    );
}

export { LinkButton };