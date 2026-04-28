import "./Styles/LessonsAgendateYaSkeleton.css";

/* --------------------------------------- SKELETON SIDEBAR DESKTOP ---------------------------------------------- */
const SkeletonDesktopSidebar = () => (
  <div className="lsa-sk-desktop-sidebar">
    <div className="lsa-sk-sidebar-header">
      <div className="lsa-sk lsa-sk-line" style={{ width: "55%", height: 16 }} />
    </div>
    <div className="lsa-sk-sidebar-body">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="lsa-sk-sidebar-item">
          <div className="lsa-sk lsa-sk-circle" style={{ width: 34, height: 34 }} />
          <div className="lsa-sk-sidebar-item-text">
            <div className="lsa-sk lsa-sk-line" style={{ width: "40%", height: 11 }} />
            <div className="lsa-sk lsa-sk-line" style={{ width: "85%", height: 13 }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* --------------------------------------- SKELETON SIDEBAR MÓVIL ---------------------------------------------- */
const SkeletonMobileSidebar = () => (
  <div className="lsa-sk-mobile-sidebar">
    <div className="lsa-sk lsa-sk-line" style={{ width: "35%", height: 16 }} />
  </div>
);

/* --------------------------------------- SKELETON CARD ---------------------------------------------- */
const SkeletonCard = () => (
  <div className="lsa-sk-card">
    <div className="lsa-sk-card-video-col">
      <div className="lsa-sk lsa-sk-video" />
    </div>
    <div className="lsa-sk-card-info-col">
      <div className="lsa-sk lsa-sk-line" style={{ width: "38%", height: 13 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "90%", height: 22 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "70%", height: 22 }} />
      <div className="lsa-sk lsa-sk-pill" style={{ width: "28%", height: 24 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "100%", height: 14 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "93%", height: 14 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "80%", height: 14 }} />
      <div className="lsa-sk lsa-sk-btn" />
      <div className="lsa-sk lsa-sk-btn" />
    </div>
  </div>
);

/* --------------------------------------- SKELETON BANNER ---------------------------------------------- */
const SkeletonBanner = () => (
  <div className="lsa-sk-banner">
    <div className="lsa-sk-banner-text">
      <div className="lsa-sk lsa-sk-line" style={{ width: "38%", height: 18 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "80%", height: 46 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "65%", height: 46 }} />
      <div className="lsa-sk lsa-sk-line" style={{ width: "50%", height: 16, marginTop: 8 }} />
    </div>
    <div className="lsa-sk lsa-sk-banner-img" />
  </div>
);

/* --------------------------------------- COMPONENTE PRINCIPAL SKELETON ---------------------------------------------- */
const LessonsAgendateYaSkeleton = ({ cardCount = 3 }) => (
  <div className="lsa-sk-wrapper">
    {/* Banner */}
    <SkeletonBanner />

    {/* Contenido */}
    <div className="lsa-sk-content">
      {/* Sidebar móvil */}
      <div className="d-lg-none mb-3">
        <SkeletonMobileSidebar />
      </div>

      {/* Header: volver + título */}
      <div className="lsa-sk-header">
        <div className="lsa-sk lsa-sk-line" style={{ width: 90, height: 22, borderRadius: 8 }} />
        <div className="lsa-sk lsa-sk-line lsa-sk-title" />
        <div style={{ width: 90 }} />
      </div>

      {/* Layout: sidebar desktop + cards */}
      <div className="lsa-sk-layout">
        <div className="d-none d-lg-block lsa-sk-sidebar-col">
          <SkeletonDesktopSidebar />
        </div>
        <div className="lsa-sk-cards-col">
          {Array.from({ length: cardCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LessonsAgendateYaSkeleton;