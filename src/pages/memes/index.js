import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function Memes({ memes }) {
    const listElements = memes.map((mem) => {
        return (
            <li key={mem.id}>
                <Link href={`/memes/${mem.id}`}>{mem.name}</Link>
            </li>
        );
    });
    return (
        <React.Fragment>
            <div>Memes</div>
            <ul>{listElements}</ul>
        </React.Fragment>
    );
}

export const getServerSideProps = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const { data, success } = await response.json();

    if (!success) {
        return {
            redirect: {
                destination: "/",
                permament: false,
            },
        };
    }

    const { memes } = data;

    return {
        props: { memes },
    };
};

Memes.propTypes = {
    memes: PropTypes.object,
};
