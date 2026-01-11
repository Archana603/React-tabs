import { useState, useRef } from "react";
import "./Tabs.css";

function Tabs() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Tab 1" },
    { id: 2, title: "Tab 2" },
    { id: 3, title: "Tab 3" },
  ]);

  const [activeTab, setActiveTab] = useState(1);
  const [dragIndex, setDragIndex] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const tabRef = useRef(null);

 
  const addTab = () => {
    const newTab = {
      id: Date.now(),
      title: `Tab ${tabs.length + 1}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

 
  const deleteTab = (id) => {
    const updated = tabs.filter((tab) => tab.id !== id);
    setTabs(updated);
    if (id === activeTab && updated.length) {
      setActiveTab(updated[0].id);
    }
  };

 
  const onDragStart = (index) => setDragIndex(index);

  const onDrop = (index) => {
    const updated = [...tabs];
    const dragged = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, dragged);
    setTabs(updated);
  };

 
  const scrollLeft = () => {
    tabRef.current.scrollLeft -= 120;
  };

  const scrollRight = () => {
    tabRef.current.scrollLeft += 120;
  };

  const isOverflow =
    tabRef.current &&
    tabRef.current.scrollWidth > tabRef.current.clientWidth;

  return (
    <div className="tabs-wrapper">
     
      <button className="nav-btn" onClick={scrollLeft}>
        ◀
      </button>

     
      <div className="tabs-container" ref={tabRef}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTab ? "active" : ""}`}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(index)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            <span
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                deleteTab(tab.id);
              }}
            >
              ×
            </span>
          </div>
        ))}
      </div>

     
      <div className="right-controls">
        {isOverflow && (
          <div
            className="ellipsis"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            …
            {showMenu && (
              <div className="menu">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button className="add-icon" onClick={addTab}>
          ＋
        </button>

        <button className="nav-btn" onClick={scrollRight}>
          ▶
        </button>
      </div>
    </div>
  );
}

export default Tabs;
