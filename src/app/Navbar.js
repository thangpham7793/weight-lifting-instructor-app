import React from "react";
import { Link } from "react-router-dom";

//https://reactrouter.com/web/api/Redirect
export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Otago Weightlifting Instructor Space</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/learners">Learners</Link>
            <Link to="/schedules">Schedules</Link>
            <Link to="/schedules/new">Upload New Schedule</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
