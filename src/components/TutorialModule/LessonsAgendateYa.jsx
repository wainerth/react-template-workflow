// --------------------------------------------------- hooks ---------------------------------------------------------/
import { useState, useRef, useEffect } from "react";
// ---------------------------------------------------- images ------------------------------------------------------
import BannerAcademia from "../../img/BannerAcademia.webp";
// ---------------------------------------------------- styles ------------------------------------------------------
import "./Styles/LessonsAgendateYa.css";
// --------------------------------------------------- others ---------------------------------------------------------
import { Container, Row, Col, Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
// ---------------------------------------------------- apollo ---------------------------------------------------------
import { useMutation } from "@apollo/client/react";
import { MARK_VIDEO_AS_SEEN } from "../../services/mutation";

/* --------------------------------------- SIDEBAR MÓVIL ----------------------------------------------- */
const MobileSidebar = ({ clases, activeId, onSelect, isOpen, onToggle }) => (
  <div className={`lsa-mobile-sidebar ${isOpen ? "open" : ""}`}>
    <Container>
      <div
        className="d-flex align-items-center justify-content-between py-2"
        style={{ cursor: "pointer", height: 56 }}
        onClick={onToggle}
      >
        <span className="fw-bold text-primary">Clases</span>
        <svg
          className="lsa-chevron"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M4.5 6.75L9 11.25L13.5 6.75"
            stroke="#1e40af"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Container>
    <div className="lsa-mobile-panel">
      <div className="lsa-mobile-panel-inner">
        <Container>
          <Row className="g-2">
            {clases.map((clase, idx) => (
              <Col key={clase.id} xs={12} sm={6}>
                <div
                  className={`lsa-class-item ${activeId === clase.id ? "active" : ""
                    }`}
                  onClick={() => onSelect(clase.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelect(clase.id)}
                >
                  <div className="lsa-class-badge">{idx + 1}</div>
                  <div className="overflow-hidden">
                    <div className="small fw-bold text-primary text-uppercase">
                      {clase.numero}
                    </div>
                    <div className="small text-truncate">{clase.titulo}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  </div>
);

/* --------------------------------------- SIDEBAR DESKTOP ----------------------------------------------- */
const DesktopSidebar = ({ clases, activeId, onSelect, collapsed, onToggle }) => (
  <div className={`lsa-desktop-sidebar ${collapsed ? "collapsed" : ""}`}>
    <div className="lsa-sidebar-header">
      {collapsed ? (
        <div
          className="d-flex justify-content-center w-100"
          style={{ cursor: "pointer" }}
          onClick={onToggle}
          title="Expandir panel"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="#1e40af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between w-100">
          <span className="fw-bold text-primary">Clases</span>
          <button
            className="lsa-toggle-btn"
            onClick={onToggle}
            aria-label="Colapsar panel"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="#1e40af"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>

    <div className="lsa-sidebar-body">
      {collapsed ? (
        <div className="lsa-collapsed-list">
          {clases.map((clase, idx) => (
            <div
              key={clase.id}
              className={`lsa-collapsed-class-number ${activeId === clase.id ? "active" : ""
                }`}
              onClick={() => onSelect(clase.id)}
              title={clase.titulo}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      ) : (
        <div className="lsa-expanded-list">
          {clases.map((clase, idx) => (
            <div
              key={clase.id}
              className={`lsa-class-item ${activeId === clase.id ? "active" : ""
                }`}
              onClick={() => onSelect(clase.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(clase.id)}
            >
              <div className="lsa-class-badge">{idx + 1}</div>
              <div className="overflow-hidden">
                <div className="small fw-bold text-primary text-uppercase">
                  {clase.numero}
                </div>
                <div className="small text-truncate">{clase.titulo}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ---------------------------------------  COMPONENTE PRINCIPAL  ---------------------------------------------- */
const LessonsAgendateYa = ({ lessons, onBack }) => {
  const videoRefs = useRef([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [completadas, setCompletadas] = useState({});
  const [markingAsSeen, setMarkingAsSeen] = useState({});

  const [markVideoAsSeen] = useMutation(MARK_VIDEO_AS_SEEN);

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v\/))([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const clases = lessons.map((lesson) => ({
    id: lesson.id,
    numero: `Clase ${lesson.orden}`,
    titulo: lesson.nombre,
    descripcion1: lesson.descripcion,
    duracion: lesson.duracion,
    videoId: extractVideoId(lesson.link_video),
    visto: lesson.visto,
  }));

  const handleToggleCompletada = async (id) => {
    setMarkingAsSeen((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await markVideoAsSeen({
        variables: { userId: "110", videoId: id },
      });
      if (result.data.VideoVisto.success) {
        setCompletadas((prev) => ({ ...prev, [id]: true }));
      }
    } catch (error) {
      console.error("Error marking video as seen:", error);
    } finally {
      setMarkingAsSeen((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handlePlayClick = (index) => {
    const iframe = videoRefs.current[index];
    if (iframe) {
      iframe.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
      iframe.focus();
    }
  };

  const handleSelectClass = (id) => {
    setActiveId(id);
    setMobileSidebarOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`clase-card-${id}`);
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    const initialCompletadas = {};
    clases.forEach((clase) => {
      initialCompletadas[clase.id] = clase.visto;
    });
    setCompletadas(initialCompletadas);
  }, [lessons]);

  return (
    <div>
      {/* Banner */}
      <section
        className="position-relative overflow-hidden d-flex flex-column justify-content-center py-5"
        style={{ minHeight: "70vh" }}
      >
        {/* Capa de fondo (nueva) */}
        <div className="position-absolute top-0 start-0 w-100 h-100 ay-hero-bg" />

        {/* Rejilla (antes lsa-grid-pattern, ahora ay-hero-grid) */}
        <div className="position-absolute top-0 start-0 w-100 h-100 ay-hero-grid" />

        <Container>
          <Row className="align-items-center g-5">
            <Col xs={12} sm={6}>
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h1 className="fw-bold lsa-hero-title mb-4">
                  Impulsa tu negocio <br />
                  con la <span style={{ color: '#0d6efd' }}>Academia</span> <br />
                  <em className="position-relative">Agéndate ¡Ya!</em>
                </h1>
              </div>
            </Col>

            <Col xs={12} sm={6} className="d-flex justify-content-center">
              <img
                src={BannerAcademia}
                alt=""
                className="img-fluid z-1 shadow-lg"
              />
            </Col>
          </Row>
        </Container>

        {/* Divisor movido fuera del Container, como en la referencia */}
        <div className="lsa-divisor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 78"
            preserveAspectRatio="none"
          >
            <path d="M534.671 0.907555L47.3735 26.5409C20.8166 27.9379 0 49.8783 0 76.4718V78H1920V76.4721C1920 49.8785 1899.18 27.938 1872.63 26.5411L1391.48 1.23387C1351.04 -0.893562 1310.64 6.30416 1273.42 22.2711C1228.82 41.4035 1180.79 51.2693 1132.26 51.2693H766.834C722.819 51.2693 679.376 41.3046 639.761 22.1223C607.082 6.29829 570.93 -0.999779 534.671 0.907555Z" />
          </svg>
        </div>
      </section>
      {/* Contenido principal */}
      <div className="lsa-main-content">
        {/* Sidebar móvil — solo visible en < lg */}
        <div className="d-lg-none mb-3">
          <MobileSidebar
            clases={clases}
            activeId={activeId}
            onSelect={handleSelectClass}
            isOpen={mobileSidebarOpen}
            onToggle={() => setMobileSidebarOpen((prev) => !prev)}
          />
        </div>

        {/* Encabezado */}
        <div className="lsa-header d-flex justify-content-between align-items-center mb-4 px-2">
          <Button
            variant="link"
            className="text-decoration-none d-inline-flex align-items-center gap-2 px-4 py-2 text-primary fw-bold lsa-button-volver"

            onClick={onBack}
          >
            <IoMdArrowBack size={20} />
            <span style={{ fontSize: "18px" }}>Volver</span>
          </Button>
          <h2 className="ay-section-title display-6 fw-bold text-center flex-grow-1 mb-0">
            Aprende a tu ritmo, <em>crece</em> sin límites
          </h2>
          <div style={{ width: "100px" }} />
        </div>

        {/* ── Layout principal: sidebar + cards ── */}

        <div className="lsa-layout">
          {/* Sidebar desktop — sticky, solo visible en ≥ lg */}
          <div
            className={`lsa-sidebar-wrapper d-none d-lg-block ${desktopSidebarCollapsed ? "lsa-sidebar-wrapper--collapsed" : ""
              }`}
          >
            <DesktopSidebar
              clases={clases}
              activeId={activeId}
              onSelect={handleSelectClass}
              collapsed={desktopSidebarCollapsed}
              onToggle={() => setDesktopSidebarCollapsed((prev) => !prev)}
            />
          </div>

          {/* Cards */}
          <div className="lsa-cards-wrapper">
            <div className="d-flex flex-column gap-4">
              {!clases || clases.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="64" height="64" rx="32" fill="#e8eef8" />
                    <path
                      d="M20 24h24M20 32h16M20 40h10"
                      stroke="#93afd4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="46"
                      cy="42"
                      r="8"
                      fill="#e0e7f2"
                      stroke="#93afd4"
                      strokeWidth="2"
                    />
                    <path
                      d="M43 42h6M46 39v6"
                      stroke="#93afd4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p
                    className="text-secondary fw-semibold mb-0"
                    style={{ fontSize: "1.1rem" }}
                  >
                    No hay clases disponibles
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                    Este módulo aún no tiene contenido cargado.
                  </p>
                </div>
              ) : (
                clases.map((clase, index) => (
                  <div
                    key={clase.id}
                    id={`clase-card-${clase.id}`}
                    className={`lsa-card rounded-4 shadow-lg border-0 bg-light ${activeId === clase.id ? "lsa-card--active" : ""
                      }`}
                    style={{ scrollMarginTop: "100px" }}
                  >
                    <Row className="g-0 p-3">
                      <Col xs={12} lg={6} className="p-3 d-flex align-items-center">
                        <div className="ratio ratio-16x9 rounded-3 overflow-hidden bg-dark w-100">
                          <iframe
                            ref={(el) => (videoRefs.current[index] = el)}
                            className="position-absolute top-0 start-0 w-100 h-100 border-0"
                            src={`https://www.youtube.com/embed/${clase.videoId}?enablejsapi=1&modestbranding=1&rel=0&showinfo=0&controls=1`}
                            title={`Video de ${clase.titulo}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </Col>
                      <Col
                        xs={12}
                        lg={6}
                        className="p-3 d-flex flex-column"
                      >
                        <h3 className="fw-semibold text-dark mb-3">
                          <span className="text-primary fw-semibold">
                            {clase.numero}:{" "}
                          </span>
                          {clase.titulo}
                        </h3>
                        <span
                          style={{ color: "#0d6efd" }}
                          className="text-start badge bg-light rounded-pill mb-3"
                        >
                          {clase.duracion} min
                        </span>
                        <p className="text-muted mb-2">{clase.descripcion1}</p>
                        <div className="mt-auto">
                          <button
                            className="lsa-button-play-video text-white btn rounded-3 py-2 px-3 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 w-100"
                            onClick={() => handlePlayClick(index)}
                          >
                            <span className="lsa-cta-play" />
                            <span>HAZ CLIC PARA REPRODUCIR EL VIDEO</span>
                          </button>
                          <button
                            className={`lsa-check-btn btn w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2 mt-2 ${completadas[clase.id] ? "completada" : ""
                              }`}
                            onClick={() => handleToggleCompletada(clase.id)}
                            disabled={markingAsSeen[clase.id]}
                          >
                            <span className="lsa-check-icon">
                              {markingAsSeen[clase.id] ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Cargando...
                                  </span>
                                </div>
                              ) : completadas[clase.id] ? (
                                "✓"
                              ) : (
                                ""
                              )}
                            </span>
                            {markingAsSeen[clase.id]
                              ? "Marcando..."
                              : completadas[clase.id]
                                ? "¡Clase completada!"
                                : "Marcar como completado"}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsAgendateYa;