"use client";

import { useEffect, useState } from "react";

function FormatDate({ date }: { date: string }) {
    const [formatted, setFormatted] = useState("");

    useEffect(() => {
        setFormatted(new Date(date).toLocaleDateString());
    }, [date]);

    return <span>{formatted}</span>;
}

export default FormatDate;