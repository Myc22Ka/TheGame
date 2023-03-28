import Link from "next/link";
import React from "react";

type Props = {
    name: string;
};

function Button({ name }: Props) {
    return (
        <button className="rounded-full bg-lime-500 text-white px-3 py-1 m-2">
            <Link href={`/${name}`}> {name}</Link>
        </button>
    );
}

export default Button;
