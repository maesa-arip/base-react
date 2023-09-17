
import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ marginTop = 'mt-10', meta, links }) {
    return (
        <div className={('flex items-center justify-center gap-2',marginTop)}>
            {meta.links.map((link, i) => (
                <div key={i}>
                    <Link
                      key={i} 
                      href={link.url}
                      className={(link.active && 'text-blue-700 w-12 h-9 rounded-lg flex items-center justify-center border bg-blue-100', 'text-black w-12 h-9 rounded-lg flex items-center justify-center border bg-white')}>
                      {link.label}
                    </Link>
                </div>
            ))}
        </div>
    );
}