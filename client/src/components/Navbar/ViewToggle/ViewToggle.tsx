import "./ViewToggle.css";

type ViewMode = "table" | "gallery";

type ViewToggleProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <div className="view-toggle">
      <button
        className={viewMode === "table" ? "active" : ""}
        onClick={() => setViewMode("table")}
      >
        Table View
      </button>
      <button
        className={viewMode === "gallery" ? "active" : ""}
        onClick={() => setViewMode("gallery")}
      >
        Gallery View
      </button>
    </div>
  );
};

export default ViewToggle;
