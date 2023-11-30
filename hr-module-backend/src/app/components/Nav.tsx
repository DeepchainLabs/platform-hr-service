import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav>
      <Link className="btn btn-sm btn-link" href="/">
        Home
      </Link>
      <Link className="btn btn-sm btn-link" href="/leave">
        Leave
      </Link>
      <Link className="btn btn-sm btn-link" href="/leave/info">
        Leave Info
      </Link>
      <Link className="btn btn-sm btn-link" href="/leave/type">
        Leave Type
      </Link>
      <Link className="btn btn-sm btn-link" href="/leave/working-days">
        Working Days
      </Link>
      <Link className="btn btn-sm btn-link" href="/calendar">
        Calendar
      </Link>
      <Link className="btn btn-sm btn-link" href="/calendar/type">
        Calendar Type
      </Link>
    </nav>
  );
};

export default Nav;
