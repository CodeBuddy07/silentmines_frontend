"use client";

interface HeaderProps {
    title: string;
    subTitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    return (
        <div className="mb-6 text-start">
            <h1 className="text-3xl font-bold text-white mb-2">
               {title}
            </h1>
            <p className="text-muted-foreground text-sm">
               {subTitle}
            </p>
        </div>
    )
}

export default Header