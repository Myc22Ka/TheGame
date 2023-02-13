import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function Mem({ mem: { name, url } }) {
    const { back } = useRouter();
    return (
        <React.Fragment>
            <div>Mem</div>
            <button onClick={() => back()}>Wróć</button>
            <img src={url} alt={`Mem ${name}`} />
        </React.Fragment>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params; // id matches with [id]

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

    const mem = data.memes.find((mem) => mem.id === id);

    return {
        props: {
            mem,
        },
    };
}

Mem.propTypes = {
    mem: PropTypes.object,
};
