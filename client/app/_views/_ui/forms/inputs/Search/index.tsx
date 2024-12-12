import { FC } from "react"
import cls from './index.module.scss';
import { SearchIcon } from "../../../svg_dynamic";

interface SearchProps {
    label?: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Search: FC<SearchProps> = ({ label, placeholder, value, onChange }) => {

    return (
        <div className={cls.wrapper}>
            {label && (
                <label className={cls.label} htmlFor={`search_${label}`}>
                    {label}
                </label>
            )}
            <div className={cls.input}>
                <SearchIcon/>
                <input
                    id={`search_${label}`}
                    className={cls.search}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export { Search };