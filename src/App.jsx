import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [selectedDate, setSelectedDate] = useState(9);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [discussionText, setDiscussionText] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [homeworkProgress, setHomeworkProgress] = useState([
    { title: "Styling with CSS", percent: 50, color: "purple" },
    { title: "Basics of programming", percent: 35, color: "gray" },
    { title: "Learn to Program in Java", percent: 25, color: "gray" },
  ]);

  // Doubt modal state
  const [doubtModalOpen, setDoubtModalOpen] = useState(false);
  const [doubtText, setDoubtText] = useState("");
  const [doubtResults, setDoubtResults] = useState([]);
  const [doubtLoading, setDoubtLoading] = useState(false);

  // For which course the doubt is being asked
  const [doubtCourse, setDoubtCourse] = useState(null);

  // Neon intensity state
  const [neonIntensity, setNeonIntensity] = useState(1);

  // Load from localStorage on mount
  useEffect(() => {
    const storedSidebar = localStorage.getItem("activeSidebar");
    const storedEnrolled = localStorage.getItem("enrolledCourses");
    const storedWishlist = localStorage.getItem("wishlist");
    const storedDiscussions = localStorage.getItem("discussions");
    const storedSelectedDate = localStorage.getItem("selectedDate");
    const storedProgress = localStorage.getItem("homeworkProgress");
    const storedCompleted = localStorage.getItem("completedCourses");

    if (storedSidebar) setActiveSidebar(storedSidebar);
    if (storedEnrolled) setEnrolledCourses(JSON.parse(storedEnrolled));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    if (storedDiscussions) setDiscussions(JSON.parse(storedDiscussions));
    if (storedSelectedDate) setSelectedDate(parseInt(storedSelectedDate));
    if (storedProgress) setHomeworkProgress(JSON.parse(storedProgress));
    if (storedCompleted) setCompletedCourses(JSON.parse(storedCompleted));
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem("activeSidebar", activeSidebar);
  }, [activeSidebar]);

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("completedCourses", JSON.stringify(completedCourses));
  }, [completedCourses]);

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("homeworkProgress", JSON.stringify(homeworkProgress));
  }, [homeworkProgress]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--neon-intensity",
      neonIntensity
    );
  }, [neonIntensity]);

  const handleProgressClick = (index) => {
    const newProgress = [...homeworkProgress];
    newProgress[index].percent += 5;
    if (newProgress[index].percent > 100) newProgress[index].percent = 100;
    setHomeworkProgress(newProgress);
  };

  const toggleEnroll = (courseName) => {
    setEnrolledCourses((prev) =>
      prev.includes(courseName)
        ? prev.filter((name) => name !== courseName)
        : [...prev, courseName]
    );
  };

  const toggleWishlist = (courseName) => {
    setWishlist((prev) =>
      prev.includes(courseName)
        ? prev.filter((name) => name !== courseName)
        : [...prev, courseName]
    );
  };

  const toggleCompleted = (courseName) => {
    setCompletedCourses((prev) =>
      prev.includes(courseName)
        ? prev.filter((name) => name !== courseName)
        : [...prev, courseName]
    );
  };

  const postDiscussion = () => {
    if (discussionText.trim() !== "") {
      setDiscussions((prev) => [...prev, discussionText]);
      setDiscussionText("");
    }
  };

  // Ask Doubt logic
  const openDoubtModal = (courseName) => {
    setDoubtCourse(courseName);
    setDoubtModalOpen(true);
    setDoubtText("");
    setDoubtResults([]);
  };

  const closeDoubtModal = () => {
    setDoubtModalOpen(false);
    setDoubtText("");
    setDoubtResults([]);
    setDoubtLoading(false);
  };

  const handleAskDoubt = async (e) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    setDoubtLoading(true);
    setDoubtResults([]);
    // Placeholder: Simulate Google search fetch
    // Replace with real API call if available
    try {
      // Simulate delay
      await new Promise((res) => setTimeout(res, 1200));
      // Fake result: Only one
      setDoubtResults([
        {
          title: `Result for "${doubtText}"`,
          link:
            "https://www.google.com/search?q=" + encodeURIComponent(doubtText),
        },
      ]);
    } finally {
      setDoubtLoading(false);
    }
  };

  const newCourses = [
    {
      name: "Geography",
      lessons: 12,
      color: "orange",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      name: "JavaScript Course",
      lessons: 15,
      color: "purple",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      name: "Photography Course",
      lessons: 8,
      color: "blue",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Academy</h2>
        <nav>
          <ul>
            {["Dashboard", "Courses", "My Learning", "Wishlist"].map((item) => (
              <li
                key={item}
                className={activeSidebar === item ? "active" : ""}
                onClick={() => setActiveSidebar(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <div className="subscription">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Premium"
          />
          <p>
            <strong>Premium subscription</strong>
            <br />
            Buy Premium and get access to new courses
          </p>
          <button onClick={() => setActiveSidebar("Courses")}>
            More detailed
          </button>
        </div>
      </aside>

      <main className="dashboard">
        <header className="dashboard-header">
          <h1>{activeSidebar}</h1>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="neon-intensity">
            <span>Neon Intensity: {neonIntensity.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={neonIntensity}
              onChange={(e) => setNeonIntensity(parseFloat(e.target.value))}
            />
          </div>
          <div className="profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
            />
            <div>
              <h4>Shubham</h4>
              <small>Elementary</small>
            </div>
          </div>
        </header>

        {activeSidebar === "Dashboard" && (
          <section className="new-courses">
            <h2>Recommended for You</h2>
            <div className="course-cards">
              {(() => {
                const filtered = newCourses.filter((course) =>
                  course.name
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
                );
                if (filtered.length === 0) {
                  return (
                    <div
                      style={{
                        color: "#00ffe7",
                        width: "100%",
                        textAlign: "center",
                        fontWeight: 700,
                        fontFamily: "Orbitron",
                      }}
                    >
                      No such courses
                    </div>
                  );
                }
                return filtered.map((course) => (
                  <div key={course.name} className={`card ${course.color}`}>
                    {course.name}
                    <br />
                    <small>{course.lessons} lessons</small>
                  </div>
                ));
              })()}
            </div>
            {enrolledCourses.length > 0 && (
              <div className="ongoing-courses-section">
                <h2>On going courses</h2>
                <div className="course-cards">
                  {(() => {
                    const filtered = newCourses.filter(
                      (course) =>
                        enrolledCourses.includes(course.name) &&
                        course.name
                          .toLowerCase()
                          .includes(search.trim().toLowerCase())
                    );
                    if (filtered.length === 0) {
                      return (
                        <div
                          style={{
                            color: "#00ffe7",
                            width: "100%",
                            textAlign: "center",
                            fontWeight: 700,
                            fontFamily: "Orbitron",
                          }}
                        >
                          No such courses
                        </div>
                      );
                    }
                    return filtered.map((course) => (
                      <div key={course.name} className={`card ${course.color}`}>
                        <h4>{course.name}</h4>
                        <video
                          width="100%"
                          height="120"
                          style={{ objectFit: "cover", borderRadius: "6px" }}
                          controls
                        >
                          <source src={course.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button onClick={() => toggleEnroll(course.name)}>
                          Unenroll
                        </button>
                        <button
                          className="ask-doubt-btn"
                          onClick={() => openDoubtModal(course.name)}
                        >
                          Ask Doubt
                        </button>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}
          </section>
        )}

        {activeSidebar === "Courses" && (
          <section className="courses">
            <h2>All Courses</h2>
            <div className="course-cards">
              {(() => {
                const filtered = newCourses.filter((course) =>
                  course.name
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
                );
                if (filtered.length === 0) {
                  return (
                    <div
                      style={{
                        color: "#00ffe7",
                        width: "100%",
                        textAlign: "center",
                        fontWeight: 700,
                        fontFamily: "Orbitron",
                      }}
                    >
                      No such courses
                    </div>
                  );
                }
                return filtered.map((course) => (
                  <div key={course.name} className={`card ${course.color}`}>
                    <h4>{course.name}</h4>
                    <video width="100%" controls>
                      <source src={course.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button onClick={() => toggleEnroll(course.name)}>
                      {enrolledCourses.includes(course.name)
                        ? "Unenroll"
                        : "Enroll Now"}
                    </button>
                    {enrolledCourses.includes(course.name) &&
                      !completedCourses.includes(course.name) && (
                        <button
                          onClick={() => toggleCompleted(course.name)}
                          className="completed-btn"
                        >
                          Mark as Completed
                        </button>
                      )}
                    {completedCourses.includes(course.name) && (
                      <span className="completed-label">Completed</span>
                    )}
                    {/* Ask Doubt Button */}
                    <button
                      className="ask-doubt-btn"
                      onClick={() => openDoubtModal(course.name)}
                    >
                      Ask Doubt
                    </button>
                  </div>
                ));
              })()}
            </div>
          </section>
        )}

        {activeSidebar === "My Learning" && (
          <section className="enrolled">
            <h2>My Learning</h2>
            {(() => {
              const filtered = completedCourses.filter((courseName) =>
                courseName.toLowerCase().includes(search.trim().toLowerCase())
              );
              if (filtered.length === 0) {
                return (
                  <p
                    style={{
                      color: "#00ffe7",
                      fontWeight: 700,
                      fontFamily: "Orbitron",
                    }}
                  >
                    No such courses
                  </p>
                );
              }
              return (
                <ul>
                  {filtered.map((course) => (
                    <li key={course}>{course} ✅</li>
                  ))}
                </ul>
              );
            })()}
          </section>
        )}

        {activeSidebar === "Wishlist" && (
          <section className="wishlist">
            <h2>Bookmarked Courses</h2>
            <p
              style={{
                color: "#00ffe7",
                fontWeight: 700,
                fontFamily: "Orbitron",
              }}
            >
              This feature will be updated in the future.
            </p>
          </section>
        )}
      </main>

      <aside className="profile-sidebar">
        <div className="calendar">
          <h3>May 2022</h3>
          <table>
            <thead>
              <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const daysInMonth = 31;
                const firstDayOfWeek = 0; // Sunday (May 1, 2022)
                const weeks = [];
                let week = [];
                // Fill initial empty cells if the month doesn't start on Sunday
                for (let i = 0; i < firstDayOfWeek; i++) {
                  week.push(null);
                }
                for (let day = 1; day <= daysInMonth; day++) {
                  week.push(day);
                  if (week.length === 7) {
                    weeks.push(week);
                    week = [];
                  }
                }
                // Fill trailing empty cells
                if (week.length > 0) {
                  while (week.length < 7) week.push(null);
                  weeks.push(week);
                }
                return weeks.map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) =>
                      day ? (
                        <td
                          key={j}
                          className={selectedDate === day ? "active" : ""}
                          onClick={() => setSelectedDate(day)}
                        >
                          {day}
                        </td>
                      ) : (
                        <td key={j}></td>
                      )
                    )}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
          <p className="selected-date">
            Selected Date: {selectedDate} May 2022
          </p>
        </div>

        <div className="homework">
          <h3>Homework Progress</h3>
          {homeworkProgress.map((task, i) => (
            <div
              key={i}
              className={`task ${task.color}`}
              onClick={() => handleProgressClick(i)}
            >
              {task.title} — {task.percent}%
            </div>
          ))}
        </div>
      </aside>

      {/* Doubt Modal */}
      {doubtModalOpen && (
        <div className="doubt-modal-overlay" onClick={closeDoubtModal}>
          <div className="doubt-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Ask a Doubt {doubtCourse ? `for ${doubtCourse}` : ""}</h3>
            <form onSubmit={handleAskDoubt}>
              <input
                className="doubt-input"
                value={doubtText}
                onChange={(e) => setDoubtText(e.target.value)}
                placeholder="Type your doubt..."
                autoFocus
              />
              <button
                type="submit"
                className="doubt-submit-btn"
                disabled={doubtLoading}
              >
                {doubtLoading ? "Searching..." : "Search"}
              </button>
              <button
                type="button"
                className="doubt-close-btn"
                onClick={closeDoubtModal}
              >
                Close
              </button>
            </form>
            <div className="doubt-results">
              {doubtResults.length > 0 && (
                <ul>
                  {doubtResults.map((res, i) => (
                    <li key={i}>
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {res.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {doubtLoading && <p>Loading...</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
