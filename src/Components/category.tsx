import { useState } from "react";
import { getResource } from "../hooks/fetcher.mjs"

function Category({ category_path = "Default name", is_active = false, onActive }) {

    let name = "";

    if (category_path) {
        const split_path = category_path.split("/");
        name = split_path[split_path.length - 1];
    }

    return (
        <div className="category">
            {is_active ? (
                <button onClick={onActive} style={{ backgroundColor: "#949494"}}>
                    {name}
                </button>
            ) :
                <button onClick={onActive}>
            {name}
        </button>
            }
        </div >
    );
}

export default Category;