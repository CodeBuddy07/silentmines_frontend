interface SectionHeaderProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title = "Deal Of The Week",
    subtitle = "Shop Best Deals in the Universe.",
    className = ""
}) => {
    return (
        <div className={`text-center space-y-4 mb-12 ${className}`}>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {title}
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto">
                {subtitle}
            </p>
            <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
        </div>
    );
};

export default SectionHeader;